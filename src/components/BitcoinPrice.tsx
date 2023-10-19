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
  btnText?: string;
  incLabel?: boolean;
  incUSD?: boolean;
  incGBP?: boolean;
  incEUR?: boolean;
  incDisclaimer?: boolean;
  incUpdateTime?: boolean;
}

// Format currency values
function formatCurrency(value: number | undefined): string {
  if (value === undefined) {
    return "N/A";
  }
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

const BitcoinPrice: React.FC<BitcoinPriceProps> = ({
  label = "Bitcoin Price Data:",
  btnText = "Refresh",
  incLabel = true,
  incUSD = true,
  incGBP = true,
  incEUR = true,
  incDisclaimer = true,
  incUpdateTime = true,
}) => {
  const [data, setData] = useState<BitcoinData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Bitcoin price data
  const fetchPrice = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_ENDPOINT);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching Bitcoin price:", error);
      setError("Failed to fetch Bitcoin price data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice();
  }, []);

  return (
    <div className="bitcoin-price-component">
      {incLabel && <h3 className="bpc-label">{label}</h3>}
      {loading && "Fetching Bitcoin price..."}

      {error && <p className="bpc-error">{error}</p>}

      {!loading && !error && (
        <>
          {incUpdateTime && data?.time.updated && (
            <p className="bpc-updated">
              <strong>Updated:</strong> {data.time.updated}
            </p>
          )}

          {data?.bpi &&
            Object.keys(data.bpi).map((currencyCode) => {
              if (
                (currencyCode === "USD" && !incUSD) ||
                (currencyCode === "GBP" && !incGBP) ||
                (currencyCode === "EUR" && !incEUR)
              ) {
                return null; // Do not render this currency
              }
              return (
                <p key={currencyCode} className={`bpc-${currencyCode}`}>
                  <strong>{currencyCode}:</strong>{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: data.bpi[currencyCode].symbol,
                    }}
                  />
                  {formatCurrency(data.bpi[currencyCode].rate_float)}
                </p>
              );
            })}

          {incDisclaimer && data?.disclaimer && (
            <p className="bpc-disclaimer">
              <strong>Disclaimer:</strong> {data.disclaimer}
            </p>
          )}
        </>
      )}
      <button className="bpc-refresh" onClick={fetchPrice}>
        {btnText}
      </button>
    </div>
  );
};

export default BitcoinPrice;
