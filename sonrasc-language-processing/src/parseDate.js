import moment from 'moment';

const parseDate = (date) => {
  date = date.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\]/gi, '');
  let data = date.split('/');
  if (new Date(data[2], data[1], data[0]).toString() !== 'Invalid Date') return new Date(data[2], data[1]-1, data[0]);
  else return moment(date);
};

export default parseDate;
