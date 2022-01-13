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
