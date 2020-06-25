const cardsRouter = require('express').Router();
const fs = require('fs');
const path = require('path');

const cardsArray = path.join(__dirname, '../data/cards.json');

const cards = (callback) => {
  fs.readFile(cardsArray, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    callback(JSON.parse(data));
  });
};

cardsRouter.get('/', (req, res) => {
  cards((data) => res.send(data));
});

module.exports = cardsRouter;
