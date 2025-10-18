export function validateASIN(asin) {
  return /^[A-Z0-9]{10}$/.test(asin);
}
