import User from "./modules/User.js";
import LaptopsView from "./modules/LaptopsView.js";
import { fetchLaptops, CurrencyFormatter } from "./modules/utils.js";

// Settings
const CURRENCY = "NOK";
const BASE_URL = "https://noroff-komputer-store-api.herokuapp.com";

// CurrencyFormatter adds currency at the end of the value.
const currencyFormatter = CurrencyFormatter(currency);

// Create a new user
const user = new User({ currencyFormatter });
globalThis.user = user;
user.render();

// Create a laptopsView
const laptopsView = new LaptopsView(document.querySelector(".laptops"), {
  user,
  currencyFormatter,
  BASE_URL,
});

fetchLaptops(BASE_URL)
  .then((laptops = []) => {
    // Display laptopsView after fetching laptops
    laptopsView.render(laptops);
  })
  .catch((error) => console.log(error));
