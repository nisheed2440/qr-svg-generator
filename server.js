var QrSvg = require('./qr-svg');
var express = require('express');

var userData = {
  name: 'John Doe',
  email: 'john_doe@xyz.com',
  id: 'jdoe2',
  designation: 'Fancy Title Here'
};

var app = express();

app.get('/qr-image', function (req, res) {
  var color = '#' + (req.query.color || '1D1D1D');
  var code = QrSvg(JSON.stringify(userData), color);
  res.type('svg');
  code.pipe(res);
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000);