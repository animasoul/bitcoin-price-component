import React from "react";
interface BitcoinPriceProps {
    label?: string;
    btnText?: string;
    incLabel?: boolean;
    incBtn?: boolean;
    incUSD?: boolean;
    incGBP?: boolean;
    incEUR?: boolean;
    incDisclaimer?: boolean;
    incUpdateTime?: boolean;
}
declare const BitcoinPrice: React.FC<BitcoinPriceProps>;
export default BitcoinPrice;
