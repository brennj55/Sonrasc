import Business from '../models/Business';
import User from '../models/User';

const getBusinesses = (req, res) => {
  Business.find({ customers: { "$in": [req.user.business] } })
    .select('business _id')
    .exec((error, businesses) => {
      if (error) res.send(error);
      res.json({ payload: businesses });
  });
}

const getTotalBusinessSpending = (req, res) => {
  Business.find({ customers: { "$in": [req.user.business] } })
    .select('business invoices')
    .populate('invoices')
    .exec((error, businesses) => {
      if (error) res.send(error);
      res.json({ businesses });
  });
}

const checkIfBusinessAvailable = (req, res) => {
  User.findOne({ business: req.body.business}, (err, business) => {
    if (err) res.json({err});
    if (!business) res.json({available: true});
    else res.json({available: false});
  });
};

const getSingleBusiness = (req, res) => {
  let id = req.params.id;

  Business.findOne({ _id: id })
    .select('invoices')
    .populate('invoices')
    .exec((error, business) => {
      if (error) res.send(error);
      res.json({ business });
  });
};

const getBusinessData = (req, res) => {
  let id = req.params.id;

  Business.findOne({ _id: id, customers: { "$in": [req.user.business] }})
    .populate('invoices')
    .select('-customers')
    .exec((error, business) => {
      if (error) res.send(error);
      res.json({ business });
  });
}

export default {
  getBusinessData,
  getTotalBusinessSpending,
  getBusinesses,
  getSingleBusiness,
  checkIfBusinessAvailable
};
