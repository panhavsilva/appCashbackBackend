const express = require('express');
const routes = require('./routes');
const nunjucks = require('nunjucks');

const server = express();

nunjucks.configure('views', {
  express: server,
  autoescape: false,
  noCache: true 
})

server.use(express.static('public'));
server.use(routes);

server.set('view engine', 'njk');



server.listen(5000, function(){
  console.log( 'server is running' );
})