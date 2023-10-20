"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const bitcoinService_1 = require("./helpers/bitcoinService");
const UpdateTime_1 = __importDefault(require("./helpers/UpdateTime"));
const CurrencyRate_1 = __importDefault(require("./helpers/CurrencyRate"));
function formatCurrency(value) {
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
function BitcoinPrice(props) {
    // Destructuring props with defaults
    const { label = "Bitcoin Price Data:", labelLevel = "h3", btnText = "Refresh", incLabel = true, txtHtml = "p", incBtn = true, incUSD = true, incGBP = true, incEUR = true, incDisclaimer = true, incUpdateTime = true, } = props;
    // State and Refs
    const [updatedTime, setUpdatedTime] = (0, react_1.useState)(null);
    const [rates, setRates] = (0, react_1.useState)(null);
    const [data, setData] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const [isButtonDisabled, setButtonDisabled] = (0, react_1.useState)(false);
    const [currencyStatus, setCurrencyStatus] = (0, react_1.useState)({});
    const prevRatesRef = (0, react_1.useRef)({});
    const lastClickedRef = (0, react_1.useRef)(null);
    // Dynamic JSX tags based on props
    const DynamicTag = labelLevel;
    const DynamicHtml = txtHtml;
    // Methods
    const determineCurrencyStatus = (0, react_1.useCallback)((newData) => {
        const newStatus = {};
        CURRENCIES.forEach((currency) => {
            if (prevRatesRef.current[currency] === undefined) {
                newStatus[currency] = "";
            }
            else if (prevRatesRef.current[currency] < newData.bpi[currency].rate_float) {
                newStatus[currency] = "increased";
            }
            else if (prevRatesRef.current[currency] > newData.bpi[currency].rate_float) {
                newStatus[currency] = "decreased";
            }
            else {
                newStatus[currency] = "unchanged";
            }
            setTimeout(() => {
                setCurrencyStatus((prev) => (Object.assign(Object.assign({}, prev), { [currency]: "" })));
            }, 2000);
        });
        return newStatus;
    }, [setCurrencyStatus]);
    const fetchPrice = (0, react_1.useCallback)(() => __awaiter(this, void 0, void 0, function* () {
        // Handle debounce
        const now = Date.now();
        if (lastClickedRef.current &&
            now - lastClickedRef.current < DEBOUNCE_TIME) {
            return;
        }
        lastClickedRef.current = now;
        // Fetch logic
        setLoading(true);
        setError(null);
        setButtonDisabled(true);
        setTimeout(() => setButtonDisabled(false), 3000);
        const { data: newData, error: fetchError } = yield (0, bitcoinService_1.fetchBitcoinPrice)();
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
        }
        else if (fetchError) {
            setError(fetchError);
        }
        setLoading(false);
    }), [determineCurrencyStatus]);
    (0, react_1.useEffect)(() => {
        fetchPrice();
    }, [fetchPrice]);
    // Rendering
    return (react_1.default.createElement("div", { className: "bitcoin-price-component" },
        incLabel && react_1.default.createElement(DynamicTag, { className: "bpc-label" }, label),
        loading && "Fetching Bitcoin price...",
        error && react_1.default.createElement(DynamicHtml, { className: "bpc-error" }, error),
        !loading && !error && (react_1.default.createElement(react_1.default.Fragment, null,
            incUpdateTime && updatedTime && (react_1.default.createElement(UpdateTime_1.default, { time: updatedTime, tag: txtHtml })),
            rates &&
                CURRENCIES.filter((currency) => {
                    return ((currency === "USD" && incUSD) ||
                        (currency === "GBP" && incGBP) ||
                        (currency === "EUR" && incEUR));
                }).map((currencyCode) => (react_1.default.createElement(CurrencyRate_1.default, { key: currencyCode, currencyCode: currencyCode, symbol: rates[currencyCode].symbol, rate: formatCurrency(rates[currencyCode].rate_float), status: currencyStatus[currencyCode], tag: txtHtml }))),
            incDisclaimer && (data === null || data === void 0 ? void 0 : data.disclaimer) && (react_1.default.createElement(DynamicHtml, { className: "bpc-disclaimer" },
                react_1.default.createElement("strong", null, "Disclaimer:"),
                " ",
                data.disclaimer)))),
        incBtn && (react_1.default.createElement("button", { className: "bpc-refresh", onClick: fetchPrice, disabled: isButtonDisabled }, btnText))));
}
exports.default = react_1.default.memo(BitcoinPrice);
