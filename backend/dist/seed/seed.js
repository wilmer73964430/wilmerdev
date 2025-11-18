"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const Product_1 = require("../models/Product");
const User_1 = require("../models/User");
const password_1 = require("../utils/password");
const products = [
    {
        title: 'Neon Synthwave Soundpack',
        description: 'Colección de loops synthwave listos para tu próximo hit futurista.',
        price: 29,
        inventory: 100,
        deliveryUrl: 'https://cdn.example.com/downloads/synthpack.zip',
        previewUrl: 'https://cdn.example.com/previews/synthpack.mp3'
    },
    {
        title: 'Template UI Glassmorphism',
        description: 'Plantillas Figma con estética neón para dashboards premium.',
        price: 39,
        inventory: 80,
        deliveryUrl: 'https://cdn.example.com/downloads/figma-template.fig',
        previewUrl: 'https://cdn.example.com/previews/template.png'
    },
    {
        title: 'E-book: Growth Hacking 2088',
        description: 'Manual táctico para escalar productos digitales en ecosistemas post-redes.',
        price: 19,
        inventory: 200,
        deliveryUrl: 'https://cdn.example.com/downloads/growth-hacking.pdf'
    }
];
async function seed() {
    await (0, db_1.connectDb)();
    const productRepo = db_1.AppDataSource.getRepository(Product_1.Product);
    const userRepo = db_1.AppDataSource.getRepository(User_1.User);
    const existingAdmin = await userRepo.findOne({ where: { email: 'admin@neon.io' } });
    if (!existingAdmin) {
        const admin = userRepo.create({ email: 'admin@neon.io', passwordHash: await (0, password_1.hashPassword)('admin123'), role: 'admin' });
        await userRepo.save(admin);
        console.log('Admin creado: admin@neon.io / admin123');
    }
    for (const p of products) {
        const exists = await productRepo.findOne({ where: { title: p.title } });
        if (!exists) {
            await productRepo.save(productRepo.create(p));
            console.log(`Producto sembrado: ${p.title}`);
        }
    }
    process.exit(0);
}
seed().catch((err) => {
    console.error(err);
    process.exit(1);
});
