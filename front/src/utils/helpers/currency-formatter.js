/**
 * Converts currency to string
 *
 * @type {Intl.NumberFormat}
 */
export const currencyFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  maximumFractionDigits: 0,
  currency: 'RUB',
});
