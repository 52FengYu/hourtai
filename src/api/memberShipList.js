import axios from "axios"
import request from '../utils/request'; 


/* 会员列表获取 */
export function getMemberList(obj) {
    return axios({
      url: '/api/Member/MemberListGet',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }


  /* 重置会员密码 */
export function resetMemberPsd(obj) {
    return axios({
      url: '/api/Member/MemberChangePassWord',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }


  /* 废弃会员 */
export function deleteMember(obj) {
    return axios({
      url: '/api/Member/MemberDelete',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }