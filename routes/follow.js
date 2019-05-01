'use strict';

const express = require('express');

const follow = require('../controllers/follows/follow');
const unFollow = require('../controllers/follows/unFollow');
const getFollowingUsers = require('../controllers/follows/getFollowingUsers');
const getFollowedUsers = require('../controllers/follows/getFollowedUsers');
const getMyFollows = require('../controllers/follows/getMyFollows');


const api = express.Router();
const md_auth = require('../middlewares/authenticated');

api.post('/follow', md_auth.ensureAuth, follow);
api.delete('/follow/:id', md_auth.ensureAuth, unFollow);
api.get('/following/:id?/:page?', md_auth.ensureAuth, getFollowingUsers);
api.get('/followed/:id?/:page?', md_auth.ensureAuth, getFollowedUsers);
api.get('/my-follows/:followed?', md_auth.ensureAuth, getMyFollows);


module.exports = api;