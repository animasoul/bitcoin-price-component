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
const axios_1 = __importDefault(require("axios"));
const API_ENDPOINT = "https://api.coindesk.com/v1/bpi/currentprice.json";
function formatCurrency(value) {
    if (value === undefined) {
        return "N/A";
    }
    return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}
const BitcoinPrice = (props) => {
    const { label = "Bitcoin Price Data:", labelLevel = "h3", btnText = "Refresh", incLabel = true, txtHtml = "p", incBtn = true, incUSD = true, incGBP = true, incEUR = true, incDisclaimer = true, incUpdateTime = true, } = props;
    const [data, setData] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const [isButtonDisabled, setButtonDisabled] = (0, react_1.useState)(false);
    const [currencyStatus, setCurrencyStatus] = (0, react_1.useState)({ USD: "", GBP: "", EUR: "" });
    const prevRatesRef = (0, react_1.useRef)({});
    const DynamicTag = labelLevel;
    const DynamicHtml = txtHtml;
    const fetchPrice = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        setError(null);
        setButtonDisabled(true);
        setTimeout(() => setButtonDisabled(false), 3000);
        try {
            const response = yield axios_1.default.get(API_ENDPOINT);
            const newData = response.data;
            const newStatus = {};
            ["USD", "GBP", "EUR"].forEach((currency) => {
                if (prevRatesRef.current[currency] !== newData.bpi[currency].rate_float) {
                    newStatus[currency] = "changed";
                }
                else {
                    newStatus[currency] = "unchanged";
                }
                setTimeout(() => {
                    setCurrencyStatus((prev) => (Object.assign(Object.assign({}, prev), { [currency]: "" })));
                }, 2000);
            });
            setCurrencyStatus(newStatus);
            prevRatesRef.current = {
                USD: newData.bpi.USD.rate_float,
                GBP: newData.bpi.GBP.rate_float,
                EUR: newData.bpi.EUR.rate_float,
            };
            setData(newData);
        }
        catch (err) {
            console.error("Error fetching Bitcoin price:", err);
            setError("Failed to fetch Bitcoin price data.");
        }
        finally {
            setLoading(false);
        }
    });
    (0, react_1.useEffect)(() => {
        fetchPrice();
    }, []);
    return (react_1.default.createElement("div", { className: "bitcoin-price-component" },
        incLabel && react_1.default.createElement(DynamicTag, { className: "bpc-label" }, label),
        loading && "Fetching Bitcoin price...",
        error && react_1.default.createElement(DynamicHtml, { className: "bpc-error" }, error),
        !loading && !error && (react_1.default.createElement(react_1.default.Fragment, null,
            incUpdateTime && (data === null || data === void 0 ? void 0 : data.time.updated) && (react_1.default.createElement(DynamicHtml, { className: "bpc-updated" },
                react_1.default.createElement("strong", null, "Updated:"),
                " ",
                data.time.updated)),
            (data === null || data === void 0 ? void 0 : data.bpi) &&
                Object.keys(data.bpi).map((currencyCode) => {
                    if ((currencyCode === "USD" && !incUSD) ||
                        (currencyCode === "GBP" && !incGBP) ||
                        (currencyCode === "EUR" && !incEUR))
                        return null;
                    return (react_1.default.createElement(DynamicHtml, { key: currencyCode, className: `bpc-${currencyCode} ${currencyStatus[currencyCode]}` },
                        react_1.default.createElement("strong", null,
                            currencyCode,
                            ": "),
                        react_1.default.createElement("span", { dangerouslySetInnerHTML: {
                                __html: data.bpi[currencyCode].symbol,
                            } }),
                        formatCurrency(data.bpi[currencyCode].rate_float)));
                }),
            incDisclaimer && (data === null || data === void 0 ? void 0 : data.disclaimer) && (react_1.default.createElement(DynamicHtml, { className: "bpc-disclaimer" },
                react_1.default.createElement("strong", null, "Disclaimer:"),
                " ",
                data.disclaimer)))),
        incBtn && (react_1.default.createElement("button", { className: "bpc-refresh", onClick: fetchPrice, disabled: isButtonDisabled }, btnText))));
};
exports.default = BitcoinPrice;
