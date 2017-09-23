// @flow

type Rule = {
  type: ?string,
  offer: ?number,
  quantity: ?number,
  price: number
};

export type PricingRules = {
  TSHIRT: Rule,
  VOUCHER: Rule,
  MUG: Rule,
  GENERAL: {
    currency: string
  }
}

const pricingRules: PricingRules = {
  TSHIRT: {
    type: 'BULK',
    offer: 19,
    quantity: 3,
    price: 20,
  },
  VOUCHER: {
    type: 'ONEFREE',
    offer: undefined,
    quantity: 2,
    price: 5,
  },
  MUG: {
    type: undefined,
    offer: undefined,
    quantity: undefined,
    price: 7.50,
  },
  GENERAL: {
    currency: '€',
  },
};

export default pricingRules;

