let mongoose = require('mongoose');
import ItemSchema from './Item.js';
import BoundarySchema from './Boundary.js';
import Business from './Business';
let Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  image: String,
  business: { value: {
    type: String, trim: true
  }, boundary: BoundarySchema },
  uploadedBy: String,
  businessTo: String,
  date: { value: Date, boundary: BoundarySchema },
  address: { value: String, boundary: BoundarySchema },
  items: [ItemSchema],
  totalCost: Number
}, {
  timestamps: { createdAt: 'created_at' }
});

invoiceSchema.methods.findAllInvoicesFromBusiness = (cb) => {
  return this.model('Invoice').find({ business: this.business }, cb);
};

invoiceSchema.statics.insertIntoBusinessesArray = (invoice) => {
  let query = { business: invoice.business.value, address: invoice.address.value };
  let update = {
    $push: { invoices: invoice._id },
    $addToSet: { customers: invoice.businessTo },
  };
  let options = { upsert: true, new: true };

  Business.findOneAndUpdate(query, update, options, (err, result) => {
    if (err) console.error(err);
  });
};

let Invoice = mongoose.model('Invoice', invoiceSchema);
export default Invoice;
