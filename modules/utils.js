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
  // Fetch images from Noroffs Api
  for (const laptop of laptops) {
    await addLaptopImage(laptop, baseUrl);
  }

  return laptops;
}

async function addLaptopImage(laptop, baseUrl) {
  const remotePath = laptop.image;
  let response = null;
  try {
    response = await fetch(baseUrl + "/" + remotePath);
    if (!response.ok) {
      response = await fetch(
        baseUrl + "/" + remotePath.replace(".jpg", ".png")
      );
    }
    if (!response.ok) {
      throw new Error(response.status);
    }
    const blob = await response.blob();
    const localPath = URL.createObjectURL(blob);
    laptop.image = localPath;
  } catch (error) {
  } finally {
  }
}

export { CurrencyFormatter, fetchLaptops };
