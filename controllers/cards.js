const mongoose = require('mongoose');
const Card = require('../models/card');
const NotFound = require('../error/error');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Ошибка создания карточки' }));
};

module.exports.deleteCardId = (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    return Card.findById(req.params.cardId)
      .orFail(() => new NotFound(`Карточки с таким id ${req.params.cardId} нет в базе`))
      .then((card) => {
        if (card.owner === req.user._id) {
          Card.deleteOne(card).then(() => res.send({ data: card }));
        } else {
          res.status(401).send({ message: 'Вы не можете удалять карточки, добавленные другим пользователем' });
        }
      })
      .catch((err) => {
        const statusCode = err.statusCode || 500;
        const message = statusCode === 500 ? 'Ошибка' : err.message;
        res.status(statusCode).send({ message });
      });
  }
  return res.status(400).send({ error: 'К сожалению, это неверный формат id карточки' });
};
