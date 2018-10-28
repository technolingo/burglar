import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://hungryburglar.firebaseio.com/'
});

export default instance;
