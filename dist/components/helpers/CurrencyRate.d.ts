import React from 'react';
interface CurrencyRateProps {
    currencyCode: string;
    symbol: string;
    rate: string;
    status: 'increased' | 'decreased' | 'unchanged' | '';
    tag: 'p' | 'span' | 'div';
}
declare const _default: React.NamedExoticComponent<CurrencyRateProps>;
export default _default;
