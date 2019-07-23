// Parse the url, check for port 4200
const _isDev = window.location.port.indexOf('4200') > -1;

const getHost = () => {
  const protocol = window.location.protocol;
  const host = window.location.host;
  return `${protocol}//${host}`;
};
// Dev if on localhost
const apiURI = _isDev ? 'http://localhost:8083/api/' : `/api/`;

export const ENV = {
  BASE_URI: getHost(),
  BASE_API: apiURI
};