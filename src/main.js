import chalk from 'chalk';
import Checkout from './Checkout';
import pricingRules from './pricingRules';
import items from './items';

const cabifyMainColor = chalk.rgb(111, 54, 255);
const red = chalk.rgb(236, 34, 27);

function output(total) {
  const totalFormatted = total.toFixed(2);
  return `${red('TOTAL:')} ${totalFormatted} ${pricingRules.GENERAL.currency}`;
}

const log = console.log;

log(cabifyMainColor('WELCOME TO CABIFY\'S SHOP'));
log('');
log(cabifyMainColor('This are the results for the test'));
log(cabifyMainColor('----------------------------------'));

const co1 = new Checkout(pricingRules, items);

co1.scan('VOUCHER').scan('TSHIRT').scan('MUG');

const items1 = co1.getItems();
const total1 = output(co1.getTotal());
log(`${cabifyMainColor('ITEMS:')} ${items1}`);
log(total1);

const co2 = new Checkout(pricingRules, items);
co2.scan('VOUCHER').scan('TSHIRT').scan('VOUCHER');

const items2 = co2.getItems();
const total2 = output(co2.getTotal());
log(`${cabifyMainColor('ITEMS:')} ${items2}`);
log(total2);

const co3 = new Checkout(pricingRules, items);

co3.scan('TSHIRT')
   .scan('TSHIRT')
   .scan('TSHIRT')
   .scan('VOUCHER')
   .scan('TSHIRT');

const items3 = co3.getItems();
const total3 = output(co3.getTotal());
log(`${cabifyMainColor('ITEMS:')} ${items3}`);
log(total3);

const co4 = new Checkout(pricingRules, items);

co4.scan('VOUCHER')
   .scan('TSHIRT')
   .scan('VOUCHER')
   .scan('VOUCHER')
   .scan('MUG')
   .scan('TSHIRT')
   .scan('TSHIRT');


const items4 = co4.getItems();
const total4 = output(co4.getTotal());
log(`${cabifyMainColor('ITEMS:')} ${items4}`);
log(total4);

