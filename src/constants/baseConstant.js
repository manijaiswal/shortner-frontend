const production = false;
export const API_HOSTNAME = production ? '' : 'http://localhost:3000/';
export const getApiUrl = (url) => (`${API_HOSTNAME}${url}`);