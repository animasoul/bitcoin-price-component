'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_ENDPOINT = 'https://api.coindesk.com/v1/bpi/currentprice.json';

const BitcoinPrice: React.FC = () => {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(API_ENDPOINT, {
            headers: {
              'Content-Type': 'application/json',
              // other headers if needed
            }
          });
        setPrice(response.data.bpi.USD.rate_float);
      } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
      }
    };

    fetchPrice();
  }, []);

  return (
    <div>
      {price ? `Current Bitcoin Price: $${price}` : 'Fetching Bitcoin price...'}
    </div>
  );
};

export default BitcoinPrice;
