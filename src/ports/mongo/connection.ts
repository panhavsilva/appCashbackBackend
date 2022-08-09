import { MongoClient, Db } from 'mongodb'

const urlMongo = process.env.MONGO_URL

const dbName = process.env.MONGO_DB_NAME

export const dbConnection = {
  db: {} as Db,
  boot: async () => {
    const client = new MongoClient(urlMongo, { useUnifiedTopology: true })
    console.log(urlMongo)

    await client.connect()
    dbConnection.db = client.db(dbName)
    console.log('Connected successfully to Mongo DB!')
  },
}
