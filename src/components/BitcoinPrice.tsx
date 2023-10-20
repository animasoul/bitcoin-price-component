"use client";
import React, { useEffect, useState, useRef } from "react";
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
  labelLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  btnText?: string;
  incLabel?: boolean;
  txtHtml?: "p" | "span" | "div";
  incBtn?: boolean;
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
    labelLevel = "h3",
    btnText = "Refresh",
    incLabel = true,
    txtHtml = "p",
    incBtn = true,
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
    [key: string]: "changed" | "unchanged" | "";
  }>({ USD: "", GBP: "", EUR: "" });

  const prevRatesRef = useRef<{ [key: string]: number }>({});

  const DynamicTag = labelLevel as keyof JSX.IntrinsicElements;
  const DynamicHtml = txtHtml as keyof JSX.IntrinsicElements;

  const fetchPrice = async () => {
    setLoading(true);
    setError(null);
    setButtonDisabled(true);
    setTimeout(() => setButtonDisabled(false), 3000);
    try {
      const response = await axios.get(API_ENDPOINT);
      const newData = response.data;
      const newStatus: { [key: string]: "changed" | "unchanged" | "" } = {};

      ["USD", "GBP", "EUR"].forEach((currency) => {
        if (
          prevRatesRef.current[currency] !== newData.bpi[currency].rate_float
        ) {
          newStatus[currency] = "changed";
        } else {
          newStatus[currency] = "unchanged";
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
      {incLabel && <DynamicTag className="bpc-label">{label}</DynamicTag>}
      {loading && "Fetching Bitcoin price..."}
      {error && <DynamicHtml className="bpc-error">{error}</DynamicHtml>}
      {!loading && !error && (
        <>
          {incUpdateTime && data?.time.updated && (
            <DynamicHtml className="bpc-updated">
              <strong>Updated:</strong> {data.time.updated}
            </DynamicHtml>
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
                <DynamicHtml
                  key={currencyCode}
                  className={`bpc-${currencyCode} ${currencyStatus[currencyCode]}`}
                >
                  <strong>{currencyCode}: </strong>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: data.bpi[currencyCode].symbol,
                    }}
                  />
                  {formatCurrency(data.bpi[currencyCode].rate_float)}
                </DynamicHtml>
              );
            })}
          {incDisclaimer && data?.disclaimer && (
            <DynamicHtml className="bpc-disclaimer">
              <strong>Disclaimer:</strong> {data.disclaimer}
            </DynamicHtml>
          )}
        </>
      )}
      {incBtn && (
        <button
          className="bpc-refresh"
          onClick={fetchPrice}
          disabled={isButtonDisabled}
        >
          {btnText}
        </button>
      )}
    </div>
  );
};

export default BitcoinPrice;
