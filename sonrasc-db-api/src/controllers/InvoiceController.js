import Invoice from '../models/Invoice';
const fs = require('fs');
const ip = require('ip');
let bcrypt = require('bcrypt-nodejs');

const uploadInvoice = (req, res) => {
  let invoice = new Invoice();

  invoice.uploadedBy = req.body.user;
  invoice.businessTo = req.body.businessTo;
  invoice.image = saveImageSync(req.body.image);
  invoice.business = req.body.form.business;
  invoice.date = req.body.form.date;
  invoice.address = req.body.form.address;
  invoice.items = req.body.items;
  //invoice.totalCost = req.body.items.reduce((total, item) => total + item.Total.value);
  //console.log(invoice.totalCost, '..');

  invoice.save((err) => {
    if (err) res.send(err);
    Invoice.insertIntoBusinessesArray(invoice);
    res.json({message: 'Invoice saved to database!', data: invoice});
  });

};

const saveImageSync = (imageFromUser) => {
  let data = imageFromUser.replace(/^data:image\/png;base64,/, '');
  data = data.replace(/^data:image\/jpeg;base64,/, '');
  const buffer = new Buffer(data, 'base64');
  console.log("Writing image...");
  let file = getHashedFileName();
  let filename = '/src/images/' + file + '.jpg';
  fs.writeFileSync(filename, buffer);
  filename = "http://" + ip.address() + ":9005/api/images/" + file;
  console.log('heres your filename!', filename);
  return filename;
};

const getHashedFileName = () => {
  let filename = bcrypt.hashSync(Math.random() + ' ' + new Date().toString(), bcrypt.genSaltSync(8), null);
  filename = filename.replace(/\W/g, '')
  return filename;
};

const getInvoices = (req, res) => {
  console.log(req.user);
  Invoice.find({ businessTo: req.user.business }, (err, invoices) => {
    if (err) res.send(err);
    console.log(invoices);
    res.json(invoices);
  });
};

const findInvoice = (req, res) => {
  let id = req.params.id;

  Invoice.findOne({ businessTo: req.user.business, _id: id }).exec((err, invoices) => {
    if (err) res.send(err);
    res.json(invoices);
  });
};

const getGraphData = (req, res) => {
  Invoice.find({ businessTo: req.user.business })
    .select('totalCost date')
    .exec((err, invoices) => {
      if (err) res.send(err);
      res.json(invoices);
    });
}

export default {
  uploadInvoice,
  getInvoices,
  findInvoice,
  getGraphData
};
