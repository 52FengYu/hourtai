import axios from "axios"
import request from '../utils/request'; 
/* 获取用户可添加的页面类型 */
export function getAddItemType(params) {
    return request({
      url: '/api/Page/PageTypeListGetByUser',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
        TokenID : 'jd'
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
        'Content-Type':' application/x-www-form-urlencoded ',
        TokenID : 'jd'
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
        TokenID : 'jd'
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
        'Content-Type':' application/x-www-form-urlencoded ',
        TokenID : 'jd'
      },
      data: obj
    })
  }


    /* 根据页面ID获取页面内容信息 */
    export function getItemInfo(obj) {
      return axios({
        url: '/api/Page/PageContentListGetFromPageID',
        method: 'POST',
        headers:{
          'Content-Type':' application/x-www-form-urlencoded ',
          TokenID : 'jd'
        },
        data: obj
      })
    }


    /* 增加页面内容 */
    export function addItemInfo(obj) {
      return axios({
        url: '/api/Page/PageContentAdd',
        method: 'POST',
        headers:{
          'Content-Type':' application/x-www-form-urlencoded ',
          TokenID : 'jd'
        },
        data: obj
      })
    }

    /* 修改页面内容 */
    export function changeItemContent(obj) {
      return axios({
        url: '/api/Page/PageContentUpdated',
        method: 'POST',
        headers:{
          'Content-Type':' application/x-www-form-urlencoded ',
          TokenID : 'jd'
        },
        data: obj
      })
    }


   /* 页面内容上下移动 */
   export function move(obj) {
    return axios({
      url: '/api/Page/PageContentOrderIDMove',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
        TokenID : 'jd'
      },
      data: obj
    })
  }


   /* 删除页面信息 */
   export function deleteItemInfo(obj) {
    return axios({
      url: '/api/Page/PageContentDelete',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
        TokenID : 'jd'
      },
      data: obj
    })
  }


   /* 根据页面内容编号获取页面内容明细类别 */
   export function getItemContentInfo(obj) {
    return axios({
      url: '/api/Page/PageContentDetailListGetFromPageContentID',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
        TokenID : 'jd'
      },
      data: obj
    })
  }


  /* 页面内容明细增加 */
  export function addItemContentInfo(obj) {
   return axios({
     url: '/api/Page/PageContentDetailAdd',
     method: 'POST',
     headers:{
       'Content-Type':' application/x-www-form-urlencoded ',
       TokenID : 'jd'
     },
     data: obj
   })
 }
  

  /* 修改页面内容明细信息 */
  export function changeItemContentInfo(obj) {
   return axios({
     url: '/api/Page/PageContentDetailUpdate',
     method: 'POST',
     headers:{
       'Content-Type':' application/x-www-form-urlencoded ',
       TokenID : 'jd'
     },
     data: obj
   })
 }
  
 
  /* 页面内容明细移动 */
  export function moveItemContentInfo(obj) {
    return axios({
      url: '/api/Page/PageContentDetailOrderIDMove',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
        TokenID : 'jd'
      },
      data: obj
    })
  }
    
 
  /* 删除页面内容明细 */
  export function deleteItemContentInfo(obj) {
    return axios({
      url: '/api/Page/PageContentDetailDelete',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
        TokenID : 'jd'
      },
      data: obj
    })
  }
     
 
  /* 生成页面JS */
  export function getPageJS(obj) {
    return axios({
      url: '/api/Page/PageJsCreate',
      method: 'POST',
      headers:{
        TokenID : 'jd',
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: obj
    })
  }