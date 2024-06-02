function convertUSDToVND(amountUSD) {
  const exchangeRate = 25.45
  const amountVND = amountUSD * exchangeRate;
  return amountVND.toLocaleString('vi', { minimumFractionDigits: 3 });
}


export {
  convertUSDToVND,
}
