var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Test!');
});

app.listen(9080, function () {
  console.log('Example app listening on port 9080!');
});
