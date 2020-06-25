const usersRouter = require('express').Router();
const usersIdRouter = require('express').Router();
const fs = require('fs');
const path = require('path');

const usersArray = path.join(__dirname, '../data/users.json');

const users = (callback) => {
  fs.readFile(usersArray, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    callback(JSON.parse(data));
  });
};

usersRouter.get('/', (req, res) => {
  users((data) => res.send(data));
});

usersIdRouter.get('/:id', (req, res) => {
  users((data) => {
    const userId = data.find((item) => req.params.id === item._id);
    if (!userId) {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
    return res.send(userId);
  });
});

module.exports = {
  usersRouter,
  usersIdRouter,
};
