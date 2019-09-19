const production = true;
export const API_HOSTNAME = production ? 'https://shrtnerapp.herokuapp.com/' : 'http://localhost:3001/';
export const getApiUrl = (url) => (`${API_HOSTNAME}${url}`);