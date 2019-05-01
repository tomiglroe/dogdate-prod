'use strict';

const fs = require('fs');
const Publication = require('../../models/publication');


function uploadImage(req, res) {

  const publicationId = req.params.id;

  if (req.files) {

    const file_path = req.files[Object.keys(req.files)[0]].path;
    const file_split = file_path.split('\/');
    const file_name = file_split[2];
    const ext_split = file_name.split('\.');
    const file_ext = ext_split[1];

    if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {

      Publication.findOne({ 'user': req.user.sub, '_id': publicationId }).exec((err, publication) => {

        if (publication) {
          //Coloco el useFindAndModif: false para evitar un uso deprecated de Mongodb
          Publication.findByIdAndUpdate(publicationId, { file: file_name }, { new: true, useFindAndModify: false }, (err, publicationUpdated) => {

            if (err) return res.status(500).send({ message: 'Error en la petición' });

            if (!publicationUpdated) return res.status(404).send({ message: 'No se ha podido actualizar el usuario' });

            return res.status(200).send({ publication: publicationUpdated });
          });
        } else {

          return removeFilesOfUploads(res, file_path, 'No tienes permiso para actulizar esta publicación');
        }
      });
    } else {

      return removeFilesOfUploads(res, file_path, 'Extensión de avatar no válida');
    }

  } else {

    return res.status(200).send({ message: 'No se ha subido ningún avatar' });
  }
}

function removeFilesOfUploads(res, file_path, message) {

  fs.unlink(file_path, (err) => {

    return res.status(400).send({ message: message });
  });
}

module.exports = uploadImage;