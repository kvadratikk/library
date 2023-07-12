import axios from 'axios';

const interceptor = axios.create();

interceptor.interceptors.request.use((config) => {
  const jwt = localStorage.getItem('jwt');
  const copyConfig = { ...config };

  copyConfig.headers.Authorization = `Bearer ${jwt}`;

  return copyConfig;
});

export { interceptor };
