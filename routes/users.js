const usersRouter = require('express').Router();
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

usersRouter.get('/users', (req, res) => {
  users((data) => res.send(data));
});

module.exports = usersRouter;
