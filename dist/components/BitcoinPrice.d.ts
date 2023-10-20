import React from "react";
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
declare const BitcoinPrice: React.FC<BitcoinPriceProps>;
export default BitcoinPrice;
