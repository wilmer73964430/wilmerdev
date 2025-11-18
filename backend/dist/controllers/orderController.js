"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.download = exports.myOrders = void 0;
const db_1 = require("../config/db");
const Order_1 = require("../models/Order");
const tokens_1 = require("../utils/tokens");
const myOrders = async (req, res) => {
    const orderRepo = db_1.AppDataSource.getRepository(Order_1.Order);
    const orders = await orderRepo.find({ where: { user: { id: req.user?.id } }, relations: ['items', 'items.product'] });
    return res.json(orders);
};
exports.myOrders = myOrders;
const download = async (req, res) => {
    const token = req.query.token;
    if (!token)
        return res.status(400).json({ message: 'Token requerido' });
    try {
        const payload = (0, tokens_1.verifyDownloadToken)(token);
        if (payload.userId !== req.user?.id)
            return res.status(403).json({ message: 'No autorizado' });
        const orderRepo = db_1.AppDataSource.getRepository(Order_1.Order);
        const order = await orderRepo.findOne({ where: { id: payload.orderId }, relations: ['items', 'items.product'] });
        if (!order)
            return res.status(404).json({ message: 'Orden no encontrada' });
        if (order.status !== 'access_available')
            return res.status(400).json({ message: 'Acceso aún no disponible' });
        return res.json({ downloadUrls: order.items.map((i) => i.product.deliveryUrl) });
    }
    catch (e) {
        return res.status(400).json({ message: 'Token inválido' });
    }
};
exports.download = download;
