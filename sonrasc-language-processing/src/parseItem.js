const parseItem = (item) => {
  console.log('in parse item!', item);
  let data = item.replace(/(\r\n|\n|\r)/gm, " ");
  return data;
};

export default parseItem;
