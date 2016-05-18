import Invoice from '../models/Invoice';
const fs = require('fs');
const ip = require('ip');
const Q = require('q');
const fsWriteFile = Q.denodeify(fs.writeFile);
let bcrypt = require('bcrypt-nodejs');

const uploadInvoice = (req, res) => {
  let invoice = new Invoice();

  invoice.uploadedBy = req.body.user;
  invoice.businessTo = req.body.businessTo;
  invoice.business = req.body.form.business;
  invoice.date = req.body.form.date;
  invoice.address = req.body.form.address;
  invoice.items = req.body.items;

  let total = 0;
  req.body.items.map(item => {
    total += item.Total.value;
  });
  invoice.totalCost = total;


  console.log(invoice.totalCost, '..');

  saveImage(req.body.image, req.hostname, invoice, () => {
    console.log(invoice);
    invoice.save((err) => {
      if (err) res.json({ message: "Error saving to database.", data: null });
      else {
        Invoice.insertIntoBusinessesArray(invoice);
        res.json({message: 'Invoice saved to database!', data: invoice});
      }
    });
  });
};

const saveImage = (imageFromUser, url, invoice, callback) => {
  let data = imageFromUser.replace(/^data:image\/png;base64,/, '');
  data = data.replace(/^data:image\/jpeg;base64,/, '');
  const buffer = new Buffer(data, 'base64');
  console.log("Writing image...");
  let file = getHashedFileName();
  let filename = '/src/images/' + file + '.jpg';
  fs.writeFile(filename, buffer, (err) => {
    if (err) throw err;
    console.log('how did i get hereeee.');
    invoice.image = "http://" + url + ":7004/api/images/" + file;
    callback();
  })
};

const getHashedFileName = () => {
  let filename = bcrypt.hashSync(Math.random() + ' ' + new Date().toString(), bcrypt.genSaltSync(8), null);
  filename = filename.replace(/\W/g, '')
  return filename;
};

const getInvoices = (req, res) => {
  console.log(req.user);
  Invoice.find({ businessTo: req.user.business }, (err, invoices) => {
    if (err) res.json({error: err});
    else res.json(invoices);
  });
};

const findInvoice = (req, res) => {
  let id = req.params.id;

  Invoice.findOne({ businessTo: req.user.business, _id: id }).exec((err, invoices) => {
    if (err) res.json({error: err});
    else res.json(invoices);
  });
};

const getGraphData = (req, res) => {
  Invoice.find({ businessTo: req.user.business })
    .select('totalCost date business')
    .exec((err, invoices) => {
      if (err) res.json({error: err});
      else {
        let data = invoices.map(invoice => { return {
          x: new Date(invoice.date.value).getTime(),
          y: invoice.totalCost,
          business: invoice.business
        }});
        res.json(data);
      }
    });
}

export default {
  uploadInvoice,
  getInvoices,
  findInvoice,
  getGraphData
};
