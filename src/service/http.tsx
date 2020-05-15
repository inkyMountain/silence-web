import Axios from 'axios';
import config from '../config.json';

Axios.defaults.baseURL = config.baseUrl;
Axios.defaults.withCredentials = true;
export default Axios;
