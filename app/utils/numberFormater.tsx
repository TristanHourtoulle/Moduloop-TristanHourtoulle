function addSpaces(number: Number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function numberFormater(
  number: Number,
  float: boolean,
  maxDecimal?: Number
) {
  let res = addSpaces(number);

  if (float && Number(res) >= 1.0) {
    res = Number(res).toFixed(0);
  }

  return res;
}
