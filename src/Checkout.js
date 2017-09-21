const storeItems = {
  VOUCHER: {
    code: 'VOUCHER',
    currency: '€',
    name: 'Cabify Voucher',
    price: 5,
  },
  TSHIRT: {
    code: 'TSHIRT',
    currency: '€',
    name: 'Cabify T-Shirt',
    price: 20,
  },
  MUG: {
    code: 'MUG',
    currency: '€',
    name: 'Cabify Mug',
    price: 7.5,
  },
};

const Checkout = (() => {
  function Constructor(pricingRules) {
    this.pricingRules = pricingRules;
    this.state = {
      items: {
        VOUCHER: {
          quantity: 0,
        },
        TSHIRT: {
          quantity: 0,
        },
        MUG: {
          quantity: 0,
        },
      },
      itemsSaved: [],
    };
  }

  Constructor.prototype.scan = function (code) {
    const storeItem = storeItems[code].code;
    const items = Object.assign({}, this.state.items, {
      [code]: {
        quantity: this.state.items[code].quantity + 1,
      },
    });
    this.state = Object.assign({}, this.state, {
      items,
      itemsSaved: [...this.state.itemsSaved, ...[storeItem]],
    });
    return this;
  };

  Constructor.prototype.getItems = function () {
    return this.state.itemsSaved.join(',');
  };

  Constructor.prototype.getBulkDiscount = function (itemQuantity, type) {
    return itemQuantity >= this.pricingRules[type].quantity ?
      itemQuantity * this.pricingRules[type].price :
      itemQuantity * storeItems[type].price;
  };

  Constructor.prototype.getOneFreeDiscount = function (itemQuantity, type) {
    const rest = itemQuantity % this.pricingRules[type].quantity === 0 ? 0 : 1;
    const totalVouchers = parseInt(itemQuantity / this.pricingRules[type].quantity, 10) + rest;
    const vouchersAfterDiscount = totalVouchers * storeItems[type].price;

    return itemQuantity >= this.pricingRules[type].quantity ?
      vouchersAfterDiscount :
      (itemQuantity * storeItems[type].price);
  };

  Constructor.prototype.getMugsTotal = function () {
    const MUGS = this.state.items.MUG.quantity;
    return MUGS * storeItems.MUG.price;
  };

  Constructor.prototype.getShirtsTotal = function () {
    const discountType = this.pricingRules.TSHIRT.type;
    const shirtsQuantity = this.state.items.TSHIRT.quantity;
    const fn = this[`get${discountType}Discount`];
    return fn.call(this, shirtsQuantity, 'TSHIRT');
  };

  Constructor.prototype.getVouchersTotal = function () {
    const discountType = this.pricingRules.VOUCHER.type;
    const vouchersQuantity = this.state.items.VOUCHER.quantity;
    const fn = this[`get${discountType}Discount`];
    return fn.call(this, vouchersQuantity, 'VOUCHER');
  };

  Constructor.prototype.getTotal = function () {
    const mugsPrice = this.getMugsTotal();
    const shirtsPrice = this.getShirtsTotal();
    const vouchers = this.getVouchersTotal();
    return mugsPrice + shirtsPrice + vouchers;
  };

  return Constructor;
})();

export default Checkout;
