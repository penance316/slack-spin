#!/usr/bin/env node

'use strict';

var PORT = process.env.PORT || 8080;

var url = require('url');
var http = require('http');
var args = require('minimist')(process.argv.slice(2));

var server = http.createServer(function(req, res) {
  var uri = url.parse(req.url).pathname;
  var people = args._;
  var date = new Date();
  var person = people[Math.floor(Math.random() * people.length)];

  // prep head
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  // build random response
  var responses = [
    person + ', its your lucky day!',
    person + ', step up to the plate',
    'Step up to the plate ' + person,
    'Ask again later........... ok it\'s ' + person,
    'And behind door number 1, ' + person
  ];

  // pick one
  var response = responses[Math.floor(Math.random() * responses.length)];
  var helpResponse = 'Checkout https://github.com/penance316/slack-spin for help.';
  var errorResponse = 'That url does not exist.';

  // check the request and respond accodingly
  if (uri === '/') {
    res.end(JSON.stringify({
      'text': response
    }));
    console.log('Request made at ' + date + '. ' + person + ' was chosen.');
  } else if (uri === '/help') {
    res.end(JSON.stringify({
      'text': helpResponse
    }));
    console.log('Help request made at ' + date + '.');
  } else {
    res.end(JSON.stringify({
      'text': errorResponse
    }));
    console.log('Error request made at ' + date + '.');
  }

});

server.listen(PORT, function() {
  console.log('Server listening on port:', PORT);
});
