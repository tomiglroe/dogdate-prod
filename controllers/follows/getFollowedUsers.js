'use strict';

//Listado de usuarios que me siguen paginado

const mongoosePaginate = require('mongoose-pagination');
const Follow = require('../../models/follow');

function getFollowedUsers (req, res) {

    let userId = req.user.sub;

    if (req.params.id) {

        userId = req.params.id;
    }
    let page = 1;

    if (req.params.page) {

        page = req.params.page;

    } else {

        page = req.params.id;
    }

    let itemsPerPage = 5;

    //Con el populate consigo cambiar el id por el objeto completo de los usuarios que me siguen
    Follow.find({ followed: userId }).populate( 'user' ).paginate(page, itemsPerPage, (err, follows, total) => {

        if (err) return res.status(500).send({ message: 'Error en el servidor'});

        if (!follows) return res.status(404).send({ message: 'No te sigue ningún usuario'});

        return res.status(200).send({

            total: total,
            pages: Math.ceil(total / itemsPerPage),
            follows
        });

    });
}

module.exports = getFollowedUsers;