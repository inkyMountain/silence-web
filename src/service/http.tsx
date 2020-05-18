import Axios from 'axios';
import config from '../config.json';
import userStore from '@/store/user.store';

Axios.defaults.baseURL = config.baseUrl;
Axios.defaults.withCredentials = true;

// 为每个请求加上userId，从而避免缓存会造成不同用户请求到相同结果的bug。
Axios.interceptors.request.use(config => {
  const userId = userStore.account.id;
  if (config.method?.toLowerCase() === 'get') {
    config.params = config.params || {};
    config.params.userId = userId;
  }
  if (config.method?.toLowerCase() === 'post') {
    config.data = {
      ...config.data,
      userId
    };
  }
  return config;
});

Axios.interceptors.response.use((res) => {
  return res;
});

export default Axios;
