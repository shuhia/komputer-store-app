/**
 * @param {Element} element - Container to laptop
 * @param {Object} props - Required: baseUrl, currencyFormatter
 */
export default function LaptopView(element, props) {
  const {
    baseUrl,
    currencyFormatter,
    handleBuy = (laptop) => {
      return laptop;
    },
  } = props;

  const title = element.querySelector(".laptop-title");
  const description = element.querySelector(".laptop-description");
  const image = element.querySelector(".laptop-image");
  const price = element.querySelector(".laptop-price");
  const buy = element.querySelector("button");

  this.render = function (laptop) {
    console.log("render: LaptopView");
    title.innerText = laptop.title;
    description.innerText = laptop.description;
    image.src = baseUrl + "/" + laptop.image;
    image.alt = laptop.description;
    price.innerText = currencyFormatter.format(laptop.price);
    buy.onclick = () => {
      handleBuy(laptop);
    };
  };
}
