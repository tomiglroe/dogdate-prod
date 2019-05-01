'use strict';

const bcrypt = require('bcrypt-nodejs');

const User = require('../../models/user');

function registerUser(req, res) {

    const params = req.body;
    const user = new User();

    if (params.dogname && params.email && params.password) {

        user.dogname = params.dogname;
        user.email = params.email;
        user.image = null;

        //Controlo usuarios duplicados

        User.find({ email: user.email.toLowerCase() }).exec((err, users) => {

            if (err) return res.status(500).send({ message: 'Error en el registro de usuario' });

            if (users && users.length >= 1) {

                return res.status(200).send({ message: 'El email introducido ya existe' });
            } else {

                //Cifro password y guardo los datos
                bcrypt.hash(params.password, null, null, (err, hash) => {

                    user.password = hash;

                    user.save((err, userStored) => {

                        if (err) return res.status(500).send({ message: 'Error al guardar el usuario' });

                        if (userStored) {

                            res.status(200).send({ user: userStored });

                        } else {

                            res.status(404).send({ message: 'No se ha registrado el usuario' });
                        }
                    });
                });
            }
        });

    } else {

        res.status(200).send({ message: 'Tienes que cubrir todos los campos' });
    }
}

module.exports = registerUser;