'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = Schema({
  
  dogname: String,
  email: String,
  password: String,
  image: String
});

//El nombre 'User' lo pluraliza y lo convierte en users
const User = mongoose.model('User', UserSchema);

module.exports = User;