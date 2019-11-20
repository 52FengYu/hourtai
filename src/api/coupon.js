import axios from "axios"
import request from '../utils/request'; 


/* 领券活动列表获取 */
export function MemberGiftTokenGiveOutMasterListGet(params) {
    return request({
      url: '/api/Member/MemberGiftTokenGiveOutMasterListGet',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
        TokenID : 'jd'
      },
      data: params
    })
  }
  

/* 领券活动主表添加 */
export function MemberGiftTokenGiveOutMasterAdd(params) {
    return request({
      url: '/api/Member/MemberGiftTokenGiveOutMasterAdd',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
        TokenID : 'jd'
      },
      data: params
    })
  }
   

/* 修改领券活动主表 */
export function MemberGiftTokenGiveOutMasterUpdate(params) {
    return request({
      url: '/api/Member/MemberGiftTokenGiveOutMasterUpdate',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
        TokenID : 'jd'
      },
      data: params
    })
  }
    

/* 废弃领券活动 */
export function MemberGiftTokenGiveOutMasterDelete(params) {
    return request({
      url: '/api/Member/MemberGiftTokenGiveOutMasterDelete',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
        TokenID : 'jd'
      },
      data: params
    })
  }
     

/* 领券活动明细添加 */
export function MemberGiftTokenGiveOutDetailAdd(params) {
    return request({
      url: '/api/Member/MemberGiftTokenGiveOutDetailAdd',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
        TokenID : 'jd'
      },
      data: params
    })
  }
     

/* 修改领券明细信息 */
export function MemberGiftTokenGiveOutDetailUpdate(params) {
    return request({
      url: '/api/Member/MemberGiftTokenGiveOutDetailUpdate',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
        TokenID : 'jd'
      },
      data: params
    })
  }
     

/* 删除领券活动明细 */
export function MemberGiftTokenGiveOutDetailDelete(params) {
    return request({
      url: '/api/Member/MemberGiftTokenGiveOutDetailDelete',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
        TokenID : 'jd'
      },
      data: params
    })
  }
      

/* 根据领券活动主表ID获取领券活动明细 */
export function MemberGiftTokenGiveOutDetailListGetFromGiftTokenGiveOutMasterID(params) {
    return request({
      url: '/api/Member/MemberGiftTokenGiveOutDetailListGetFromGiftTokenGiveOutMasterID',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
        TokenID : 'jd'
      },
      data: params
    })
  }
       

/* 领券活动审核 */
export function MemberGiftTokenGiveOutMasterAudit(params) {
    return request({
      url: '/api/Member/MemberGiftTokenGiveOutMasterAudit',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
        TokenID : 'jd'
      },
      data: params
    })
  }
       

/* 停止领券活动 */
export function MemberGiftTokenGiveOutMasterStop(params) {
    return request({
      url: '/api/Member/MemberGiftTokenGiveOutMasterStop',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
        TokenID : 'jd'
      },
      data: params
    })
  }