'use strict';

const path = require('path');
const fs = require('fs');
const moment = require('moment');
const mongoosePaginate = require('mongoose-pagination');

const Publication = require('../../models/publication');
const User = require('../../models/user');
const Follow = require('../../models/follow');

function deletePublication(req, res) {

  const publicationId = req.params.id;

  //Comprobamos que la publicación es nuestra y la eliminamos
  Publication.findOneAndDelete({ 'user': req.user.sub, '_id': publicationId }, (err, publicationRemoved) => {

    if(err) return res.status(500).send({ message: 'Error al borrar publicación' });

    if(!publicationRemoved) return res.status(404).send({message: ' Error la publicacion no existe' });

    return res.status(200).send({message: 'Publicación eliminada correctamente'});
    });
}

module.exports = deletePublication;