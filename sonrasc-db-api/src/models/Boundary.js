let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const BoundarySchema = new Schema({
  height: Number,
  left: Number,
  top: Number,
  width: Number
});

export default BoundarySchema;
