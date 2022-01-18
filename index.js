import User from "./modules/User.js";
import LaptopsView from "./modules/LaptopsView.js";
const CURRENCY = "NOK";
const currencyFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: CURRENCY,
});

const user = new User({ currencyFormatter });
globalThis.user = user;
user.render();

const baseUrl = "https://noroff-komputer-store-api.herokuapp.com";

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

const laptopsView = new LaptopsView(document.querySelector(".laptops"), {
  user,
  currencyFormatter,
  baseUrl,
});

fetchLaptops(baseUrl).then((laptops = []) => {
  // Display laptopsView after fetching laptops
  laptopsView.render(laptops);
});
