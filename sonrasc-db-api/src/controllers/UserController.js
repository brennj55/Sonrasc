import User from '../models/User';

const postUsers = (req, res) => {
  let user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save((err) => {
    if (err) res.send(err);
    res.json({
      message: "New admin user added to database."
    });
  });
};

const getUsers = (req, res) => {
  User.find((err, users) => {
    if (err) res.send(err);
    res.json(users);
  });
};

export default {
  postUsers,
  getUsers
};
