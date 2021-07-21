import { dbConnection } from '@/adapters/db'

async function loadProviders () {
  await dbConnection.boot()
  await import('./server')
}

loadProviders()
