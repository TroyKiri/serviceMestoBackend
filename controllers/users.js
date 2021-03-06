const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const NotCorrectReqError = require('../errors/not-correct-req-error');
const NoUniqueEmailError = require('../errors/unique-email-error');
const devSecret = require('../secret_key/secretKey');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserId = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
    return User.findById(req.params.userId)
      .orFail(() => { throw new NotFoundError(`Пользователя с таким id ${req.params.userId} нет в базе`); })
      .then((user) => res.send({ data: user }))
      .catch((err) => next(err));
  }
  const err = new NotCorrectReqError('К сожалению, это неверный формат id пользователя');
  return next(err);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : devSecret, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => res.send({
        user: {
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        },
      }))
      .catch((e) => {
        const err = new NoUniqueEmailError('Пользователь с таким email уже зарегистрирован');
        return next(err);
      }));
};
