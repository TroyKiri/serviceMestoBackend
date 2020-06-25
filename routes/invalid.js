const invalidRouter = require('express').Router();

invalidRouter.all('*', (req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));

module.exports = invalidRouter;
