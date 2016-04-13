let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function(callback) {
  let user = this;
  if (!user.isModified('password')) return callback();

  bcrypt.genSalt(5, (err, salt) => {
    if (err) return callback(err);
    bcrypt.hash(user.password, salt, null, (hashError, hash) => {
      if (hashError) return callback(hashError);
      user.password = hash;
      console.log(user);
      callback();
    });
  });
});

UserSchema.methods.verifyPassword = (password, callback) => {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  })
};

let User = mongoose.model('User', UserSchema);
export default User;
