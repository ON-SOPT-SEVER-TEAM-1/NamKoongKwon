const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const { sequelize } = require('./models');
const app = express();
sequelize.sync({});

app.set('views', path.join(__dirname, 'public'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(session({secret: 'secret'})); // session 방식 구현시 필요
app.use('/', indexRouter);

module.exports = app;
