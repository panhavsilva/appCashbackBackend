import { MongoClient, Db } from 'mongodb'

const urlMongo = process.env.MONGO_URL

const dbName = process.env.MONGO_DB_NAME

const mongo = {
  db: {} as Db,
  boot: async () => {
    const client = new MongoClient(urlMongo, { useUnifiedTopology: true })
    console.log(urlMongo)

    await client.connect()
    mongo.db = client.db(dbName)
    console.log('Connected successfully to Mongo DB!')
  },
}

export default mongo
