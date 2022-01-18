import LaptopView from "./LaptopView.js";
export default function LaptopsView(element, props) {
  this.laptopView = new LaptopView(document.querySelector(".laptop"), props);
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
    this.selectedLaptop = laptops[0];
    if (this.selectedLaptop) {
      this.displayFeatures(this.selectedLaptop);
      this.laptopView.render(this.selectedLaptop);
    }
    // Update eventhandler with new laptop
    const handleChange = (e) => {
      const id = e.target.value;
      const selectedLaptop = laptops.find((laptop) => laptop.id == id);
      if (selectedLaptop) {
        this.displayFeatures(selectedLaptop);
        this.laptopView.render(selectedLaptop);
      }
    };
    this.select.addEventListener("change", handleChange);
  };
}
