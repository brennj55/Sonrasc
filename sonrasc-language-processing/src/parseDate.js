const parseDate = (date) => {
  let data = date.split('/');
  console.log(data);
  console.log(new Date(data[2], data[1], data[0]));
  return new Date(data[2], data[1]-1, data[0]);
};

export default parseDate;
