"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = require("./config/db");
const env_1 = require("./config/env");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const checkoutRoutes_1 = __importDefault(require("./routes/checkoutRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: env_1.env.appUrl,
    credentials: true
}));
app.use(express_1.default.json({ verify: (req, _res, buf) => (req.rawBody = buf) }));
app.use((0, cookie_parser_1.default)());
app.get('/health', (_req, res) => res.json({ ok: true, neon: true }));
app.use('/auth', authRoutes_1.default);
app.use('/products', productRoutes_1.default);
app.use('/checkout', checkoutRoutes_1.default);
app.use('/orders', orderRoutes_1.default);
app.use('/admin', adminRoutes_1.default);
(0, db_1.connectDb)()
    .then(() => {
    app.listen(env_1.env.port, () => console.log(`API futurista escuchando en ${env_1.env.port}`));
})
    .catch((err) => {
    console.error('Error de conexión a BD', err);
    process.exit(1);
});
