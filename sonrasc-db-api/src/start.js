import express from 'express';
import Passport from 'passport';
import BusinessController from './controllers/BusinessController';
import InvoiceController from './controllers/InvoiceController';
import UserController from './controllers/UserController';
import AuthenicationController from './controllers/AuthenicationController';

let mongoose = require('mongoose');
let bodyParser = require('body-parser');

mongoose.connect('mongodb://db:27017/db');
const app = express();

app.use(bodyParser.json({ limit: '5mb' }));
app.use(Passport.initialize());

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
  .get(AuthenicationController.isAuthenticated, BusinessController.getBusinesses);

router.route('/businesses/:id')
  .get(AuthenicationController.isAuthenticated, BusinessController.getSingleBusiness);

router.route('/invoices')
  .post(AuthenicationController.isAuthenticated, InvoiceController.uploadInvoice)
  .get(AuthenicationController.isAuthenticated, InvoiceController.getInvoices);

router.route('/invoices/:id')
  .get(AuthenicationController.isAuthenticated, InvoiceController.findInvoice);

router.route('/users')
  .post(UserController.postUsers)
  .get(AuthenicationController.isAuthenticated, UserController.getUsers);

app.use('/api', router);
app.listen(port);
console.log("🌎 Listening for Database API calls.");
