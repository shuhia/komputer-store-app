function BankView(element, props) {
  const {
    handleLoan = () => {},
    currencyFormatter = (value) => {
      return value;
    },
  } = props;
  const username = element.querySelector(".username");
  const balance = element.querySelector(".balance");
  const loanButton = element.querySelector("#loan-button");
  const debt = element.querySelector(".debt");
  loanButton.addEventListener("click", handleLoan);
  this.render = (user) => {
    username.innerHTML = user.name;
    balance.innerHTML = ` <label for="balance">Balance:</label>
    <output id="balance">${currencyFormatter.format(user.balance)}</output>`;
    if (user.debt > 0) {
      debt.innerHTML = `Loan value: <span id="loan-value">${currencyFormatter.format(
        user.debt
      )}</span>`;
      debt.hidden = false;
    } else {
      debt.hidden = true;
    }
  };
}

export default BankView;
