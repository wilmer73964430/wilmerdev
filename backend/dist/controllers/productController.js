"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.createProduct = exports.listProducts = void 0;
const db_1 = require("../config/db");
const Product_1 = require("../models/Product");
const productValidators_1 = require("../validators/productValidators");
const listProducts = async (_req, res) => {
    const repo = db_1.AppDataSource.getRepository(Product_1.Product);
    const products = await repo.find();
    return res.json(products);
};
exports.listProducts = listProducts;
const createProduct = async (req, res) => {
    const parsed = productValidators_1.productSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ message: parsed.error.message });
    const repo = db_1.AppDataSource.getRepository(Product_1.Product);
    const product = repo.create(parsed.data);
    await repo.save(product);
    return res.status(201).json(product);
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    const parsed = productValidators_1.productSchema.partial().safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ message: parsed.error.message });
    const repo = db_1.AppDataSource.getRepository(Product_1.Product);
    const product = await repo.findOne({ where: { id: req.params.id } });
    if (!product)
        return res.status(404).json({ message: 'Producto no encontrado' });
    repo.merge(product, parsed.data);
    await repo.save(product);
    return res.json(product);
};
exports.updateProduct = updateProduct;
