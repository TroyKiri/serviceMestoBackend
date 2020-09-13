const routerCard = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCards, createCard, deleteCardId } = require('../controllers/cards');

routerCard.get('/', getCards);
routerCard.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/),
  }),
}), createCard);
routerCard.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex(),
  }),
}), deleteCardId);

module.exports = routerCard;
