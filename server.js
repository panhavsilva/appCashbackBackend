const express = require('express');
const cors = require('cors');
const methodOverride = require('method-override');
const routes = require('./routes');

const server = express();

const corsOptions = {
  'origin' : 'http://127.0.0.1:5500',
  'methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
  'preflightContinue': false,
  'optionsSucessStatus': 204
};

server.use(express.json());
server.use(express.urlencoded( {extended: true} ));
server.use(express.static('public'));
server.use(methodOverride('_method'));
server.use(cors(corsOptions));
server.use(routes);


server.listen(5000, function(){
  console.log( 'server is running' );
});