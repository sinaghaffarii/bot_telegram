module.exports.symbolButtonList = (symbols) => {
  const symbolList = Object.values(symbols);
  let arr = [];
  symbolList.forEach((add, item, index) => {
    if (Math.floor(index / 3) >= arr.length) {
      const arr1 = [];
      arr.push(arr1);
    }
    arr[arr.length - 1].push({
      text: item.symbol,
    });
  });
  return arr;
};
