#!/usr/bin/env node

'use strict';

var PORT = process.env.PORT || 8080;
var TOKEN = process.env.BOT_API_KEY;

var express = require('express');
var bodyParser = require('body-parser');
var args = require('minimist')(process.argv.slice(2)); // the names provided via slack

var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
// parse application/json
app.use(bodyParser.json());

//date for logging
var date = new Date();

/*******************\
    The routes
\*******************/

/**
 *  authenticate first on all routes
 */
app.all('/*', function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token === TOKEN) {
    next();
  } else {
    res.status(403).send({
      message: 'No token provided.'
    });
  }
});

/**
 * return the chosen one
 */
app.post('/', function(req, res) {
  var people = args._;
  var person = people[Math.floor(Math.random() * people.length)];

  // build random response
  var responses = [
    person + ', its your lucky day!',
    person + ', step up to the plate',
    'Step up to the plate ' + person,
    'Ask again later........... ok it\'s ' + person,
    'And behind door number 1, ' + person
  ];

  var response = responses[Math.floor(Math.random() * responses.length)];

  res.json({
    message: response
  });
  console.log('Request made at ' + date + '. ' + person + ' was chosen.');
});

/**
 * some assistance required
 */
app.post('/help', function(req, res) {
  res.json({
    message: 'Checkout https://github.com/penance316/slack-spin for help.'
  });
  console.log('Help request made at ' + date + '.');
});

/*******************\
    And we are off
\*******************/

app.listen(PORT, function() {
  console.log('Server listening on port:', PORT);
});
