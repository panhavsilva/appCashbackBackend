"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = __importDefault(require("uuid"));
const helpers_1 = require("@/helpers");
const db_1 = __importDefault(require("@/services/db"));
const { db } = db_1.default;
const col = db.collection('cashbackRanges');
exports.default = {
    async list(_req, res) {
        try {
            const cashbackRangesDB = await col.find({}).toArray();
            const cashbackRanges = cashbackRangesDB.map((cashback) => {
                const { ['_id']: idMongo, ...cashbackNoIdMongo } = cashback;
                return cashbackNoIdMongo;
            });
            return res.json(cashbackRanges);
        }
        catch (error) {
            console.log('Error: ', error);
            return res.status(400)
                .json(helpers_1.createErrorMessage('Error in the list of cashback ranges!'));
        }
    },
    async create(req, res) {
        const keys = Object.keys(req.body);
        for (const key of keys) {
            if (req.body[key] === '') {
                return res.json(helpers_1.createErrorMessage('Please, fill all fields!'));
            }
        }
        if (!helpers_1.isNumber(req.body.initial) || !helpers_1.isNumber(req.body.final)) {
            return res.status(401).json(helpers_1.createErrorMessage('Please, correctly fill in the initial value field!'));
        }
        const item = {
            id: uuid_1.default.v4(),
            name: req.body.name,
            initial: req.body.initial,
            final: req.body.final
        };
        try {
            const newCashback = await db.collection('cashbackRanges')
                .insertOne(item);
            const { ['_id']: idMongo, ...cashback } = newCashback.ops[0];
            return res.json(cashback);
        }
        catch (error) {
            console.log('Error: ', error);
            return res.status(400)
                .json(helpers_1.createErrorMessage('Error creating new cashback range!'));
        }
    },
    async edit(req, res) {
        const { id } = req.params;
        const foundCashbackRange = await col.findOne({ id: id });
        if (foundCashbackRange === null) {
            return res.status(400)
                .json(helpers_1.createErrorMessage('Cashback range not found!'));
        }
        const keys = Object.keys(req.body);
        for (const key of keys) {
            if (req.body[key] === '') {
                return res.json(helpers_1.createErrorMessage('Please, fill all fields!'));
            }
        }
        if (!helpers_1.isNumber(req.body.initial) || !helpers_1.isNumber(req.body.final)) {
            return res.status(401).json(helpers_1.createErrorMessage('Please, correctly fill in the initial value field!'));
        }
        const item = {
            name: req.body.name || foundCashbackRange.name,
            initial: req.body.initial || foundCashbackRange.initial,
            final: req.body.final || foundCashbackRange.final
        };
        try {
            await col.findOneAndUpdate({ id: id }, { $set: item });
            const { ['_id']: idMongo, ...editedCashbackRange } = await col.findOne({ id: id });
            return res.json(editedCashbackRange);
        }
        catch (error) {
            console.log('Error: ', error);
            return res.status(400)
                .json(helpers_1.createErrorMessage('Error edit cashback range!'));
        }
    },
    async delete(req, res) {
        const { id } = req.params;
        const foundCashbackRange = await col.findOne({ id: id });
        if (foundCashbackRange === null) {
            return res.status(400)
                .json(helpers_1.createErrorMessage('Cashback range not found!'));
        }
        try {
            await col.deleteOne({ id: id });
            return res.json({ id: id });
        }
        catch (error) {
            console.log('Error: ', error);
            return res.status(400)
                .json(helpers_1.createErrorMessage('Error delete cashback range!'));
        }
    }
};
//# sourceMappingURL=cashback-controller.js.map