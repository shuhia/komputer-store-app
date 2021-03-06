import User from "./modules/User.js";
import LaptopsView from "./modules/LaptopsView.js";
import LaptopView from "./modules/LaptopView.js";
import BankView from "./modules/BankView.js";
import WorkView from "./modules/WorkView.js";
import { fetchLaptops, CurrencyFormatter } from "./modules/utils.js";

// Settings
const CURRENCY = "NOK";
const BASE_URL = "https://noroff-komputer-store-api.herokuapp.com";

// CurrencyFormatter adds currency at the end of the value.
const currencyFormatter = CurrencyFormatter(CURRENCY);

// Create a new user
const user = new User({ name: "Alex", currencyFormatter });

// Create a bankView
const bankView = new BankView(document.querySelector(".bank"), {
  currencyFormatter,
  handleLoan: () => {
    user.loan();
    bankView.render(user);
    workView.render(user);
  },
});

bankView.render(user);

// Create a workView

const workView = new WorkView(document.querySelector(".work"), {
  handleBank: () => {
    user.bank();
    workView.render(user);
    bankView.render(user);
  },
  handleWork: () => {
    user.work();
    workView.render(user);
  },
  handleRepayLoan: () => {
    user.repayLoan();
    workView.render(user);
    bankView.render(user);
  },
  currencyFormatter,
});

workView.render(user);
// Create a laptopView
const laptopView = new LaptopView(document.querySelector(".laptop"), {
  handleBuy: (laptop) => {
    user.buy(laptop);
    bankView.render(user);
  },
  user,
  currencyFormatter,
  baseUrl: BASE_URL,
});

// Create a laptopsView
const laptopsView = new LaptopsView(document.querySelector(".laptops"), {
  handleSelectedLaptop: (laptop) => {
    laptopView.render(laptop);
  },
});

fetchLaptops(BASE_URL)
  .then((laptops = []) => {
    // Fix visor image path
    const visorLaptop = laptops.find((laptop) => laptop.title === "The Visor");
    if (visorLaptop) {
      visorLaptop.image = visorLaptop.image.replace("jpg", "png");
    }

    // Display laptopsView after fetching laptops
    laptopsView.render(laptops);
  })
  .catch((error) => console.log(error));
