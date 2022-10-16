const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');

const {loginRequired} = require('./src/middlewares/middleware');

//Rotas da home
route.get('/', homeController.index);

//Rotas do Login
route.get('/login', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

//Rotas de Contato
route.get('/contato', loginRequired,contatoController.index);
route.get('/contato/:id', loginRequired, contatoController.editIndex);
route.post('/contato/register', loginRequired, contatoController.register);
route.post('/contato/edit/:id', loginRequired, contatoController.edit);

//Exportação de todas as rotas
module.exports = route;