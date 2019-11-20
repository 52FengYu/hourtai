import axios from 'axios';

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    timeout: 5000
});

axios.interceptors.request.use(

    config => {
  
      // if (TokenID) { // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
  
        // config.headers.TokenID = sessionStorage.TokenID;
        config.headers.TokenID = 'jd'

      // }
  
      return config;
  
    },
  
    err => {
  
      return Promise.reject(err);
  
    });
  
  // http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
  
  axios.interceptors.response.use(
  
    response => {
  
      return response;
  
    },
  
    error => {
  
      if (error.response) {
  
        switch (error.response.status) {
  
          case -999:
  
            // 这里写清除token的代码
            sessionStorage.removeItem(TokenId)
  
            router.replace({
  
              path: 'login',
  
              query: {redirect: router.currentRoute.fullPath}  //登录成功后跳入浏览的当前页面
  
            })
  
        }
  
      }
  
      return Promise.reject(error)
  
    });

export default service;
