let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  business: {
    type: String,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.statics.createUser = (req, callback) => {
  let user = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    business: req.body.business,
    isAdmin: true
  });

  user.password = user.generateHash(req.body.password);

  console.log(user);

  user.save(function(err) {
    if (err) res.send(err);
    return callback(null, user);
  });
};

let User = mongoose.model('User', UserSchema);
export default User;
