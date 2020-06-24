const express = require('express');
const path = require('path');
const usersArr = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', usersArr);

app.listen(PORT);
