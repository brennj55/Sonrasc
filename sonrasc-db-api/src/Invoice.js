import { Schema } from 'mongoose';
import ItemSchema from './Item.js';
import BoundarySchema from './Boundary.js';

const invoiceSchema = new Schema({
  image: String,
  business: { value: String, boundary: BoundarySchema },
  date: { value: Date, boundary: BoundarySchema },
  address: { value: String, boundary: BoundarySchema },
  items: [ItemSchema],
  totalCost: Number
}, {
  timestamps: { createdAt: 'created_at '}
});

invoiceSchema.methods.findAllInvoicesFromBusiness = (cb) => {
  return this.model('Invoice').find({ business: this.business }, cb);
};

let Invoice = mongoose.model('Invoice', invoiceSchema);
