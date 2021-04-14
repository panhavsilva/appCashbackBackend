"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = __importDefault(require("uuid"));
const helpers_1 = require("@/helpers");
const db_1 = __importDefault(require("@/services/db"));
const { db } = db_1.default;
const col = db.collection('products');
exports.default = {
    async list(_req, res) {
        try {
            const productsDB = await col.find({}).toArray();
            const products = productsDB.map((product) => {
                const { ['_id']: idMongo, ...productNoIdMongo } = product;
                return productNoIdMongo;
            });
            return res.json(products);
        }
        catch (error) {
            console.log('Error: ', error);
            return res.status(400)
                .json(helpers_1.createErrorMessage('Error in the list of products!'));
        }
    },
    async show(req, res) {
        const { id } = req.params;
        try {
            const { ['_id']: idMongo, ...product } = await col.findOne({ id: id });
            if (product === null) {
                return res.status(400)
                    .json(helpers_1.createErrorMessage('Product not found!'));
            }
            return res.json(product);
        }
        catch (error) {
            console.log('Error: ', error);
            return res.status(400)
                .json(helpers_1.createErrorMessage('Error show product'));
        }
    },
    async create(req, res) {
        const keys = Object.keys(req.body);
        for (const key of keys) {
            if (req.body[key] === '') {
                return res.json(helpers_1.createErrorMessage('Please, fill all fields!'));
            }
        }
        if (!helpers_1.isNumber(req.body.price)) {
            return res.status(401).json(helpers_1.createErrorMessage('Price field is not number!'));
        }
        const item = {
            id: uuid_1.default.v4(),
            name: req.body.name,
            price: req.body.price
        };
        try {
            const newProduct = await db.collection('products')
                .insertOne(item);
            const { ['_id']: idMongo, ...product } = newProduct.ops[0];
            return res.json(product);
        }
        catch (error) {
            console.log('Error: ', error);
            return res.status(400)
                .json(helpers_1.createErrorMessage('Error creating new product'));
        }
    },
    async edit(req, res) {
        const { id } = req.params;
        const foundProduct = await col.findOne({ id: id });
        if (foundProduct === null) {
            return res.status(400)
                .json(helpers_1.createErrorMessage('Product not found!'));
        }
        const keys = Object.keys(req.body);
        for (const key of keys) {
            if (req.body[key] === '') {
                return res.json(helpers_1.createErrorMessage('Please, fill all fields!'));
            }
        }
        if (!helpers_1.isNumber(req.body.price)) {
            return res.status(401).json(helpers_1.createErrorMessage('Price field is not number!'));
        }
        const item = {
            name: req.body.name || foundProduct.name,
            price: req.body.price || foundProduct.price
        };
        try {
            await col.findOneAndUpdate({ id: id }, { $set: item });
            const { ['_id']: idMongo, ...editedProduct } = await col.findOne({ id: id });
            return res.json(editedProduct);
        }
        catch (error) {
            console.log('Error: ', error);
            return res.status(400)
                .json(helpers_1.createErrorMessage('Error edit product'));
        }
    },
    async delete(req, res) {
        const { id } = req.params;
        const foundProduct = await col.findOne({ id: id });
        if (foundProduct === null) {
            return res.status(400)
                .json(helpers_1.createErrorMessage('Product not found!'));
        }
        try {
            await col.deleteOne({ id: id });
            return res.json({ id: id });
        }
        catch (error) {
            console.log('Error: ', error);
            return res.status(400)
                .json(helpers_1.createErrorMessage('Error delete product'));
        }
    }
};
//# sourceMappingURL=products-controller.js.map