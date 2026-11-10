export const USD_TO_PKR = 278;

export const pkr = (usdPrice) => {
  const converted = Math.round(usdPrice * USD_TO_PKR);
  return `Rs. ${converted.toLocaleString("en-PK")}`;
};