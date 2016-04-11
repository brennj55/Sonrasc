import Business from '../models/Business';

const getBusinesses = (req, res) => {
  Business.find()
    .select('business _id')
    .exec((error, businesses) => {
    res.json({ payload: businesses });
  });
}

const getSingleBusiness = (req, res) => {
  let id = req.params.id;

  Business.findOne({ _id: id })
    .select('invoices')
    .populate('invoices')
    .exec((error, business) => {
    res.json({ cool: business});
  });
};

export default {
  getBusinesses,
  getSingleBusiness
};
