"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// CurrencyRate.tsx
const react_1 = __importDefault(require("react"));
const CurrencyRate = ({ currencyCode, symbol, rate, status, tag, }) => {
    const DynamicTag = tag;
    return (react_1.default.createElement(DynamicTag, { className: `bpc-${currencyCode} ${status}` },
        react_1.default.createElement("strong", null,
            currencyCode,
            ": "),
        react_1.default.createElement("span", { className: "rate-placeholder", dangerouslySetInnerHTML: { __html: symbol } }),
        rate));
};
exports.default = react_1.default.memo(CurrencyRate);
