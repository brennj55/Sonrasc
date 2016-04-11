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

let businessesRoute = router.route('/businesses');
businessesRoute.get(BusinessController.getBusinesses);

let businessIDRoute = router.route('/businesses/:id');
businessIDRoute.get(BusinessController.getSingleBusiness);

let invoicesRoute = router.route('/invoices');
invoicesRoute.post(InvoiceController.uploadInvoice);
invoicesRoute.get(InvoiceController.getInvoices);

let invoiceRoute = router.route('/invoices/:id')
invoiceRoute.get(InvoiceController.findInvoice);

app.use('/api', router);
app.listen(port);
console.log("🌎 Listening for Database API calls!");
