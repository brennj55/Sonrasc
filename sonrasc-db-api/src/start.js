import express from 'express';
import Invoice from './models/Invoice';
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

mongoose.connect('mongodb://db:27017/db');
const app = express();

app.use(bodyParser.json({ limit: '5mb' }));

let port = 7004;
let router = express.Router();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', (req, res) => {
  res.json({ message: 'Boom gurl!' });
});

let businessesRoute = router.route('/businesses');
businessesRoute.get((req, res) => {
  Invoice.find().distinct('business', (error, businesses) => {
    res.json({ payload: businesses });
  });
});

let invoicesRoute = router.route('/invoices');
invoicesRoute.post((req, res) => {
  let invoice = new Invoice();

  invoice.image = req.body.image;
  invoice.business = req.body.form.business;
  invoice.date = req.body.form.date;
  invoice.address = req.body.form.address;
  invoice.items = req.body.items;

  invoice.save((err) => {
    if (err) res.send(err);
    res.json({message: 'Invoice saved to database!', data: invoice});
  });

});

invoicesRoute.get((req, res) => {
  Invoice.find((err, invoices) => {
    if (err) res.send(err);
    res.json(invoices);
  });
});

app.use('/api', router);
app.listen(port);
console.log("Listening?");
