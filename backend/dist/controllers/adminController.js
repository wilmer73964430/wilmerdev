"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePurchaseSettings = exports.adminUsers = exports.metrics = void 0;
const db_1 = require("../config/db");
const Order_1 = require("../models/Order");
const Product_1 = require("../models/Product");
const User_1 = require("../models/User");
const env_1 = require("../config/env");
const metrics = async (_req, res) => {
    const orderRepo = db_1.AppDataSource.getRepository(Order_1.Order);
    const productRepo = db_1.AppDataSource.getRepository(Product_1.Product);
    const userRepo = db_1.AppDataSource.getRepository(User_1.User);
    const totalOrders = await orderRepo.count();
    const paidOrders = await orderRepo.count({ where: { status: 'access_available' } });
    const products = await productRepo.find({ relations: ['items'] });
    const revenue = (await orderRepo.find()).reduce((sum, o) => sum + Number(o.total), 0);
    const topProducts = products.map((p) => ({
        title: p.title,
        downloads: p.items?.length || 0
    }));
    const users = await userRepo.count();
    res.json({ totalOrders, paidOrders, revenue, topProducts, users, purchaseCap: env_1.env.purchaseCap });
};
exports.metrics = metrics;
const adminUsers = async (_req, res) => {
    const userRepo = db_1.AppDataSource.getRepository(User_1.User);
    const users = await userRepo.find();
    res.json(users);
};
exports.adminUsers = adminUsers;
const updatePurchaseSettings = async (req, res) => {
    const { minItems, maxItems } = req.body;
    if (typeof minItems === 'number')
        env_1.env.minItems = minItems;
    if (typeof maxItems === 'number')
        env_1.env.maxItems = maxItems;
    res.json({ minItems: env_1.env.minItems, maxItems: env_1.env.maxItems });
};
exports.updatePurchaseSettings = updatePurchaseSettings;
