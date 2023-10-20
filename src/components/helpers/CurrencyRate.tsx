// CurrencyRate.tsx
import React from 'react';

interface CurrencyRateProps {
  currencyCode: string;
  symbol: string;
  rate: string;
  status: 'increased' | 'decreased' | 'unchanged' | '';
  tag: 'p' | 'span' | 'div';
}

const CurrencyRate: React.FC<CurrencyRateProps> = ({
  currencyCode,
  symbol,
  rate,
  status,
  tag,
}) => {
  const DynamicTag = tag as keyof JSX.IntrinsicElements;
  return (
    <DynamicTag className={`bpc-${currencyCode} ${status}`}>
      <strong>{currencyCode}: </strong>
      <span
        className="rate-placeholder"
        dangerouslySetInnerHTML={{ __html: symbol }}
      />
      {rate}
    </DynamicTag>
  );
};

export default React.memo(CurrencyRate);
