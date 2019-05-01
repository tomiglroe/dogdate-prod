'use strict';

const User = require('../../models/user');

function updateUser(req, res) {
  let userId = req.params.id;
  let update = req.body;

  // Borro la password
  delete update.password;

  if (userId != req.user.sub) {
    return res.status(500).send({ message: 'No tienes permiso para actualizar los datos del usuario' });
  }

  User.find({ email: update.email.toLowerCase() }).exec((err, users) => {

    let user_isset = false;
    users.forEach((user) => {
      if (user && user._id != userId) user_isset = true;
    });

    if (user_isset) return res.status(404).send({ message: 'Ya existe ese correo electrónico' });

    User.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => {
      if (err) return res.status(500).send({ message: 'Error en la petición' });

      if (!userUpdated) return res.status(404).send({ message: 'No se ha podido actualizar el usuario' });

      return res.status(200).send({ user: userUpdated });
    });
  });
}

module.exports = updateUser;