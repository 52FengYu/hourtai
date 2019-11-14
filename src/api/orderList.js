import axios from "axios"
import request from '../utils/request'; 


/* 订单列表获取 */
export function getOrderList(obj) {
    return request({
      url: '/api/Order/OrderMasterListGet',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }

  

/* 订单详情 */
export function orderDetail(obj) {
    return request({
      url: '/api/Order/OrderDetailListGetFromID',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }

  

/* 修改订单支付方式 */
export function changePayMethod(obj) {
    return request({
      url: '/api/Order/OrderPayTypeChange',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  
  

/* 修改未支付未缺单订单数量和金额 */
export function changePayNum(obj) {
    return request({
      url: '/api/Order/OrderDetailUpdateQtyAndMemberPrice',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }