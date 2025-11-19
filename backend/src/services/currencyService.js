import axios from 'axios';
import { Currency } from '../models/index.js';

export const convertPrice = async (amountUsd, targetCurrency = 'USD') => {
  if (targetCurrency === 'USD') return { amount: amountUsd, currency: 'USD' };
  let currency = await Currency.findByPk(targetCurrency);
  if (!currency) {
    const rate = await fetchRate(targetCurrency);
    currency = await Currency.create({ code: targetCurrency, rate, active: true });
  }
  const converted = Number(amountUsd) * Number(currency.rate);
  return { amount: converted.toFixed(2), currency: targetCurrency };
};

const fetchRate = async (code) => {
  try {
    const res = await axios.get(`https://open.er-api.com/v6/latest/USD`);
    return res.data?.rates?.[code] || 1;
  } catch (error) {
    return 1;
  }
};
