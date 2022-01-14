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
  this.cart = [];
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
    const input = prompt(
      "Please enter amount to loan." + " Max: " + this.balance * 2
    );
    const amount = parseInt(input, 10);
    if (amount + this.debt <= 2 * this.balance && this.debt === 0) {
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
  this.buy = (laptop) => {
    if (this.balance >= laptop.price) {
      this.balance -= laptop.price;
      this.cart.push(laptop);
      console.log("user bought laptop: ", laptop);
    }
    this.render();
  };
  this.render = () => {
    document.getElementById("balance").innerHTML = this.balance + this.currency;
    if (this.debt > 0) {
      document.getElementById("debt").style.display = "block";
      document.getElementById("loan-value").innerHTML =
        this.debt + this.currency;
    } else {
      document.getElementById("loan-value").style.display = "none";
    }
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

const hostName = "https://noroff-komputer-store-api.herokuapp.com";

async function fetchLaptops(hostName) {
  // Fetch laptops from Noroffs API
  const laptops = await fetch(hostName + "/computers")
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });

  console.log(laptops);
  return laptops;
}

const laptopsView = new LaptopsView(document.querySelector(".laptops"));
fetchLaptops(hostName).then((laptops = []) => {
  // update view
  // Display laptops
  laptopsView.render(laptops);
});

// Renders a card with select and display features of the selected laptop
function LaptopsView(element) {
  this.laptopView = new LaptopView(document.querySelector(".laptop"));
  this.selectedLaptop = {};
  this.select = element.querySelector("select");
  this.list = element.querySelector("ul");
  this.displayFeatures = (laptop) => {
    const features = laptop.specs.map((spec) => `<li>${spec}</li>`).join("");
    this.list.innerHTML = features;
  };
  // Updates the DOM with new HTML code
  this.render = function (laptops) {
    this.select.innerHTML = laptops.map(
      (laptop) => `<option value=${laptop.id}>${laptop.title}</option>`
    );

    // display selected laptop
    selectedLaptop = laptops[0];
    if (selectedLaptop) {
      this.displayFeatures(selectedLaptop);
      this.laptopView.render(selectedLaptop);
    }

    const handleChange = (e) => {
      const id = e.target.value;
      const selectedLaptop = laptops.find((laptop) => laptop.id == id);
      if (selectedLaptop) this.displayFeatures(selectedLaptop);
      if (selectedLaptop) this.laptopView.render(selectedLaptop);
    };
    this.select.addEventListener("change", handleChange);
  };
}

function LaptopView(element) {
  this.title = element.querySelector(".laptop-title");
  this.description = element.querySelector(".laptop-description");
  this.image = element.querySelector(".laptop-image");
  this.price = element.querySelector(".laptop-price");
  this.buy = element.querySelector("button");
  this.render = function (laptop) {
    console.log("render: LaptopView");
    this.title.innerText = laptop.title;
    this.description.innerText = laptop.description;
    this.image.src = hostName + "/" + laptop.image;
    this.price.innerText = laptop.price + " kr";
    this.buy.onclick = () => {
      user.buy(laptop);
      console.log("buy laptop");
    };
  };
}
