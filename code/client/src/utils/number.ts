export function shortenNumber(n: number): string {
  if (n === 0) return '0';
  if (n < 0) return '-' + shortenNumber(-n);

  const suffixes = ['', 'k', 'm', 'b', 't'];
  const suffixNum = Math.floor(Math.log10(n) / 3);
  const shortValue = suffixNum ? +(n / Math.pow(1000, suffixNum)).toFixed(2) : n;

  return suffixes[suffixNum]
    ? (shortValue % 1 ? shortValue.toFixed(1) : shortValue) + suffixes[suffixNum]
    : n
        .toPrecision(3)
        .replace(/(?:(\.0+[^0]+)|(\.[^0\d]*))0+$/g, '$1')
        .replace(/\.$/g, '');
}
