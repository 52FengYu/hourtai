import axios from "axios"


/* 活动审核 */
export function PromotionAudit(params) {
  return axios({
    url:'/api/Promotion/PromotionAudit',
    method: 'post',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded ',
    },
    data: params
  })
}


/* 停止领券活动 */
export function PromotiomStop(params) {
  return axios({
    url: '/api/Promotion/PromotiomStop',
    method: 'post',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded ',
    },
    data: params
  })
}

/* 活动列表获取 */
export function PromotionListGet(params) {
    return axios({
      url: '/api/Promotion/PromotionListGet',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }

  
/* 添加活动 */
export function PromotionAdd(params) {
    return axios({
      url: '/api/Promotion/PromotionAdd',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
  
  
/* 降价促销活动添加 */
export function PromotionProductAdd(params) {
    return axios({
      url: '/api/Promotion/PromotionProductAdd',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
   
  
/* 降价促销活动修改 */
export function PromotionProductUpdate(params) {
    return axios({
      url: '/api/Promotion/PromotionProductUpdate',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
    
  
/* 根据活动ID获取降价促销活动明细 */
export function PromotionProductGetFromPromotionID(params) {
    return axios({
      url: '/api/Promotion/PromotionProductGetFromPromotionID',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
      
  
/* 满折活动添加 */
export function PromotionProductDiscountAdd(params) {
  return axios({
    url: '/api/Promotion/PromotionProductDiscountAdd',
    method: 'post',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded ',
    },
    data: params
  })
}
     
  
/* 满折活动修改 */
export function PromotionProductDiscountUpdate(params) {
  return axios({
    url: '/api/Promotion/PromotionProductDiscountUpdate',
    method: 'post',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded ',
    },
    data: params
  })
}
     
  
/* 根据活动号获取满折活动列表 */
export function PromotionProductDiscountGetFromPromotionID(params) {
  return axios({
    url: '/api/Promotion/PromotionProductDiscountGetFromPromotionID',
    method: 'post',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded ',
    },
    data: params
  })
}
     
  
/* 满赠活动添加 */
export function PromotionGiftAdd(params) {
  return axios({
    url: '/api/Promotion/PromotionGiftAdd',
    method: 'post',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded ',
    },
    data: params
  })
}
    
  
/* 满赠活动修改 */
export function PromotionGiftUpdate(params) {
  return axios({
    url: '/api/Promotion/PromotionGiftUpdate',
    method: 'post',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded ',
    },
    data: params
  })
}
   
  
/* 根据活动号获取满赠活动列表 */
export function PromotionGiftListGetFromPromotionID(params) {
  return axios({
    url: '/api/Promotion/PromotionGiftListGetFromPromotionID',
    method: 'post',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded ',
    },
    data: params
  })
}

  
/* 满赠活动赠品添加 */
export function PromotionGiftDetailAdd(params) {
  return axios({
    url: '/api/Promotion/PromotionGiftDetailAdd',
    method: 'post',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded ',
    },
    data: params
  })
}

  
/* 满赠活动修改赠品 */
export function PromotionGiftDetailUpdate(params) {
  return axios({
    url: '/api/Promotion/PromotionGiftDetailUpdate',
    method: 'post',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded ',
    },
    data: params
  })
}

  
/* 根据满赠活动ID获取赠品列表 */
export function PromotionGiftDetailListGetFromPromotionGiftID(params) {
  return axios({
    url: '/api/Promotion/PromotionGiftDetailListGetFromPromotionGiftID',
    method: 'post',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded ',
    },
    data: params
  })
}