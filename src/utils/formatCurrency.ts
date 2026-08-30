/**
 * Currency Formatter for War Computers
 * Default currency: Rs.
 */

export const CURRENCY_SYMBOL = 'Rs.';

export function formatPrice(amount: number | string | undefined | null): string {
  if (amount === undefined || amount === null || isNaN(Number(amount))) {
    return `${CURRENCY_SYMBOL} 0`;
  }
  const numeric = typeof amount === 'string' ? parseFloat(amount) : amount;
  return `${CURRENCY_SYMBOL} ${numeric.toLocaleString('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  })}`;
}

export function formatPriceNumberOnly(amount: number | string | undefined | null): string {
  if (amount === undefined || amount === null || isNaN(Number(amount))) {
    return '0';
  }
  const numeric = typeof amount === 'string' ? parseFloat(amount) : amount;
  return numeric.toLocaleString('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  });
}
