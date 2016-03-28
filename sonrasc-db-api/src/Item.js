import { Schema } from 'mongoose';
import BoundarySchema from './Boundary.js';

const ItemSchema = new Schema({
  name: {value: String, boundary: BoundarySchema},
  price: {value: Number, boundary: BoundarySchema},
  quantity: {value: Number, boundary: BoundarySchema},
  total: {value: Number, boundary: BoundarySchema},
}, {
  timestamps: { createdAt: 'created_at '}
});

let Item = mongoose.model('Item', ItemSchema);
