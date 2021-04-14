"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const urlMongo = process.env.MONGO_URL;
const dbName = process.env.MONGO_DB_NAME;
const mongo = {
    db: {},
    boot: async () => {
        const client = new mongodb_1.MongoClient(urlMongo, { useUnifiedTopology: true });
        console.log(urlMongo);
        await client.connect();
        mongo.db = client.db(dbName);
        console.log('Connected successfully to Mongo DB!');
    }
};
exports.default = mongo;
//# sourceMappingURL=db.js.map