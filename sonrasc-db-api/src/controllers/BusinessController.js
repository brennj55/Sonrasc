import Business from '../models/Business';

const getBusinesses = (req, res) => {
  Business.find()
    .select('business _id')
    .exec((error, businesses) => {
      if (error) res.send(error);
      res.json({ payload: businesses });
  });
}

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

export default {
  getBusinesses,
  getSingleBusiness
};
