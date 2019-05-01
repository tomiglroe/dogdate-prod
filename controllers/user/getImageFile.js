'use strict';

const fs = require('fs');
const path = require('path');

function getImageFile(req, res) {

  const image_file = req.params.imageFile;
  const path_file = './uploads/users/' + image_file;

  fs.exists(path_file, (exists) => {

    if (exists) {

      res.sendFile(path.resolve(path_file));

    } else {

      res.status(200).send({ message: 'No existe avatar' });
    }
  });
}

module.exports = getImageFile;