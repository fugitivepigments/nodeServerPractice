var keys = require('./keys.js');
var Twitter = require('twitter');
var inquirer = require('inquirer');
const http = require('http');
const url = require('url');

var PORTONE = 7000;
var PORTTWO = 7500;
var PORTTHREE = 8000;

var client = new Twitter(keys.twitter);

//prompting user what they want to do
inquirer.prompt([{
  type: 'list',
  message: 'What would you like to do?',
  choices: ['Serve Me A Random Tweet, Sir', 'Tell Me Something Good', 'Tell Me Something Bad'],
  name: 'whatToDo',
  //then take inquirerResponse and...
}]).then(function(inquirerResponse) {
  //if it is my tweets, display 20 most recent tweets
  if (inquirerResponse.whatToDo === 'Serve Me A Random Tweet, Sir') {
    var params = {
      screen_name: 'rustyferrari',
      count: 20,
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        var randomRes = Math.floor(Math.random() * tweets.length);
        http.createServer(function(req, res) {
          res.writeHead(200, {
            'Content-Type': 'text/html'
          });
          res.end(tweets[randomRes]);
        }).listen(PORTONE);

        console.log('Server running on port: ' + PORTONE);
      }
    });
  }

  if (inquirerResponse.whatToDo === 'Tell Me Something Bad') {

    http.createServer(function(req, res) {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      var q = url.parse(req.url, true).query;
      var txtBad = ['You are terrible!', 'You are horrible!', 'You smell like garbage!', 'You are a pleb!'];
      var randomRes = Math.floor(Math.random() * txtBad.length);
      res.end(txtBad[randomRes]);
    }).listen(PORTTWO);

    console.log('Server running on port: ' + PORTTWO);

  };

  if (inquirerResponse.whatToDo === 'Tell Me Something Good') {

    http.createServer(function(req, res) {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      var q = url.parse(req.url, true).query;
      var txtGood = ['You are rad!', 'You are awesome!', 'You are a cool cat!', 'You are a King and/or Queen!'];
      var randomRes = Math.floor(Math.random() * txtGood.length);
      res.end(txtGood[randomRes]);
    }).listen(PORTTHREE);

    console.log('Server running on port: ' + PORTTHREE);

  };
}).catch(function (error) {
  if (err) {
    console.error(error.stack);
  }
});
