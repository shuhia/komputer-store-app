function WorkView(element, props) {
  const {
    handleBank = () => {},
    handleRepayLoan = () => {},
    handleWork = () => {},
    currencyFormatter = (value) => {
      return value;
    },
  } = props;
  const balance = element.querySelector(".balance");
  const bankButton = element.querySelector("#bank-button");
  const repayLoanButton = element.querySelector("#repay-loan-button");
  const workButton = element.querySelector("#work-button");

  bankButton.addEventListener("click", handleBank);
  repayLoanButton.addEventListener("click", handleRepayLoan);
  workButton.addEventListener("click", handleWork);
  this.render = (user) => {
    balance.innerHTML = `<label for="work-balance">Pay</label>
    <output id="work-balance">${currencyFormatter.format(
      user.workBalance
    )}</output>`;
    if (user.hasLoan()) {
      // Display repayLoanButton
      repayLoanButton.hidden = false;
    } else {
      repayLoanButton.hidden = true;
    }
  };
}

export default WorkView;
