const production = false;
export const API_HOSTNAME = production ? '' : 'http://localhost:3001/';
export const getApiUrl = (url) => (`${API_HOSTNAME}${url}`);