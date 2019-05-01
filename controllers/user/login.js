'use strict';

const bcrypt = require('bcrypt-nodejs');
const User = require('../../models/user');
const jwt = require('../../services/jwt');


function loginUser(req, res) {

  const params = req.body;

  const email = params.email;
  const password = params.password;

  User.findOne({ email: email }, (err, user) => {

    if (err) return res.status(500).send({ message: 'Error en el login de usuario' });

    if (user) {

      bcrypt.compare(password, user.password, (err, check) => {

        if (check) {

          if (params.gettoken) {

            return res.status(200).send({ token: jwt.createToken(user) });

          } else {

            user.password = undefined; //Hago esto para que no me devuelva la password en los datos

            return res.status(200).send({ user });
          }
        } else {

          return res.status(404).send({ message: 'No se ha podido identificar al usuario' });
        }
      });
    } else {

      return res.status(404).send({ message: 'No se ha podido identificar al usuario' });
    }
  });
}

module.exports = loginUser;