import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import routes from './routes/routes';

const server = express();
dotenv.config();

const corsOptions = {
  origin: process.env.CORS_ORIGINS,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSucessStatus: 204
};

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));
server.use(cors(corsOptions));
server.use(routes)


server.listen(process.env.PORT, () => {
  console.log('Server is running...')
});
