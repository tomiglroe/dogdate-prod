'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'clave_secreta_dogname_proyecto';

function createToken (user) {
    
    let payload = {

        sub: user._id,
        dogname: user.dogname,
        email: user.email,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(2, 'days').unix
    };

    console.log(payload);
    

    return jwt.encode(payload, secret, 'HS512');
}

module.exports = { createToken }