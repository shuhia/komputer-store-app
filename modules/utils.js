/**
 * @param {string} currency
 * @returns {Intl.NumberFormat} - returns an object that has a method format(value)
 */
function CurrencyFormatter(currency) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: currency,
  });
}

/**
 * Fetches laptop from Noroffs API 
 * @param {string} baseUrl - base url
 * @returns {Array} returns a array with laptop objects
 */
async function fetchLaptops(baseUrl) {
  // Fetch laptops from Noroffs API
  const laptops = await fetch(baseUrl + "/computers")
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
  console.log(laptops);
  return laptops;
}

export { CurrencyFormatter, fetchLaptops };
