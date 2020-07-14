const routerCard = require('express').Router();
const { getCards, createCard, deleteCardId } = require('../controllers/cards');

routerCard.get('/', getCards);
routerCard.post('/', createCard);
routerCard.delete('/:cardId', deleteCardId);

module.exports = routerCard;
