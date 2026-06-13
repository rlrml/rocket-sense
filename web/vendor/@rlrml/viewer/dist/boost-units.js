const t = 255;
function o(n) {
  return n == null ? null : n * 100 / 255;
}
function u(n) {
  return n == null ? null : n * 255 / 100;
}
export {
  t as BOOST_RAW_MAX,
  o as boostAmountToPercent,
  u as boostPercentToAmount
};
