import express from 'express';
import Passport from 'passport';
import BusinessController from './controllers/BusinessController';
import InvoiceController from './controllers/InvoiceController';
import UserController from './controllers/UserController';
import AuthenicationController from './controllers/AuthenicationController';

let cors = require('cors');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

mongoose.connect('mongodb://db:27017/db');
const app = express();

app.use(cookieParser());
app.use(bodyParser.json({ limit: '5mb' }));

app.use(session({ secret: "Sonrascrocks!" }));
app.use(Passport.initialize());
app.use(Passport.session());

let port = 7004;
let router = express.Router();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', "http://192.168.99.100:8080");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if ('OPTIONS' == req.method) {
       res.sendStatus(200);
   } else {
       next();
   }
});

router.route('/businesses')
  .get(AuthenicationController.isAuthenticated, BusinessController.getBusinesses);

router.route('/businesses/:id')
  .get(AuthenicationController.isAuthenticated, BusinessController.getSingleBusiness);

router.route('/invoices')
  .post(AuthenicationController.isAuthenticated, InvoiceController.uploadInvoice)
  .get(isLoggedIn, InvoiceController.getInvoices);

router.route('/invoices/:id')
  .get(AuthenicationController.isAuthenticated, InvoiceController.findInvoice);

router.route('/register')
  .post(Passport.authenticate('local-signup'), (req, res) => {
    if (res) res.json({ success: true });
  });

router.route('/login')
  .post(Passport.authenticate('local-login'), (req, res) => {
    if (res) res.json({ success: true});
  });

function isLoggedIn(req, res, next) {
  console.log("hello?");
  console.log(req.cookies);
  if (req.isAuthenticated()) return next();

  res.redirect('/');
}

app.use('/api', router);
app.listen(port);
console.log("🌎 Listening for Database API calls.");
