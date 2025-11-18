"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const zod_1 = require("zod");
exports.productSchema = zod_1.z.object({
    title: zod_1.z.string().min(2),
    description: zod_1.z.string().min(10),
    price: zod_1.z.number().positive(),
    inventory: zod_1.z.number().int().nonnegative(),
    deliveryUrl: zod_1.z.string().url().optional(),
    previewUrl: zod_1.z.string().url().optional()
});
