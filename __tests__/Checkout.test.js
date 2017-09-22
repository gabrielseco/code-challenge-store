import Checkout from '../src/Checkout';
import pricingRules from '../src/pricingRules';
import items from '../src/items';

describe('Checkout function', () => {
  let normalBuy;
  let normalVoucher;
  let shirtsDiscount;
  // Act before assertions
  beforeAll(async () => {
    normalBuy = new Checkout(pricingRules, items);
    normalBuy.scan('VOUCHER').scan('TSHIRT').scan('VOUCHER').scan('MUG');
    normalVoucher = new Checkout(pricingRules, items);
    normalVoucher.scan('VOUCHER').scan('TSHIRT').scan('MUG');
    shirtsDiscount = new Checkout(pricingRules, items);
    shirtsDiscount.scan('TSHIRT').scan('TSHIRT').scan('TSHIRT');
  });

  it('should get the quantities after the scan', () => {
    expect(normalBuy.itemsSaved.length).toBe(4);

    expect(normalVoucher.itemsSaved.length).toBe(3);

    expect(shirtsDiscount.itemsSaved.length).toBe(3);
  });

  it('should get the items joined by commas', () => {
    expect(normalBuy.getItems()).toBe('VOUCHER,TSHIRT,VOUCHER,MUG');
    expect(normalVoucher.getItems()).toBe('VOUCHER,TSHIRT,MUG');
    expect(shirtsDiscount.getItems()).toBe('TSHIRT,TSHIRT,TSHIRT');
  });

  it('should get mugs price', () => {
    expect(normalBuy.getMugsTotal()).toBe(7.50);
  });

  it('should not get discount for tshirts', () => {
    expect(normalBuy.getShirtsTotal()).toBe(20);
  });

  it('should get discount for the tshirts', () => {
    expect(shirtsDiscount.getShirtsTotal()).toBe(57);
  });

  it('should get vouchers and get 2 for 1', () => {
    expect(normalBuy.getVouchersTotal()).toBe(5);
  });

  it('should get vouchers and only one', () => {
    expect(normalVoucher.getVouchersTotal()).toBe(5);
  });

  it('should get the total', () => {
    expect(normalBuy.getTotal()).toBe(32.50);
    expect(normalVoucher.getTotal()).toBe(32.50);
    expect(shirtsDiscount.getTotal()).toBe(57);
  });
});
