let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const businessSchema = new Schema({
  business: { value: { type: String, trim: true }},
  address: { value: { type: String, trim: true }},
  invoices: [{ type: Schema.Types.ObjectId, ref: 'Invoice' }]
});

let Business = mongoose.model('Business', businessSchema);
export default Business;
