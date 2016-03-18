import parseDate from './src/parseDate.js';
import parseAddress from './src/parseAddress.js';
import parseItem from './src/parseItem.js';
import parsePrice from './src/parsePrice.js';
import parseQuantity from './src/parseQuantity.js';

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

app.post('/item/:id/name', function (req, res) {
  let item = parseItem(req.body.data);
  res.json({answer: item});
});

app.post('/item/:id/price', function (req, res) {
  let price = parsePrice(req.body.data);
  res.json({answer: price});
});

app.post('/item/:id/quantity', function (req, res) {
  let qty = parseQuantity(req.body.data);
  res.json({answer: qty});
});

app.post('/item/:id/vat', function (req, res) {
  let item = parseItem(req.body.data);
  res.json({answer: item});
});

app.post('/address', function (req, res) {
  if (req.body.type !== 'address') res.status(400).send(TYPE_ERROR);
  let address = parseAddress(req.body.data);
  res.json({answer: address});
});

app.listen(9080, function () {
  console.log('Example app listening on port 9080!');
});
