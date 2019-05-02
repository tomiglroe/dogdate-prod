'use strict';

const mongoose = require('mongoose');
const app = require('./app');
const port = 3800;


//Conexión a la base de datos
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/dogdatedbpmv', { useNewUrlParser: true })
  .then(() => {
    
    console.log('Conexión a dogdatedbpmv Ok');

    //Creo el servidor
    app.listen(port, () => {
      console.log('Servidor iniciado en localhost:3800');
    });
  })
  .catch(err => console.log(err));
