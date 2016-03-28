import { Schema } from 'mongoose';

const BoundarySchema = new Schema({
  height: Number,
  left: Number,
  top: Number,
  width: Number
});

export default BoundarySchema;
