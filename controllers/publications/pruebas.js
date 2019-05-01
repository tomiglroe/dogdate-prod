'use strict';

function pruebasPublicaciones (req, res) {

	res.status(200).send({message: "Hola desde el CONTROLADOR DE PUBLICACIONES"});
}

module.exports = pruebasPublicaciones;