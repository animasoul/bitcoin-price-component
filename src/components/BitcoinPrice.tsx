"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../BitcoinCommon.css";

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

function formatCurrency(value: number | undefined): string {
  if (value === undefined) {
    return "N/A";
  }
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

const BitcoinPrice: React.FC<BitcoinPriceProps> = (props) => {
  const {
    label = "Bitcoin Price Data:",
    btnText = "Refresh",
    incLabel = true,
    incUSD = true,
    incGBP = true,
    incEUR = true,
    incDisclaimer = true,
    incUpdateTime = true,
  } = props;

  const [data, setData] = useState<BitcoinData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [currencyStatus, setCurrencyStatus] = useState<{
    [key: string]: "changed" | "green" | "";
  }>({ USD: "", GBP: "", EUR: "" });

  const prevRatesRef = useRef<{ [key: string]: number }>({});

  const fetchPrice = async () => {
    setLoading(true);
    setError(null);
    setButtonDisabled(true);
    setTimeout(() => setButtonDisabled(false), 3000);
    try {
      const response = await axios.get(API_ENDPOINT);
      const newData = response.data;
      const newStatus: { [key: string]: "changed" | "green" | "" } = {};

      ["USD", "GBP", "EUR"].forEach((currency) => {
        if (
          prevRatesRef.current[currency] !== newData.bpi[currency].rate_float
        ) {
          newStatus[currency] = "changed";
        } else {
          newStatus[currency] = "green";
        }
        setTimeout(() => {
          setCurrencyStatus((prev) => ({ ...prev, [currency]: "" }));
        }, 2000);
      });

      setCurrencyStatus(newStatus);
      prevRatesRef.current = {
        USD: newData.bpi.USD.rate_float,
        GBP: newData.bpi.GBP.rate_float,
        EUR: newData.bpi.EUR.rate_float,
      };
      setData(newData);
    } catch (err) {
      console.error("Error fetching Bitcoin price:", err);
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
              )
                return null;

              return (
                <p
                  key={currencyCode}
                  className={`bpc-${currencyCode} ${currencyStatus[currencyCode]}`}
                >
                  <strong>{currencyCode}:</strong>
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
      <button
        className="bpc-refresh"
        onClick={fetchPrice}
        disabled={isButtonDisabled}
      >
        {btnText}
      </button>
    </div>
  );
};

export default BitcoinPrice;
