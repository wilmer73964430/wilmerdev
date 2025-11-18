"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhook = exports.checkout = void 0;
const stripe_1 = __importDefault(require("stripe"));
const env_1 = require("../config/env");
const checkoutValidators_1 = require("../validators/checkoutValidators");
const db_1 = require("../config/db");
const Product_1 = require("../models/Product");
const Order_1 = require("../models/Order");
const OrderItem_1 = require("../models/OrderItem");
const User_1 = require("../models/User");
const tokens_1 = require("../utils/tokens");
const stripe = new stripe_1.default(env_1.env.stripeSecretKey || 'sk_test');
const checkout = async (req, res) => {
    if (!req.user)
        return res.status(401).json({ message: 'No autenticado' });
    const parsed = checkoutValidators_1.checkoutSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ message: parsed.error.message });
    const { items } = parsed.data;
    if (req.user.purchaseCount >= env_1.env.purchaseCap) {
        return res.status(400).json({ message: 'Solo puedes realizar una compra en total' });
    }
    if (items.length < env_1.env.minItems || items.length > env_1.env.maxItems) {
        return res
            .status(400)
            .json({ message: `Debes seleccionar entre ${env_1.env.minItems} y ${env_1.env.maxItems} productos` });
    }
    const productRepo = db_1.AppDataSource.getRepository(Product_1.Product);
    const orderRepo = db_1.AppDataSource.getRepository(Order_1.Order);
    const itemRepo = db_1.AppDataSource.getRepository(OrderItem_1.OrderItem);
    let total = 0;
    const order = orderRepo.create({ user: req.user, status: 'pending', total: 0 });
    order.items = [];
    for (const item of items) {
        const product = await productRepo.findOne({ where: { id: item.productId } });
        if (!product)
            return res.status(404).json({ message: 'Producto no encontrado' });
        if (product.inventory <= 0)
            return res.status(400).json({ message: 'Sin stock' });
        const orderItem = itemRepo.create({ product, order, quantity: item.quantity, price: product.price });
        total += Number(product.price) * item.quantity;
        order.items.push(orderItem);
    }
    order.total = total;
    await orderRepo.save(order);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(total * 100),
        currency: 'usd',
        metadata: { orderId: order.id, userId: req.user.id }
    });
    order.paymentIntentId = paymentIntent.id;
    await orderRepo.save(order);
    return res.json({ clientSecret: paymentIntent.client_secret, orderId: order.id, total });
};
exports.checkout = checkout;
const webhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    if (!sig)
        return res.status(400).send('Missing signature');
    let event;
    try {
        event = (await new stripe_1.default(env_1.env.stripeSecretKey).webhooks.constructEventAsync(req.rawBody, sig, env_1.env.stripeWebhookSecret));
    }
    catch (err) {
        return res.status(400).send('Webhook error');
    }
    if (event.type === 'payment_intent.succeeded') {
        const intent = event.data.object;
        const orderRepo = db_1.AppDataSource.getRepository(Order_1.Order);
        const userRepo = db_1.AppDataSource.getRepository(User_1.User);
        const order = await orderRepo.findOne({ where: { id: intent.metadata?.orderId }, relations: ['user', 'items', 'items.product'] });
        if (order && order.status !== 'paid') {
            order.status = 'access_available';
            order.downloadUrl = (0, tokens_1.signDownloadToken)({ orderId: order.id, userId: order.user.id });
            await orderRepo.save(order);
            const user = order.user;
            user.purchaseCount += 1;
            await userRepo.save(user);
        }
    }
    return res.json({ received: true });
};
exports.webhook = webhook;
