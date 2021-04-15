import express from 'express'
import cors from 'cors'
import routes from '@/routes'

const server = express()

const corsOptions = {
  origin: process.env.CORS_ORIGINS,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSucessStatus: 204
}

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))
server.use(cors(corsOptions))
server.use(routes)

server.listen(process.env.PORT, () => {
  console.log('Server is running...')
})
