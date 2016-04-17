import User from '../models/User';

const postUsers = function(req, res) {

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
