import * as dotenv from 'dotenv'

import mongo from '@/services/db'
dotenv.config()

async function loadProviders () {
  await mongo.boot()
  await import('./server')
}

loadProviders()
