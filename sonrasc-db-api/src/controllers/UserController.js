import User from '../models/User';

const getName = (req, res) => {
  if (!req.body.id) return res.json({ error: 'no id given.' });
  else return User.findOne({ username: req.body.id })
     .exec((err, user) => {
       if (err) res.send(err);
       else if (req.user.business !== user.business) res.send(err);
       else res.json({ firstName: user.firstName, lastName: user.lastName });
    });
};

const checkIfUsernameAvailable = (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) res.send(err);
    if (!user) res.json({available: true});
    else res.json({available: false});
  });
}

const getUsers = (req, res) => {
  User.find((err, users) => {
    if (err) res.send(err);
    res.json(users);
  });
};

export default {
  checkIfUsernameAvailable,
  getName,
  getUsers
};
