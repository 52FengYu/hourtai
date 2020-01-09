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

/* 添加单个商品退货 */
export function OrderBackProductAdd(obj) {
  return axios({
    url: '/api/order/OrderBackProductAdd',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 整单退货 */
export function OrderBackProductAddByOrder(obj) {
  return axios({
    url: '/api/order/OrderBackProductAddByOrder',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}
/* 待退款列表获取 */
export function OrderBackProductUnPayListGet(obj) {
  return axios({
    url: '/api/order/OrderBackProductUnPayListGet',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 退货退款添加 */
export function OrderBackProductPayAdd(obj) {
  return axios({
    url: '/api/order/OrderBackProductPayAdd',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 退单退款列表获取 */
export function OrderBackProductPayMasterListGet(obj) {
  return axios({
    url: '/api/order/OrderBackProductPayMasterListGet',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 根据退款单号获取退款单明细 */
export function OrderBackPayDetailListGetFromOrderBackPayID(obj) {
  return axios({
    url: '/api/order/OrderBackPayDetailListGetFromOrderBackPayID',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 退货退款明细导出 */
export function OrderBackProductPayDetailExport(obj) {
  return axios({
    url: '/api/order/OrderBackProductPayDetailExport',
    method: 'POST',
    responseType:'blob',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 订单导出 */
export function OrderMasterListExport(obj) {
  return axios({
    url: '/api/Order/OrderMasterListExport',
    method: 'POST',
    responseType:'blob',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 退单导出 */
export function OrderBackProductExport(obj) {
  return axios({
    url: '/api/Order/OrderBackProductExport',
    method: 'POST',
    responseType:'blob',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 退货退款确认 */
export function OrderBackProductPaySetOK(obj) {
  return axios({
    url: '/api/Order/OrderBackProductPaySetOK',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 订单送达确认 */
export function OrderSetExpressSendOK(obj) {
  return axios({
    url: '/api/Order/OrderSetExpressSendOK',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}