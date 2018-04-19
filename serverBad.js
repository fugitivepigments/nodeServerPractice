const http = require('http');
const url = require('url');

const PORT = 7500;

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true).query;
  var txtBad = ['You are terrible!', 'You are horrible!', 'You smell like garbage!', 'You are a pleb!'];
  var randomRes = Math.floor(Math.random() * txtBad.length);
  res.end(txtBad[randomRes]);
}).listen(7500);

console.log('Server running on port: ' + PORT);
