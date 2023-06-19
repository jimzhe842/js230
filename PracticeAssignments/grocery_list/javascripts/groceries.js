(function groceryListManager() {
  class GroceryList {
    constructor(listContainerElement) {
      this.list = document.querySelector(listContainerElement);
    }

    addItem(name, quantity) {
      let textContent = `${quantity} ${name}`;
      let li = document.createElement('li');
      li.textContent = textContent;
      this.list.appendChild(li);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('form');
    let nameInput = document.querySelector('#name');
    let quantityInput = document.querySelector('#quantity');
    let groceryList = new GroceryList('#grocery-list');
    form.addEventListener('submit', e => {
      e.preventDefault();
      let name = nameInput.value;
      let quantity = quantityInput.value || '1';
      groceryList.addItem(name, quantity);
      form.reset();
    });
  });
})();

