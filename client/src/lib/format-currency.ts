export const formatCurrency = (value: number,
  options: { 
    currency?: string; 
    decimalPlaces?: number;
    compact?: boolean;
    showSign?: boolean;
    isExpense?: boolean;
  } = {}
):string => {
  const { currency = 'VND', decimalPlaces = 0, compact = false, showSign = false, isExpense = false } = options;

  const displayValue = isExpense ? -Math.abs(value) : value;
  
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency,
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
    notation: compact ? 'compact' : 'standard',
    //signDisplay: showSign  ? 'always' : isExpense ? 'always' : 'auto',
    signDisplay: showSign ? 'always' : 'auto',
  }).format(displayValue);
};
