import Checkout from './Checkout';
import pricingRules from './pricingRules';

const co1 = new Checkout(pricingRules);

co1.scan('VOUCHER').scan('TSHIRT').scan('MUG');

const items1 = co1.getItems();
const total1 = co1.getTotalOutput();
console.log('ITEMS:', items1);
console.log(total1);

const co2 = new Checkout(pricingRules);
co2.scan('VOUCHER').scan('TSHIRT').scan('VOUCHER');

const items2 = co2.getItems();
const total2 = co2.getTotalOutput();
console.log('Items:', items2);
console.log(total2);

const co3 = new Checkout(pricingRules);

co3.scan('TSHIRT')
   .scan('TSHIRT')
   .scan('TSHIRT')
   .scan('VOUCHER')
   .scan('TSHIRT');

const items3 = co3.getItems();
const total3 = co3.getTotalOutput();
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
const total4 = co4.getTotalOutput();
console.log('Items:', items4);
console.log(total4);

