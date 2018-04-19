const http = require('http');
const url = require('url');

const PORT = 7000;

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true).query;
  var txtGood = ['You are awesome!', 'You are incredible!', 'You smell like a flower!', 'You are a King and/or Queen!'];
  var randomRes = Math.floor(Math.random() * txtGood.length);
  res.end(txtGood[randomRes]);
}).listen(7000);
  }
}).listen(7000);

console.log('Server running on port: ' + PORT);
