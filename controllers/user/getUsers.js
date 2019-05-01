'use strict';

const mongoosePaginate = require('mongoose-pagination');

const User = require('../../models/user');
const Follow = require('../../models/follow');

function getUsers(req, res) {

    let identity_user_id = req.user.sub;
    let page = 1;

    if (req.params.page) {

        page = req.params.page;
    }

    let itemsPerPage = 10;

    User.find().sort('_id').paginate(page, itemsPerPage, (err, users, total) => {

        if (err) return res.status(500).send({ message: 'Error en la petición' });

        if (!users) return res.status(404).send({ message: 'No existen usuarios' });

        followUserIds(identity_user_id).then((value) => {


            return res.status(200).send({
                users,
                users_following: value.following,
                users_follow_me: value.followed,
                total,
                pages: Math.ceil(total / itemsPerPage)
            });

        });
    });

}

async function followUserIds(user_id) {

    //Con el :0 consigo que no me devuelva esos campos
    let following = await Follow.find({ "user": user_id }).select({ "_id": 0, "__v": 0, "user": 0 })
        .exec()
        .then((follows) => {

            let follows_clean = [];

            follows.forEach((follow) => {

                follows_clean.push(follow.followed);
            });
            return follows_clean;
        })
        .catch((err) => {

            return handleError(err);
        });

    let followed = await Follow.find({ "followed": user_id }).select({ "_id": 0, "__v": 0, "followed": 0 })
        .exec()
        .then((follows) => {

            let follows_clean = [];

            follows.forEach((follow) => {

                follows_clean.push(follow.user);
            });

            return follows_clean;
        })
        .catch((err) => {

            return handleError(err);
        });

    return {

        following: following,
        followed: followed
    }
}

module.exports = getUsers;