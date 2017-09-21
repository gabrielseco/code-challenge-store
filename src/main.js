import Checkout from './Checkout';
import pricingRules from './pricingRules';

function output(total) {
  const totalFormatted = total.toFixed(2);
  return `Total: ${totalFormatted} ${pricingRules.GENERAL.currency}`;
}

const co1 = new Checkout(pricingRules);

co1.scan('VOUCHER').scan('TSHIRT').scan('MUG');

const items1 = co1.getItems();
const total1 = output(co1.getTotal());
console.log('ITEMS:', items1);
console.log(total1);

const co2 = new Checkout(pricingRules);
co2.scan('VOUCHER').scan('TSHIRT').scan('VOUCHER');

const items2 = co2.getItems();
const total2 = output(co2.getTotal());
console.log('Items:', items2);
console.log(total2);

const co3 = new Checkout(pricingRules);

co3.scan('TSHIRT')
   .scan('TSHIRT')
   .scan('TSHIRT')
   .scan('VOUCHER')
   .scan('TSHIRT');

const items3 = co3.getItems();
const total3 = output(co3.getTotal());
console.log('Items:', items3);
console.log(total3);

const co4 = new Checkout(pricingRules);

co4.scan('VOUCHER')
   .scan('TSHIRT')
   .scan('VOUCHER')
   .scan('VOUCHER')
   .scan('MUG')
   .scan('TSHIRT')
   .scan('TSHIRT');


const items4 = co4.getItems();
const total4 = output(co4.getTotal());
console.log('Items:', items4);
console.log(total4);

