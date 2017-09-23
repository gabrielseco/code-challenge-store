// @flow
import type { Item } from './items';
import type { PricingRules } from './pricingRules';

class Checkout {
  items: Item[];
  itemsSaved: Item[];
  pricingRules: PricingRules;
  constructor(pricingRules: PricingRules, items: Item[]) {
    this.pricingRules = pricingRules;
    this.items = items;
    this.itemsSaved = [];
  }

  scan(code: string) {
    const storeItem: Item[] = this.items.filter((item) => item.code === code);
    this.itemsSaved = [...this.itemsSaved, ...storeItem];
    return this;
  }

  getItems(): string {
    return this.itemsSaved.map((item) => item.code).join(',');
  }

  getBulkDiscount(itemQuantity: number, type: string): number {
    return itemQuantity >= this.pricingRules[type].quantity ?
      itemQuantity * this.pricingRules[type].offer :
      itemQuantity * this.pricingRules[type].price;
  }

  getOneFreeDiscount(itemQuantity: number, type: string): number {
    const rest = itemQuantity % this.pricingRules[type].quantity === 0 ? 0 : 1;
    const totalVouchers = parseInt(itemQuantity / this.pricingRules[type].quantity, 10) + rest;
    const vouchersAfterDiscount = totalVouchers * this.pricingRules[type].price;

    return itemQuantity >= this.pricingRules[type].quantity ?
      vouchersAfterDiscount :
      (itemQuantity * this.pricingRules[type].price);
  }

  getDiscountFunction(type: ?string) {
    switch (type) {
      case 'BULK':
        return this.getBulkDiscount;
      case 'ONEFREE':
        return this.getOneFreeDiscount;
      default:
        return this.getBulkDiscount;
    }
  }

  getMugsTotal(): number {
    const quantity = this.itemsSaved.filter((item) => item.code === 'MUG').length;
    const price = this.pricingRules.MUG.price;
    return quantity * price;
  }

  getShirtsTotal(): number {
    const discountType = this.pricingRules.TSHIRT.type;
    const quantity = this.itemsSaved.filter((item) => item.code === 'TSHIRT').length;
    const fn = this.getDiscountFunction(discountType);
    return fn.call(this, quantity, 'TSHIRT');
  }

  getVouchersTotal(): number {
    const discountType = this.pricingRules.VOUCHER.type;
    const quantity = this.itemsSaved.filter((item) => item.code === 'VOUCHER').length;
    const fn = this.getDiscountFunction(discountType);
    return fn.call(this, quantity, 'VOUCHER');
  }

  getTotal(): number {
    return this.getMugsTotal() + this.getShirtsTotal() + this.getVouchersTotal();
  }
}

export default Checkout;
