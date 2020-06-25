const express = require('express');
const path = require('path');
const { usersRouter, usersIdRouter } = require('./routes/users');
const cardsRouter = require('./routes/cards');
const invalidRout = require('./routes/invalid');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/users', usersIdRouter);
app.use('/', invalidRout);

app.listen(PORT);
