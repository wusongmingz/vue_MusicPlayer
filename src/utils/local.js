import axios from 'axios';

// 创建 Axios 实例
const instance = axios.create({
  baseURL: '', // 设置基础 URL
  timeout: 5000, // 设置请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 可以在这里添加请求头信息，比如添加 Authorization 令牌等
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error.response) {
      // 处理服务器返回的错误状态码
      switch (error.response.status) {
        case 401:
          // 未授权，进行相应处理
          break;
        case 404:
          // 资源未找到，进行相应处理
          break;
        // 其他错误状态码处理
      }
    }
    return Promise.reject(error);
  }
);

export default instance;