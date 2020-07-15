const mongoose = require('mongoose');
const User = require('../models/user');
const NotFound = require('../error/error');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUserId = (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
    return User.findById(req.params.userId)
      .orFail(() => new NotFound(`Пользователя с таким id ${req.params.userId} нет в базе`))
      .then((user) => res.send({ data: user }))
      .catch((err) => {
        const statusCode = err.statusCode || 500;
        const message = statusCode === 500 ? 'Ошибка' : err.message;
        res.status(statusCode).send({ message });
      });
  }
  return res.status(400).send({ error: 'К сожалению, это неверный формат id' });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
