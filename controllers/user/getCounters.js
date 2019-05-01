'use strict';

const Follow = require('../../models/follow');
const Publication = require('../../models/publication');

function getCounters(req, res) {

  let userId = req.user.sub;
  if (req.params.id) {

    userId = req.params.id;
  }
  getCountFollow(userId).then((value) => {

    return res.status(200).send(value);
  });
}

async function getCountFollow(user_id) {

  let following = await Follow.countDocuments({ user: user_id })
    .exec()
    .then((countDocuments) => {
      return countDocuments;
    })
    .catch((err) => { return handleError(err); });

  let followed = await Follow.countDocuments({ followed: user_id })
    .exec()
    .then((countDocuments) => {
      return countDocuments;
    })
    .catch((err) => { return handleError(err); });

  let publications = await Publication.countDocuments({ user: user_id })
    .exec()
    .then((countDocuments) => {
      return countDocuments;
    })
    .catch((err) => { return handleError(err); });

  return { following: following, followed: followed, publication: publications }
}

module.exports = getCounters;