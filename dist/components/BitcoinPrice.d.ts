import React from "react";
interface BitcoinPriceProps {
    containerTag?: "div" | "span";
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
declare function BitcoinPrice(props: BitcoinPriceProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof BitcoinPrice>;
export default _default;
