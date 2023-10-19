"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_ENDPOINT = "https://api.coindesk.com/v1/bpi/currentprice.json";

interface BitcoinData {
  time: {
    updated: string;
  };
  disclaimer: string;
  bpi: {
    [key: string]: {
      code: string;
      symbol: string;
      rate_float: number;
    };
  };
}

interface BitcoinPriceProps {
  label?: string;
}

function formatCurrency(value: number | undefined): string {
  if (value === undefined) {
    return "0.00";
  }
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// ... (the rest of the imports and interfaces remain the same)

const BitcoinPrice: React.FC<BitcoinPriceProps> = ({
  label = "Bitcoin Price Data:",
}) => {
  const [data, setData] = useState<BitcoinData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPrice = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_ENDPOINT, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching Bitcoin price:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice();
  }, []);

  return (
    <div className="bitcoin-price-component">
      <h3 className="bpc-label">{label}</h3>
      {loading ? (
        "Fetching Bitcoin price..."
      ) : (
        <>
          <p className="bpc-updated">
            <strong>Updated:</strong> {data?.time.updated}
          </p>

          {data?.bpi &&
            Object.keys(data.bpi).map((currencyCode) => (
              <p key={currencyCode} className={`bpc-${currencyCode}`}>
                <strong>{currencyCode}:</strong>{" "}
                <span
                  dangerouslySetInnerHTML={{
                    __html: data.bpi[currencyCode].symbol,
                  }}
                />
                {formatCurrency(data.bpi[currencyCode].rate_float)}
              </p>
            ))}

          <p className="bpc-disclaimer">
            <strong>Disclaimer:</strong> {data?.disclaimer}
          </p>
        </>
      )}
      <button className="bpc-refresh" onClick={fetchPrice}>
        Refresh
      </button>
    </div>
  );
};

export default BitcoinPrice;
