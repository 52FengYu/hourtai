import axios from "axios"
import request from '../utils/request'; 
/* 获取用户可添加的页面类型 */
export function getAddItemType(params) {
    return request({
      url: '/api/Page/PageTypeListGetByUser',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
        TokenID : sessionStorage.TokenID
      },
      data: params
    })
  }

  /* 根据页面类型获取页面内容类型 */
export function getItemType(params) {
    return request({
      url: '/api/Page/PageContentTypeListGetByPageTypeID',
      method: 'post',
      data: params
    })
  }

   /* 增加页面 */
export function addPage(params) {
    return request({
      url: '/api/Page/PageAdd',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: params
    })
  }

   /* 修改页面信息 */
export function changeItemInfo(params) {
    return request({
      url: '/api/Page/PageUpdate',
      method: 'post',
      asyn:true,
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
        TokenID : sessionStorage.TokenID
      },
      data: params
    })
  }

   /* 页面列表获取 */
   export function getPageList(obj) {
    return axios({
      url: '/api/Page/PageListGet',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }

   /* 页面上下移动 */
   export function move(obj) {
    return axios({
      url: '/api/Page/PageContentOrderIDMove',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }