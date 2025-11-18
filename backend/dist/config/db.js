"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const env_1 = require("./env");
const User_1 = require("../models/User");
const Product_1 = require("../models/Product");
const Order_1 = require("../models/Order");
const OrderItem_1 = require("../models/OrderItem");
const Payment_1 = require("../models/Payment");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: env_1.env.databaseUrl,
    synchronize: true,
    logging: false,
    entities: [User_1.User, Product_1.Product, Order_1.Order, OrderItem_1.OrderItem, Payment_1.Payment]
});
const connectDb = async () => {
    if (!exports.AppDataSource.isInitialized) {
        await exports.AppDataSource.initialize();
    }
    return exports.AppDataSource;
};
exports.connectDb = connectDb;
