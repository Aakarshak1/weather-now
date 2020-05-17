const express = require('express');
const morgan = require('morgan');
const path = require('path');
const main = require('../routes/main');
const error = require('../utility/error');

module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('tiny'));
  // app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static('public'));
  app.use('/', main);
  app.use(error);
  app.use((req, res, next) => {
    //to handle 404
    // res.render('404');
    res.status(404).render('404');
  });
};
