import mongo from '@/ports/mongo/db'

async function loadProviders () {
  await mongo.boot()
  await import('./server')
}

loadProviders()
