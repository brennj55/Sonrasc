const parseDate = (date) => {
  let data = date.split('/');
  return new Date(data[2], data[1], data[0]);
};

export default parseDate;
