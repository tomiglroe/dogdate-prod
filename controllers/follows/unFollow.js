'use strict';

const Follow = require('../../models/follow');

function unFollow (req, res) {

    const userId = req.user.sub;
    const followId = req.params.id;

    Follow.find({ 'user': userId, 'followed': followId }).remove( err => {

        if (err) return res.status(500).send({ message: 'No se pudo dejar de seguir al usuario'});

        return res.status(200).send({ message: 'Ya no sigues a este usuario'});
    });
}

module.exports = unFollow;