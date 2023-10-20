// bitcoinService.ts
import axios from 'axios';

const API_ENDPOINT = 'https://api.coindesk.com/v1/bpi/currentprice.json';

export const fetchBitcoinPrice = async () => {
  const response = await axios.get(API_ENDPOINT, {
    timeout: 5000, // 5 seconds timeout
  });
  return response.data;
};
