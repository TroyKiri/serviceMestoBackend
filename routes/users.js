const routerUser = require('express').Router();
const { getUsers, getUserId, createUser } = require('../controllers/users');

routerUser.get('/', getUsers);
routerUser.get('/:userId', getUserId);
routerUser.post('/', createUser);

module.exports = routerUser;
