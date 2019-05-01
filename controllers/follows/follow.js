'use strict';

const Follow = require('../../models/follow');

function follow (req, res) {

    const params = req.body;
    const follow = new Follow();
    follow.user = req.user.sub;
    follow.followed = params.followed;

    follow.save((err, followStored) => {

        if (err) return res.status(500).send({ message: 'No se pudo seguir al usuario'});

        if (!followStored) return res.status(404).send({ message: 'No se pudo seguir al usuario'});

        return res.status(200).send({ follow: followStored});
    });
}



module.exports = follow;