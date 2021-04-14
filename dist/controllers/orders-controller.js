"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = __importDefault(require("uuid"));
const helpers_1 = require("@/helpers");
const db_1 = __importDefault(require("@/services/db"));
const { db } = db_1.default;
const col = db.collection('orders');
const products = db.collection('products');
exports.default = {
    async list(_req, res) {
        try {
            const ordersDB = await col.find({}).toArray();
            const orders = ordersDB.map((order) => {
                const { ['_id']: idMongo, ...orderNoIdMongo } = order;
                return orderNoIdMongo;
            });
            return res.json(orders);
        }
        catch (error) {
            console.log('Error: ', error);
            return res.status(400)
                .json(helpers_1.createErrorMessage('Error in the list of orders!'));
        }
    },
    async show(req, res) {
        const { id } = req.params;
        try {
            const { ['_id']: idMongo, ...order } = await col.findOne({ id: id });
            if (order === null) {
                return res.status(400)
                    .json(helpers_1.createErrorMessage('Order not found!'));
            }
            return res.json(order);
        }
        catch (error) {
            console.log('Error: ', error);
            return res.status(400)
                .json(helpers_1.createErrorMessage('Error show order!'));
        }
    },
    async create(req, res) {
        const keys = Object.keys(req.body);
        for (const key of keys) {
            if (req.body[key] === '') {
                return res.json(helpers_1.createErrorMessage('Please, fill all fields!'));
            }
        }
        const productsFront = req.body;
        const productsID = productsFront.map((product) => { return product.id; });
        const productsDatabase = await products.find({ id: { $in: productsID } })
            .toArray();
        const productsOrder = productsDatabase.map((product) => {
            const { ['_id']: idMongo, ...productNoIdMongo } = product;
            return productNoIdMongo;
        });
        for (const item of productsFront) {
            for (const product of productsOrder) {
                if (item.id === product.id) {
                    product.quantity = Number(item.quantity);
                }
            }
        }
        const orderTotalValue = productsOrder.reduce((total, item) => {
            total = total + (item.quantity * item.price);
            return parseFloat(total.toFixed(2));
        }, 0);
        const totalOrderProduct = productsFront.reduce((total, item) => {
            return Number(total + item.quantity);
        }, 0);
        const item = {
            id: uuid_1.default.v4(),
            total: orderTotalValue,
            quantity: totalOrderProduct,
            products: productsOrder
        };
        try {
            const newOrderDB = await db.collection('orders')
                .insertOne(item);
            const { ['_id']: idMongo, ...newOrder } = newOrderDB.ops[0];
            return res.json(newOrder);
        }
        catch (error) {
            console.log('Error: ', error);
            return res.status(400)
                .json(helpers_1.createErrorMessage('Error creating new order!'));
        }
    },
    async edit(req, res) {
        const { id } = req.params;
        const foundOrder = await col.findOne({ id: id });
        if (foundOrder === null) {
            return res.status(400)
                .json(helpers_1.createErrorMessage('Order not found!'));
        }
        const keys = Object.keys(req.body);
        for (const key of keys) {
            if (req.body[key] === '') {
                return res.json(helpers_1.createErrorMessage('Please, fill all fields!'));
            }
        }
        const productsFront = req.body;
        const productsID = productsFront.map((product) => { return product.id; });
        const productsDatabase = await products.find({ id: { $in: productsID } })
            .toArray();
        const productsOrder = productsDatabase.map((product) => {
            const { ['_id']: idMongo, ...productNoIdMongo } = product;
            return productNoIdMongo;
        });
        for (const item of productsFront) {
            for (const product of productsOrder) {
                if (item.id === product.id) {
                    product.quantity = Number(item.quantity);
                }
            }
        }
        const orderTotalValue = productsOrder.reduce((total, item) => {
            total = total + (item.quantity * item.price);
            return parseFloat(total.toFixed(2));
        }, 0);
        const totalOrderProduct = productsFront.reduce((total, item) => {
            return Number(total + item.quantity);
        }, 0);
        const item = {
            total: orderTotalValue,
            quantity: totalOrderProduct,
            products: productsOrder
        };
        try {
            await col.findOneAndUpdate({ id: id }, { $set: item });
            const { ['_id']: idMongo, ...editedOrder } = await col.findOne({ id: id });
            return res.json(editedOrder);
        }
        catch (error) {
            console.log('Error: ', error);
            return res.status(400)
                .json(helpers_1.createErrorMessage('Error edit order!'));
        }
    },
    async delete(req, res) {
        const { id } = req.params;
        const foundOrder = await col.findOne({ id: id });
        if (foundOrder === null) {
            return res.status(400)
                .json(helpers_1.createErrorMessage('Order not found!'));
        }
        try {
            await col.deleteOne({ id: id });
            return res.json({ id: id });
        }
        catch (error) {
            console.log('Error: ', error);
            return res.status(400)
                .json(helpers_1.createErrorMessage('Error delete order!'));
        }
    }
};
//# sourceMappingURL=orders-controller.js.map