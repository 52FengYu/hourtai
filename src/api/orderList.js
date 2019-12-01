import axios from "axios"
import request from '../utils/request'; 


/* 订单列表获取 */
export function getOrderList(obj) {
    return axios({
      url: '/api/Order/OrderMasterListGet',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }

  

/* 订单详情 */
export function orderDetail(obj) {
    return axios({
      url: '/api/Order/OrderDetailListGetFromID',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }

  

/* 修改订单信息 */
export function changePayMethod(obj) {
    return axios({
      url: '/api/Order/OrderUpdate',    
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  
  

/* 修改未支付未缺单订单数量和金额 */
export function changePayNum(obj) {
    return axios({
      url: '/api/Order/OrderDetailUpdateQtyAndMemberPrice',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  
  

/* 所有支付方式对应关系获取 */
export function BasePayAllList(obj) {
  return axios({
    url: '/api/Base/BasePayAllList',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}