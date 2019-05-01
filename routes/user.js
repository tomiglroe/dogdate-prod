'use strict';

const express = require('express');
const mongoosePaginate = require('mongoose-pagination');


const pruebas = require('../controllers/user/pruebas');
const registerUser = require('../controllers/user/register');
const loginUser = require('../controllers/user/login');
const getUser = require('../controllers/user/getuser');
const getUsers = require('../controllers/user/getUsers');
const updateUser = require('../controllers/user/updateUser');
const getCounters = require('../controllers/user/getCounters');
const uploadImage = require('../controllers/user/uploadImage');
const getImageFile = require('../controllers/user/getImageFile');

const api = express.Router();
const md_auth = require('../middlewares/authenticated');

const multipart = require('connect-multiparty');
const md_upload = multipart({ uploadDir: './uploads/users'});

//Ruta de pruebas
api.get('/pruebas', md_auth.ensureAuth, pruebas);

//Rutas
api.post('/register', registerUser);
api.post('/login', loginUser);
api.get('/user/:id', md_auth.ensureAuth, getUser);
api.get('/users/:page', md_auth.ensureAuth, getUsers);
api.put('/update-user/:id', md_auth.ensureAuth, updateUser);
api.get('/counters/:id?', md_auth.ensureAuth, getCounters);
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], uploadImage);
api.get('/get-image-user/:imageFile', getImageFile);

module.exports = api;