import * as dotenv from 'dotenv';
dotenv.config();

import mongo from '@/services/db';

async function loadProviders() {
  await mongo.boot()
  await import('./server')
}

loadProviders()
