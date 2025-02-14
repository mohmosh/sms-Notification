const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./models');
require('dotenv').config();


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// app.js


db.sequelize.authenticate()
  .then(() => {
    console.log('Connected to the MySQL database.');
  })
  .catch((err) => {
    console.error('Unable to connect to the MySQL database:', err);
  });






// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



const port = 4000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


module.exports = app;
