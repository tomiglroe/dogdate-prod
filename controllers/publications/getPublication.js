'use strict';

const Publication = require('../../models/publication');

function getPublication(req, res) {

  const publicationId = req.params.id;

  Publication.findById(publicationId, (err, publication) => {

    if (err) return res.status(500).send({ message: 'Error al devolver publicación' });

    if (!publication) return res.status(404).send({ message: 'No existe la publicación' });

    return res.status(200).send({ publication });
  });
}

module.exports = getPublication;