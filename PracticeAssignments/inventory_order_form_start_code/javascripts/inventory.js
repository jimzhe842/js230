var inventory;

(function() {
  inventory = {
    lastId: 0,
    collection: [],
    setDate: function() {
      var date = new Date();
      document.querySelector("#order_date").textContent = date.toUTCString();
    },
    cacheTemplate: function() {
      var iTmpl = document.querySelector("#inventory_item").innerHTML;
      let formatFunction = Handlebars.compile(iTmpl);
      this.template = formatFunction;
    },
    add: function() {
      this.lastId++;
      var item = {
        id: this.lastId,
        name: "",
        stock_number: "",
        quantity: 1
      };
      this.collection.push(item);

      return item;
    },
    remove: function(idx) {
      this.collection = this.collection.filter(function(item) {
        return item.id !== idx;
      });
    },
    get: function(id) {
      var found_item;

      this.collection.forEach(function(item) {
        if (item.id === id) {
          found_item = item;
          return false;
        }
      });

      return found_item;
    },
    update: function(itemElement) {
      var id = this.findID(itemElement),
          item = this.get(id);
      
      item.name = itemElement.querySelector("[name^=item_name]").value;
      item.stock_number = itemElement.querySelector("[name^=item_stock_number]").value;
      item.quantity = itemElement.querySelector("[name^=item_quantity]").value;
    },
    newItem: function(e) {
      e.preventDefault();
      var item = this.add(),
          item = this.template({ID: item.id});
      let tr = document.createElement('tr');
      tr.innerHTML = item;
      document.querySelector("#inventory").appendChild(tr);
    },
    findParent: function(e) {
      return e.target.closest("tr");
    },
    findID: function(item) {
      return +item.querySelector("input[type=hidden]").value;
    },
    deleteItem: function(e) {
      e.preventDefault();
      var item = this.findParent(e);
      item.remove();
      this.remove(this.findID(item));
    },
    updateItem: function(e) {
      var item = this.findParent(e);

      this.update(item);
    },

    bindEvents: function() {
      document.querySelector('#add_item').addEventListener('click', this.newItem.bind(this));
      document.querySelector('#inventory').addEventListener('click', e => {
        let target = e.target;
        if (target.tagName === 'A' && target.classList.contains('delete')) {
          this.deleteItem.call(this, e);
        }
      });
      document.querySelector('#inventory').addEventListener('click', e => {
        let target = e.target;
        if (target.tagName === 'INPUT') {
          this.updateItem.call(this, e);
        }
      });
      // $("#add_item").on("click", $.proxy(this.newItem, this));
      // $("#inventory").on("click", "a.delete", $.proxy(this.deleteItem, this));
      // $("#inventory").on("blur", ":input", $.proxy(this.updateItem, this));
    },
    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    }
  };
})();

document.addEventListener('DOMContentLoaded', e => {
  inventory.init.call(inventory);
});