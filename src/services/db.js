const MongoClient = require('mongodb').MongoClient

const urlMongo = process.env.MONGO_URL

const dbName = process.env.MONGO_DB_NAME;

const mongo = {
  db: {},
  boot: async () => {
    const client = new MongoClient(urlMongo, { useUnifiedTopology: true });

    await client.connect()
    mongo.db = client.db(dbName)
    console.log('Connected successfully to Mongo DB!')

  }
}

module.exports = mongo
