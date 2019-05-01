'use strict';

const User = require('../../models/user');
const Follow = require('../../models/follow');

function getUser(req, res) {

  const userId = req.params.id;

  User.findById(userId, (err, user) => {

    if (err) return res.status(500).send({ message: 'Error en la petición' });

    if (!user) return res.status(404).send({ message: 'El usuario no existe' });

    //Busco si sigo a ese usuario y si él me sigue a mi, ya que si no lo sigo pondré botón en frontend por si quiero seguirlo
    followThisUser(req.user.sub, userId).then((value) => {

      user.password = undefined;

      return res.status(200).send({
        user,
        following: value.following,
        followed: value.followed
      });
    });
  });
}

async function followThisUser(identity_user_id, user_id) {

  const following = await Follow.findOne({ 'user': identity_user_id, 'followed': user_id }).exec().then((follow) => {

    return follow;

  }).catch((err) => {

    return handleError(err);
  });

  const followed = await Follow.findOne({ 'user': user_id, 'followed': identity_user_id }).exec().then((follow) => {

    return follow;

  }).catch((err) => {

    return handleError(err);
  });

  return {
    following: following,
    followed: followed
  }
}

module.exports = getUser;