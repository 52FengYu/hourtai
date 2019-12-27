import axios from "axios"

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

/* 订单待分拣信息获取 */
export function OrderDeliveryInfoGet(obj) {
  return axios({
    url: '/api/Order/OrderDeliveryInfoGet',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 订单明细出库 */
export function OrderDetailDelivery(obj) {
  return axios({
    url: '/api/Order/OrderDetailDelivery',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 订单出库复核 */
export function OrderDeliveryOK(obj) {
  return axios({
    url: '/api/Order/OrderDeliveryOK',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 订单出库打印信息获取 */
export function OrderOutPrintInfoGet(obj) {
  return axios({
    url: '/api/Order/OrderOutPrintInfoGet',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 退货列表获取 */
export function OrderBackProductListGet(obj) {
  return axios({
    url: '/api/Order/OrderBackProductListGet',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 退单呼叫中心审核 */
export function OrderBackProductCallCenterAudit(obj) {
  return axios({
    url: '/api/Order/OrderBackProductCallCenterAudit',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 供应商确认收货 */
export function OrderBackProductSupplierReceiveAudit(obj) {
  return axios({
    url: '/api/Order/OrderBackProductSupplierReceiveAudit',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 待分拣订单列表获取 */
export function OrderMasterOutStockList(obj) {
  return axios({
    url: '/api/Order/OrderMasterOutStockList',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 自提订单顾客自提确认 */
export function OrderSelfReceiveConfirm(obj) {
  return axios({
    url: '/api/Order/OrderSelfReceiveConfirm',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 订单配送 */
export function OrderDeliverySetPS(obj) {
  return axios({
    url: '/api/Order/OrderDeliverySetPS',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 订单复核驳回 */
export function OrderDeliveryReFJ(obj) {
  return axios({
    url: '/api/Order/OrderDeliveryReFJ',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 集货订单打印 */
export function OrderJHPrintInfoGet(obj) {
  return axios({
    url: '/api/Order/OrderJHPrintInfoGet',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 分拣单打印 */
export function OrderFJPrintInfoGet(obj) {
  return axios({
    url: '/api/Order/OrderFJPrintInfoGet',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 退单详情获取 */
export function OrderBackProductGetFromID(obj) {
  return axios({
    url: '/api/order/OrderBackProductGetFromID',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}