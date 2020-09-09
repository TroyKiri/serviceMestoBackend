const routerUser = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUsers, getUserId } = require('../controllers/users');

routerUser.get('/', getUsers);
routerUser.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserId);

module.exports = routerUser;
