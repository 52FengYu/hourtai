import axios from "axios"

/* 供应商列表获取 */
export function SupplierListGet(obj) {
    return axios({
      url:   '/api/Supplier/SupplierListGet',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  
/* 根据ID获取供应商信息 */
export function SupplierGetFromID(obj) {
    return axios({
      url:  '/api/Supplier/SupplierGetFromID',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
   
/* 添加供应商 */
export function SupplierAdd(obj) {
    return axios({
      url: '/api/Supplier/SupplierAdd',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  
/* 修改供应商 */
export function SupplierUpdate(obj) {
    return axios({
      url: '/api/Supplier/SupplierUpdate',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  
/* 审核供应商 */
export function SupplierAudit(obj) {
    return axios({
      url: '/api/Supplier/SupplierAudit',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  
/* 供应商与用户对应关系添加 */
export function SupplierOpUserAdd(obj) {
  return axios({
    url:   '/api/Supplier/SupplierOpUserAdd',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 供应与供应商对应关系修改 */
export function SupplierOpUserUpdate(obj) {
  return axios({
    url:   '/api/Supplier/SupplierOpUserUpdate',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 用户与供应商对应关系废弃 */
export function SupplierOpUserDelete(obj) {
  return axios({
    url:  '/api/Supplier/SupplierOpUserDelete',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 供应商和对应用户关系获取 */
export function SupplierOpUserListGet(obj) {
  return axios({
    url:  '/api/Supplier/SupplierOpUserListGet',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 供应商可显示三级分类获取 */
export function SupplierClassListGetFromMainSupplierID(obj) {
  return axios({
    url: '/api/Supplier/SupplierClassListGetFromMainSupplierID',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 修改供应商可显示三级分类 */
export function SupplierClassUpdate(obj) {
  return axios({
    url:  '/api/Supplier/SupplierClassUpdate',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 供应商运费列表获取 */
export function SupplierSendFeeListGet(obj) {
  return axios({
    url:  '/api/Supplier/SupplierSendFeeListGet',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 增加供应运费信息 */
export function SupplierSendFeeListAdd(obj) {
  return axios({
    url:  '/api/Supplier/SupplierSendFeeListAdd',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 修改供应商运费信息 */
export function SupplierSendFeeUpdate(obj) {
  return axios({
    url:'/api/Supplier/SupplierSendFeeUpdate',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 废弃运费信息 */
export function SupplierSendFeeDelete(obj) {
  return axios({
    url:'/api/Supplier/SupplierSendFeeDelete',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}