const company = {
  payroll: 0,
  salary: 0,
  pay() {
    this.payRoll += salary;
  },
};

const bank = {
  balance: 0,
  debt: 0,
  interest: 0.1,
  currency: "kr",
  withdraw(amount) {
    if (amount <= this.balance) this.balance -= amount;
  },
  deposit(amount) {
    if (amount >= 0) this.balance += amount;
  },
  loan(amount) {
    // Increase deficit and increase balance
    const loan = amount;
    this.balance += loan;
    this.debt += loan;
  },
  repay(amount) {},
};

function User() {
  this.salary = 1000;
  this.balance = 1000;
  this.currency = "kr";
  this.debt = 0;
  this.workBalance = 0;
  this.work = () => {
    this.workBalance += this.salary;
    this.render();
  };
  this.bank = () => {
    if (this.debt > 0) {
      // set aside 10% of salary to repay loan
      let amount = this.workBalance * 0.1;
      let leftOver = this.payDebt(amount);
      if (leftOver > 0) this.balance += leftOver;
      this.balance += this.workBalance * 0.9;
    } else {
      this.balance += this.workBalance;
    }
    this.workBalance = 0;
    this.render();
  };
  this.loan = () => {
    const input = prompt("Please enter amount to loan");
    const amount = parseInt(input, 10);
    if (amount + this.debt < 2 * this.balance) {
      this.balance += amount;
      this.debt += amount;
    }
    this.render();
  };
  this.payDebt = (amount) => {
    this.debt -= amount;
    if (this.debt < 0) {
      let leftOver = -this.debt;
      return leftOver;
    } else return 0;
  };
  this.buy = () => {};
  this.render = () => {
    document.getElementById("balance").innerHTML = this.balance + this.currency;
    document.getElementById("loan-value").innerHTML = this.debt + this.currency;
    document.getElementById("work-balance").value =
      this.workBalance + this.currency;
  };
  this.render();
}
const balance = document.getElementById("balance");

const user = new User();

const exampleLaptop = {
  id: 1,
  title: "Classic Notebook",
  description: "A little old, but turns on.",
  specs: [
    "Has a screen",
    "Keyboard works, mostly",
    "32MB Ram (Not upgradable)",
    "6GB Hard Disk",
    "Comes with Floppy Disk Reader (Free) - Requires cable",
    "Good exercise to carry",
  ],
  price: 200,
  stock: 1,
  active: true,
  image: "assets/images/1.png",
};

async function fetchLaptops() {
  // Fetch laptops from Noroffs API
  const laptops = await fetch(
    "https://noroff-komputer-store-api.herokuapp.com/computers"
  )
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });

  console.log(laptops);
  return laptops;
}

fetchLaptops().then((laptops = []) => {
  // update view
  // Display laptops
  const laptopsView = document.querySelector(".laptops");
  const selectElement = laptopsView.querySelector("select");
  const featureElement = laptopsView.querySelector("ul");
  selectElement.innerHTML = laptops.map(
    (laptop) => `<option value=${laptop.id}>${laptop.title}</option>`
  );

  function displayFeatures(laptop) {
    const features = laptop.specs.map((spec) => `<li>${spec}</li>`).join("");
    featureElement.innerHTML = features;
  }
  // display selected laptop
  if (laptops) displayFeatures(laptops[0]);

  const handleChange = (e) => {
    const id = e.target.value;
    const selectedLaptop = laptops.find((laptop) => laptop.id == id);
    if (selectedLaptop) displayFeatures(selectedLaptop);
    console.log(laptops);
  };

  selectElement.addEventListener("change", handleChange);

  // Display selectedLaptop
});

// Renders a card with select and display features of the selected laptop
function LaptopsView(element, laptops) {
  this.selectedLaptop = {};
  this.laptops = laptops;
  // Updates the DOM with new HTML code
  this.render = function () {};
}

function LaptopView(element, selectedLaptop) {
  this.view = ``;
  this.render = function () {
    element.innerHTML = view;
  };
}
