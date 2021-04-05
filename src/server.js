
const express = require('express')
const cors = require('cors')
const methodOverride = require('method-override')
const routes = getmodule('src/routes')


const server = express()

const corsOptions = {
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSucessStatus: 204
}

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(cors())
server.use(routes)

module.exports = server
