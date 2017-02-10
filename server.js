var QrSvg = require('./qr-svg');
var express = require('express');

var userData = {
  name: 'Nisheed Jagadish',
  email: 'njagadish3@sapient.com',
  id: 'njaga2',
  designation: 'Manager Interactive Development'
};

var app = express();

app.use(express.static('public'))

app.get('/qr-image', function (req, res) {
  var code = QrSvg(JSON.stringify(userData));
  res.type('svg');
  code.pipe(res);
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000);