const mongoose = require('mongoose');
const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const NotCorrectDataError = require('../errors/not-correct-data-error');
const NotCorrectReqError = require('../errors/not-correct-req-error');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.deleteCardId = (req, res,next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    return Card.findById(req.params.cardId)
      .orFail(() => { throw new NotFoundError(`Карточки с таким id ${req.params.cardId} нет в базе`)})
      .then((card) => {
        if (card.owner.toString() === req.user._id) {
          Card.deleteOne(card).then(() => res.send({ data: card }));
        } else {
          throw new NotCorrectDataError(`Вы не можете удалять карточки, добавленные другим пользователем`);
        }
      })
      .catch(err => next(err));
  }
  const err = new NotCorrectReqError('К сожалению, это неверный формат id карточки');
  return next(err);
};
