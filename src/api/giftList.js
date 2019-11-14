import axios from "axios"
import request from '../utils/request'; 


/* 礼品卡列表获取 */
export function getGiftList(obj) {
    return request({
      url: '/api/Member/GiftCardListGetFromCondition',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  

/* 修改礼品卡 */
export function changeGiftList(obj) {
    return request({
      url: '/api/Member/MemberGiftCardUpdate',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
 

/* 礼品卡明细 */
export function GiftListDetail(obj) {
    return request({
      url: '/api/Member/MemberGiftCardUseDetailListGetFromID',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
