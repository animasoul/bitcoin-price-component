"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { fetchBitcoinPrice } from "./helpers/bitcoinService";
import UpdateTime from "./helpers/UpdateTime";
import CurrencyRate from "./helpers/CurrencyRate";

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

const DEBOUNCE_TIME = 1000; // 1 second delay for debounce
const CURRENCIES = ["USD", "GBP", "EUR"];
type CurrencyStatus = Record<
  string,
  "" | "increased" | "decreased" | "unchanged"
>;

function BitcoinPrice(props: BitcoinPriceProps): JSX.Element {
  // Destructuring props with defaults
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

  // State and Refs
  const [updatedTime, setUpdatedTime] = useState<string | null>(null);
  const [rates, setRates] = useState<BitcoinData["bpi"] | null>(null);
  const [data, setData] = useState<BitcoinData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [currencyStatus, setCurrencyStatus] = useState<CurrencyStatus>({});
  const prevRatesRef = useRef<Record<string, number>>({});
  const lastClickedRef = useRef<number | null>(null);

  // Dynamic JSX tags based on props
  const DynamicTag = labelLevel as keyof JSX.IntrinsicElements;
  const DynamicHtml = txtHtml as keyof JSX.IntrinsicElements;

  // Methods
  const determineCurrencyStatus = useCallback(
    (newData: BitcoinData): CurrencyStatus => {
      const newStatus: CurrencyStatus = {};

      CURRENCIES.forEach((currency) => {
        if (prevRatesRef.current[currency] === undefined) {
          newStatus[currency] = "";
        } else if (
          prevRatesRef.current[currency] < newData.bpi[currency].rate_float
        ) {
          newStatus[currency] = "increased";
        } else if (
          prevRatesRef.current[currency] > newData.bpi[currency].rate_float
        ) {
          newStatus[currency] = "decreased";
        } else {
          newStatus[currency] = "unchanged";
        }

        setTimeout(() => {
          setCurrencyStatus((prev) => ({ ...prev, [currency]: "" }));
        }, 2000);
      });

      return newStatus;
    },
    [setCurrencyStatus]
  );

  const fetchPrice = useCallback(async () => {
    // Handle debounce
    const now = Date.now();
    if (
      lastClickedRef.current &&
      now - lastClickedRef.current < DEBOUNCE_TIME
    ) {
      return;
    }
    lastClickedRef.current = now;

    // Fetch logic
    setLoading(true);
    setError(null);
    setButtonDisabled(true);
    setTimeout(() => setButtonDisabled(false), 3000);

    const { data: newData, error: fetchError } = await fetchBitcoinPrice();

    if (newData) {
      setData(newData);
      setUpdatedTime(newData.time.updated);
      setRates(newData.bpi);

      const newStatus = determineCurrencyStatus(newData);
      setCurrencyStatus(newStatus);

      // Update previous rates for future comparison
      prevRatesRef.current = {
        USD: newData.bpi.USD.rate_float,
        GBP: newData.bpi.GBP.rate_float,
        EUR: newData.bpi.EUR.rate_float,
      };
    } else if (fetchError) {
      setError(fetchError);
    }

    setLoading(false);
  }, [determineCurrencyStatus]);

  useEffect(() => {
    fetchPrice();
  }, [fetchPrice]);

  // Rendering
  return (
    <div className="bitcoin-price-component">
      {incLabel && <DynamicTag className="bpc-label">{label}</DynamicTag>}
      {loading && "Fetching Bitcoin price..."}
      {error && <DynamicHtml className="bpc-error">{error}</DynamicHtml>}
      {!loading && !error && (
        <>
          {incUpdateTime && updatedTime && (
            <UpdateTime time={updatedTime} tag={txtHtml} />
          )}
          {rates &&
            CURRENCIES.filter((currency) => {
              return (
                (currency === "USD" && incUSD) ||
                (currency === "GBP" && incGBP) ||
                (currency === "EUR" && incEUR)
              );
            }).map((currencyCode) => (
              <CurrencyRate
                key={currencyCode}
                currencyCode={currencyCode}
                symbol={rates[currencyCode].symbol}
                rate={formatCurrency(rates[currencyCode].rate_float)}
                status={currencyStatus[currencyCode]}
                tag={txtHtml}
              />
            ))}
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
}

export default React.memo(BitcoinPrice);
