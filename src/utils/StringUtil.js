export const camelCase = function(str) {
  const match = (w, i) => +w === 0 ? "" : w[i === 0 ? 'toLowerCase' : 'toUpperCase']();
  return str
    .replace(/[^a-z ]/ig, '')
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, match);
};