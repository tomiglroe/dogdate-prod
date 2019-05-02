'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//cargar rutas
const user_routes = require('./routes/user');
const follow_routes = require('./routes/follow');
const publication_routes = require('./routes/publication');

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//cors - configurar cabeceras http
app.use((req, res, next) => {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
});

//rutas
app.use('/', express.static('client', {redirect: false}));
app.use('/api', user_routes);
app.use('/api', follow_routes);
app.use('/api', publication_routes);

app.get('*', function(req, res, next) {
	
	res.sendFile(path.resolve('client/index.html'));
});

//exports

module.exports = app;
