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

function Checkout(pricingRules) {
  this.state = {
    pricingRules,
    storeItems,
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
  Checkout.prototype.scan = (code) => {
    const storeItem = this.state.storeItems[code].code;
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

  Checkout.prototype.getItems = () => this.state.itemsSaved.join(',');

  Checkout.prototype.getBulkDiscount = (itemQuantity, type) => {
    return itemQuantity >= pricingRules[type].quantity ?
      itemQuantity * pricingRules[type].price :
      itemQuantity * this.state.storeItems[type].price;
  };

  Checkout.prototype.getOneFreeDiscount = (itemQuantity, type) => {
    const rest = itemQuantity % pricingRules[type].quantity === 0 ? 0 : 1;
    const totalVouchers = parseInt(itemQuantity / pricingRules[type].quantity, 10) + rest;
    const vouchersAfterDiscount = totalVouchers * this.state.storeItems[type].price;

    return itemQuantity >= pricingRules[type].quantity ?
      vouchersAfterDiscount :
      (itemQuantity * this.state.storeItems[type].price);
  };

  Checkout.prototype.getMugsTotal = () => {
    const MUGS = this.state.items.MUG.quantity;
    return MUGS * this.state.storeItems.MUG.price;
  };

  Checkout.prototype.getShirtsTotal = () => {
    const discountType = pricingRules.TSHIRT.type;
    const shirtsQuantity = this.state.items.TSHIRT.quantity;
    const fn = this[`get${discountType}Discount`];
    return fn(shirtsQuantity, 'TSHIRT');
  };

  Checkout.prototype.getVouchersTotal = () => {
    const discountType = pricingRules.VOUCHER.type;
    const vouchersQuantity = this.state.items.VOUCHER.quantity;
    const fn = this[`get${discountType}Discount`];
    return fn(vouchersQuantity, 'VOUCHER');
  };

  Checkout.prototype.getTotal = () => {
    const mugsPrice = this.getMugsTotal();
    const shirtsPrice = this.getShirtsTotal();
    const vouchers = this.getVouchersTotal();
    return mugsPrice + shirtsPrice + vouchers;
  };

  Checkout.prototype.getTotalOutput = () => {
    const total = this.getTotal().toFixed(2);
    return `Total: ${total} ${this.state.pricingRules.GENERAL.currency}`;
  };
}

export default Checkout;
