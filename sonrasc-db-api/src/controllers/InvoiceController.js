import Invoice from '../models/Invoice';

const uploadInvoice = (req, res) => {
  let invoice = new Invoice();

  console.log(req.body.form);
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

};

const getInvoices = (req, res) => {
  Invoice.find((err, invoices) => {
    if (err) res.send(err);
    res.json(invoices);
  });
};

const findInvoice = (req, res) => {
  let id = req.params.id;

  Invoice.findOne({ _id: id }).exec((err, invoices) => {
    if (err) res.send(err);
    res.json(invoices);
  });

};

export default {
  uploadInvoice,
  getInvoices,
  findInvoice
};
