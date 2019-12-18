import axios from "axios"

/* 获取用户可添加的页面类型 */
export function getTokenID(params) {
    return axios({
      url: '/webapi/user/SessionTokenIDGet',
      method: 'post',
      headers:{
      },
      data: params
    })
  }

  /* 用户登录 */
  export function UserLogin(params) {
    return axios({
      url: '/webapi/user/UserLogin',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }

  /* 获取图形验证码 */
  export function GetValidateCode(obj) {
    return axios({
      url: '/webapi/User/GetValidateCode',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: obj,
      responseType: 'arraybuffer'
    })
  }