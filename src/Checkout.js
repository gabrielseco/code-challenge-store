class Checkout {
  constructor(pricingRules, items) {
    this.pricingRules = pricingRules;
    this.items = items;
    this.state = {
      itemsSaved: [],
    };
  }

  scan(code) {
    const storeItem = this.items.filter((item) => item.code === code);
    this.state = Object.assign({}, this.state, {
      itemsSaved: [...this.state.itemsSaved, ...storeItem],
    });
    return this;
  }

  getItems() {
    return this.state.itemsSaved.map((item) => item.code).join(',');
  }

  getBulkDiscount(itemQuantity, type) {
    return itemQuantity >= this.pricingRules[type].quantity ?
      itemQuantity * this.pricingRules[type].offer :
      itemQuantity * this.pricingRules[type].price;
  }

  getOneFreeDiscount(itemQuantity, type) {
    const rest = itemQuantity % this.pricingRules[type].quantity === 0 ? 0 : 1;
    const totalVouchers = parseInt(itemQuantity / this.pricingRules[type].quantity, 10) + rest;
    const vouchersAfterDiscount = totalVouchers * this.pricingRules[type].price;

    return itemQuantity >= this.pricingRules[type].quantity ?
      vouchersAfterDiscount :
      (itemQuantity * this.pricingRules[type].price);
  }

  getMugsTotal() {
    const quantity = this.state.itemsSaved.filter((item) => item.code === 'MUG').length;
    const price = this.pricingRules.MUG.price;
    return quantity * price;
  }

  getShirtsTotal() {
    const discountType = this.pricingRules.TSHIRT.type;
    const quantity = this.state.itemsSaved.filter((item) => item.code === 'TSHIRT').length;
    const fn = this[`get${discountType}Discount`];
    return fn.call(this, quantity, 'TSHIRT');
  }

  getVouchersTotal() {
    const discountType = this.pricingRules.VOUCHER.type;
    const quantity = this.state.itemsSaved.filter((item) => item.code === 'VOUCHER').length;
    const fn = this[`get${discountType}Discount`];
    return fn.call(this, quantity, 'VOUCHER');
  }

  getTotal() {
    return this.getMugsTotal() + this.getShirtsTotal() + this.getVouchersTotal();
  }
}

export default Checkout;
