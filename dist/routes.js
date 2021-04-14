"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes = express_1.Router();
const products_controller_1 = __importDefault(require("@/controllers/products-controller"));
const cashback_controller_1 = __importDefault(require("@/controllers/cashback-controller"));
const orders_controller_1 = __importDefault(require("@/controllers/orders-controller"));
routes.get('/products', products_controller_1.default.list);
routes.get('/products/:id/show', products_controller_1.default.show);
routes.get('/cashback', cashback_controller_1.default.list);
routes.get('/orders', orders_controller_1.default.list);
routes.get('/orders/:id/show', orders_controller_1.default.show);
routes.post('/products', products_controller_1.default.create);
routes.put('/products/:id', products_controller_1.default.edit);
routes.delete('/products/:id', products_controller_1.default.delete);
routes.post('/cashback', cashback_controller_1.default.create);
routes.put('/cashback/:id', cashback_controller_1.default.edit);
routes.delete('/cashback/:id', cashback_controller_1.default.delete);
routes.post('/orders', orders_controller_1.default.create);
routes.put('/orders/:id', orders_controller_1.default.edit);
routes.delete('/orders/:id', orders_controller_1.default.delete);
exports.default = routes;
//# sourceMappingURL=routes.js.map