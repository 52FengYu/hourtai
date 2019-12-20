import axios from 'axios';

axios.interceptors.request.use(function (config) {
  　　// 在发送请求之前做些什么
  if (window.sessionStorage.getItem('TokenID')) {
      config.headers.TokenID = window.sessionStorage.getItem('TokenID');
      // console.log(window.sessionStorage.getItem('TokenID'));
  }
  　　return config
  }, function (error) {
  　　// 对请求错误做些什么
  return Promise.reject(error)
  });
   
  // 添加响应拦截器
  axios.interceptors.response.use(function (res) {
  　　// 对响应数据做点什么
  const code = res.data.Success;
 /*  if(code == -999) { //未登录
    window.alert('请先登录', '提示', {
        confirmButtonText: '确定',
        callback: action => {
            router.replace({
                name: 'login',
                path:'/login',
            })
        } 
    });
} */
    if (code == -999) {  // 这里根据自己接口返回状态进行判断是否需要登录
      window.sessionStorage.removeItem('TokenID')
      window.localStorage.removeItem('role')
      location.reload()
    }
  　　return res
  }, function (error) {
  　　// 对响应错误做点什么
  　　return Promise.reject(error)
  });
  /* axios.interceptors.response.use(
    res => {
      //对响应数据做些事
      if (res.data.Success == -999) {  // 这里根据自己接口返回状态进行判断是否需要登录
        window.sessionStorage.removeItem('TokenID')
        location.reload()
      }
      return res.data;
    },
    error => {
      let errorInfo = error.data.error ? error.data.error.message : error.data;
      return Promise.reject(error);
    }
  ) */
  
