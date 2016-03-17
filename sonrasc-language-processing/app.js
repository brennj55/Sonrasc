import parseDate from './src/parseDate.js';
import parseAddress from './src/parseAddress.js';

let express = require('express');
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.json());
const TYPE_ERROR = 'Wrong type assoicated to request.';

app.post('/date', function (req, res) {
  if (req.body.type !== 'date') res.status(400).send(TYPE_ERROR);
  let date = parseDate(req.body.data);
  res.json({answer: date});
});

app.post('/address', function (req, res) {
  if (req.body.type !== 'address') res.status(400).send(TYPE_ERROR);
  let address = parseAddress(req.body.data);
  res.json({answer: address});
});

app.listen(9080, function () {
  console.log('Example app listening on port 9080!');
});
