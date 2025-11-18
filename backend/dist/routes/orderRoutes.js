"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const orderController_1 = require("../controllers/orderController");
const router = (0, express_1.Router)();
router.get('/me', auth_1.authenticate, orderController_1.myOrders);
router.get('/download', auth_1.authenticate, orderController_1.download);
exports.default = router;
