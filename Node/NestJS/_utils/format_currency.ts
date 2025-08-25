const USDFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const formatToUSD = (value: number): string => {
  return USDFormatter.format(value);
};
