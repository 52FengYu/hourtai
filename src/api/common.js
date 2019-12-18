import axios from "axios"

/* 品牌列表获取 */
export function BaseBrandListGet(params) {
    return axios({
      url:'/api/Base/BaseBrandListGet',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
  
/* 添加品牌 */
export function BaseBrandAdd(params) {
    return axios({
      url:'/api/Base/BaseBrandAdd',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
   
/* 品牌修改 */
export function BaseBrandUpdate(params) {
    return axios({
      url:'/api/Base/BaseBrandUpdate',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
    
/* 一级分类获取 */
export function BaseClassFirstLevelGet(params) {
    return axios({
      url:'/api/Base/BaseClassFirstLevelGet',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
    
/* 根据父ID获取分类列表 */
export function BaseClassListGetFromFID(params) {
    return axios({
      url:'/api/Base/BaseClassListGetFromFID',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
    
/* 添加分类 */
export function BaseClassAdd(params) {
    return axios({
      url:'/api/Base/BaseClassAdd',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
     
/* 修改分类 */
export function BaseClassUpdate(params) {
    return axios({
      url:'/api/Base/BaseClassUpdate',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
      
/* 单位列表获取 */
export function BaseUnitListGet(params) {
    return axios({
      url:'/api/Base/BaseUnitListGet',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
       
/* 添加单位信息 */
export function BaseUnitAdd(params) {
    return axios({
      url:'/api/Base/BaseUnitAdd',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
        
/* 修改单位 */
export function BaseUnitUpdate(params) {
    return axios({
      url:'/api/Base/BaseUnitUpdate',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
     
/* 支付列表获取 */
export function BasePayListGet(params) {
    return axios({
      url:'/api/Base/BasePayListGet',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
      
/* 添加支付方式 */
export function BasePayAdd(params) {
    return axios({
      url:'/api/Base/BasePayAdd',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
       
/* 修改支付方式 */
export function BasePayUpdate(params) {
    return axios({
      url:'/api/Base/BasePayUpdate',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }