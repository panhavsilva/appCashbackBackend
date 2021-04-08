'use strict'
require('dotenv').config()
require('getmodule')

const mongo = getmodule('src/services/db')

async function loadProviders() {
  await mongo.boot()
  getmodule('src/server')
}

loadProviders()
