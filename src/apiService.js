// apiService.js

import axios from 'axios'
import store from './store'

const apiClient = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  // timeout: 5000,
})

// Adding request interceptor to include the access token in headers
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = store.state.accessToken;
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Adding response interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('Error response:', error.response || error.message)
    return Promise.reject(error)
  }
)

export default {

  // apis
  getCountries() {
    return apiClient.get('/all?fields=name,population,region,capital,flags');
  },


  getCountryByName(name){
    return apiClient.get(`/name/${name }`);
  },

  getCountryByCode(code){
    return apiClient.get(`/alpha/${code}`);
  }
};
