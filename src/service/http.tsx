import Axios from 'axios';
import config from '../config.json';

Axios.defaults.baseURL = config.baseUrl;
export default Axios;
