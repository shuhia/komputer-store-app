export default function LaptopView(element, props) {
  const { baseUrl } = props;
  this.title = element.querySelector(".laptop-title");
  this.description = element.querySelector(".laptop-description");
  this.image = element.querySelector(".laptop-image");
  this.price = element.querySelector(".laptop-price");
  this.buy = element.querySelector("button");
  this.render = function (laptop) {
    console.log("render: LaptopView");
    this.title.innerText = laptop.title;
    this.description.innerText = laptop.description;
    this.image.src = baseUrl + "/" + laptop.image;
    this.price.innerText = props.currencyFormatter.format(laptop.price);
    this.buy.onclick = () => {
      props.user.buy(laptop);
    };
  };
}
