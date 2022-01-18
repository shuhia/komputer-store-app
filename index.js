import User from "./modules/User.js";
import LaptopsView from "./modules/LaptopsView.js";
import LaptopView from "./modules/LaptopView.js";
import { fetchLaptops, CurrencyFormatter } from "./modules/utils.js";

// Settings
const CURRENCY = "NOK";
const BASE_URL = "https://noroff-komputer-store-api.herokuapp.com";

// CurrencyFormatter adds currency at the end of the value.
const currencyFormatter = CurrencyFormatter(CURRENCY);

// Create a new user
const user = new User({ currencyFormatter });
globalThis.user = user;
user.render();

// Create a laptopView
const laptopView = new LaptopView(document.querySelector(".laptop"), {
  user,
  currencyFormatter,
  baseUrl: BASE_URL,
});

// Create a laptopsView
const laptopsView = new LaptopsView(document.querySelector(".laptops"), {
  laptopView,
});

fetchLaptops(BASE_URL)
  .then((laptops = []) => {
    // Display laptopsView after fetching laptops
    laptopsView.render(laptops);
  })
  .catch((error) => console.log(error));
