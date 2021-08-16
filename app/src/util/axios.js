import axios from 'axios';

const API_URL = process.env.VUE_API_URL || '';
//const TOKEN = process.env.VUE_APP_TOKEN || '';

//const axiosConfig = {
//  token: TOKEN
//}

// function makeAuth(username, password) {
//   const auth = {
//     'username': username,
//     'password': password
//   }
//   axios.post(`${API_URL}/api/auth/token/`, auth)
//   .then(response => {
//     axiosConfig.TOKEN = response.data.token;
//   })
// }
//
// if (!TOKEN) makeAuth(
//     process.env.VUE_API_USERNAME,
//     process.env.VUE_API_PASSWORD
// );

const instance = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 1000,
  //headers: {'Authorization': `Bearer: ${axiosConfig.token}`}
});

export default instance
