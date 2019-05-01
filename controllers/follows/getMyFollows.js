'use strict';

//Listado de usuarios que sigo sin paginar

const Follow = require('../../models/follow');

function getMyFollows(req, res) {
	let userId = req.user.sub;

	let find = Follow.find({ user: userId });

	if (req.params.followed) {

		find = Follow.find({ followed: userId });
	}

	find.populate('user followed').exec((err, follows) => {
		if (err) return res.status(500).send({ message: 'Error en el servidor' });

		if (!follows) return res.status(404).send({ message: 'No sigues ningun usuario' });

		return res.status(200).send({ follows });
	});
}

module.exports = getMyFollows;