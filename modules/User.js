export default function User(props) {
  const currencyFormatter = props.currencyFormatter;
  this.salary = 100;
  this.balance = 1000;
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
    const hasNoDebt = this.debt === 0;
    if (hasNoDebt) {
      const input =
        prompt(
          "Please enter amount to loan." +
            " Max: " +
            currencyFormatter.format(this.balance * 2)
        ) || 0;

      const amount = parseInt(input, 10);
      const amountIsAllowed = amount + this.debt <= 2 * this.balance;
      if (amountIsAllowed) {
        this.balance += amount;
        this.debt += amount;
      } else {
        alert("You cannot get a loan more than double of your bank balance!");
      }
    } else {
      alert(
        "You cannot get more than one bank loan before repaying the last loan!"
      );
    }

    this.render();
  };
  this.payDebt = (amount) => {
    this.debt -= amount;
    if (this.debt < 0) {
      let leftOver = -this.debt;
      this.debt = 0;
      return leftOver;
    } else return 0;
  };
  this.repayLoan = () => {
    const leftOver = this.payDebt(this.workBalance);
    this.workBalance = 0;
    this.balance += leftOver;
    this.render();
  };
  this.buy = (laptop) => {
    const hasEnoughFunds = this.balance >= laptop.price;
    if (hasEnoughFunds) {
      this.balance -= laptop.price;
      this.cart.push(laptop);
      alert("You are now the owner of laptop: " + laptop.title + "!");
    } else {
      alert("You do not have enough funds.");
      return laptop;
    }
    this.render();
  };
  const userHasLoan = () => {
    return this.debt > 0;
  };

  this.render = () => {
    document.getElementById("balance").innerHTML = currencyFormatter.format(
      this.balance
    );

    document.getElementById("work-balance").value = currencyFormatter.format(
      this.workBalance
    );
    if (userHasLoan()) {
      document.getElementById("repay-loan-button").hidden = false;
      document.getElementById("debt").hidden = false;

      document.getElementById("loan-value").innerHTML =
        currencyFormatter.format(this.debt);
    } else {
      document.getElementById("repay-loan-button").hidden = true;
      document.getElementById("debt").hidden = true;
    }
  };
}
