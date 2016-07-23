var express = require('express');
var app = express();

var compression = require('compression');
var oneDay = 86400000;

app.use(compression());

app.use(express.static(__dirname + '/static', {'maxAge': oneDay}));

app.get('/hello', function (req, res) {
  res.send('Hello World!');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
