import express from 'express';
import BusinessController from './controllers/BusinessController';
import InvoiceController from './controllers/InvoiceController';

let mongoose = require('mongoose');
let bodyParser = require('body-parser');

mongoose.connect('mongodb://db:27017/db');
const app = express();

app.use(bodyParser.json({ limit: '5mb' }));

let port = 7004;
let router = express.Router();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.route('/businesses')
  .get(BusinessController.getBusinesses);

router.route('/businesses/:id')
  .get(BusinessController.getSingleBusiness);

router.route('/invoices')
  .post(InvoiceController.uploadInvoice)
  .get(InvoiceController.getInvoices);

router.route('/invoices/:id')
  .get(InvoiceController.findInvoice);

app.use('/api', router);
app.listen(port);
console.log("🌎 Listening for Database API calls!");
