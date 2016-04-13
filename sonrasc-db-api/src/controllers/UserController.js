import User from '../models/User';

const postUsers = function(req, res) {
  console.log(req.body.username, req.body.password);
  let user = new User({
    username: req.body.username,
    password: req.body.password
  });

  console.log(user);

  user.save(function(err) {
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
