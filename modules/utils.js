function CurrencyFormatter(currency) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: currency,
  });
}

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
