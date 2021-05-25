import axios from 'axios';

const ROOT_URL = process.env.VUE_APP_ROOT_URL;
const TOKEN = process.env.VUE_APP_TOKEN || '';

const axiosConfig = {
  token: TOKEN
}

function makeAuth() {
  const auth = {
    'username': process.env.VUE_APP_API_USERNAME,
    'password': process.env.VUE_APP_API_PASSWORD
  }
  axios.post(`${ROOT_URL}auth/token/`, auth)
  .then(response => {
    axiosConfig.TOKEN = response.data.token;
  })
}

if (!TOKEN) makeAuth();

const instance = axios.create({
  baseURL: `${ROOT_URL}/api`,
  timeout: 1000,
  headers: {'Authorization': `Bearer: ${axiosConfig.token}`}
});

export default instance
