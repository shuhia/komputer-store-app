/**
 *
 * @param {Element} element
 * @param {Object} props - Optional: handleSelectedLaptop
 */
export default function LaptopsView(element, props) {
  const { handleSelectedLaptop = (laptop) => {} } = props;
  this.selectedLaptop = {};
  const select = element.querySelector("select");
  const list = element.querySelector("ul");
  this.displayFeatures = (laptop) => {
    const features = laptop.specs.map((spec) => `<li>${spec}</li>`).join("");
    list.innerHTML = features;
  };
  // Updates the DOM with new HTML code
  this.render = (laptops) => {
    select.innerHTML = laptops.map(
      (laptop) => `<option value=${laptop.id}>${laptop.title}</option>`
    );

    // display selected laptop
    this.selectedLaptop = laptops[0];
    if (this.selectedLaptop) {
      this.displayFeatures(this.selectedLaptop);
      handleSelectedLaptop(this.selectedLaptop);
    }
    // Update eventhandler with new laptop
    const handleChange = (e) => {
      const id = e.target.value;
      const selectedLaptop = laptops.find((laptop) => laptop.id == id);
      if (selectedLaptop) {
        this.displayFeatures(selectedLaptop);
        handleSelectedLaptop(selectedLaptop);
      }
    };
    select.addEventListener("change", (e) => {
      handleChange(e);
    });
  };
}
