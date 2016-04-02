import express from 'express';
import Invoice from './models/Invoice';
import Business from './models/Business';
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

mongoose.connect('mongodb://db:27017/db');
const app = express();

app.use(bodyParser.json({ limit: '5mb' }));

let port = 7004;
let router = express.Router();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let businessesRoute = router.route('/businesses');
businessesRoute.get((req, res) => {
  Business.find().select('business _id').exec((error, businesses) => {
    res.json({ payload: businesses });
  });
});

let businessIDRoute = router.route('/businesses/:id');
businessIDRoute.get((req, res) => {
  let id = req.params.id;

  Business.findOne({ _id: id }).select('invoices').populate('invoices').exec((error, business) => {
    res.json({ cool: business});
  });

})

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

    Invoice.insertIntoBusinessesArray(invoice);
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
console.log("Listening for Database API calls.");
