'use strict';

const moment = require('moment');
const Publication = require('../../models/publication');

function savePublication (req, res) {

  const params = req.body;

  if (!params.text) return res.status(200).send({ message: 'Tienes que cubrir el campo Texto'});

  let publication = new Publication();
  publication.text = params.text;
  publication.file = 'null';
  publication.user = req.user.sub;
  publication.created_at = moment().unix();

  publication.save((err, publicationStored) => {

    if (err) return res.status(500).send({ message: 'Error al subir la publicación'});

    if (!publicationStored) return res.status(404).send({ message: 'La publicación no se ha podido subir'});

    return res.status(200).send({ publication: publicationStored});
  });
}

module.exports = savePublication;