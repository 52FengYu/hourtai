import axios from "axios"
import request from '../utils/request'; 


/* 礼品卡列表获取 */
export function getGiftList(obj) {
    return axios({
      url: '/api/Member/GiftCardListGetFromCondition',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  

/* 修改礼品卡 */
export function changeGiftList(obj) {
    return axios({
      url: '/api/Member/MemberGiftCardUpdate',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
 

/* 礼品卡明细 */
export function GiftListDetail(obj) {
    return axios({
      url: '/api/Member/MemberGiftCardUseDetailListGetFromID',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
 
/* 废弃礼品卡审核 */
export function GiftCardGiveOutMasterDelete(obj) {
  return axios({
    url: 'api/Member/GiftCardGiveOutMasterDelete',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 根据条件获取礼品卡审核信息 */
export function GiftCardGiveOutListGetFromCondition(obj) {
  return axios({
    url: 'api/Member/GiftCardGiveOutListGetFromCondition',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}

/* 礼品卡审核 */
export function MemberGiftCardGiveOutMasterUpdate(obj) {
  return axios({
    url: 'api/Member/MemberGiftCardGiveOutMasterUpdate',
    method: 'POST',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded '
    },
    data: obj
  })
}