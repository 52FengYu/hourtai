import axios from "axios"


/* 增加应用 */
export function SysAppAdd(params) {
    return axios({
      url: '/webapi/User/SysAppAdd',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
  

/* 修改应用信息 */
export function SysAppUpdate(params) {
    return axios({
      url: '/webapi/User/SysAppUpdate',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
   

/* 应用列表获取 */
export function SysAppListGet(params) {
    return axios({
      url: '/webapi/User/SysAppListGet',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
    

/* 添加部门信息 */
export function SysDeptAdd(params) {
    return axios({
      url: '/webapi/User/SysDeptAdd',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
     

/* 修改部门信息 */
export function SysDeptUpdate(params) {
    return axios({
      url: '/webapi/User/SysDeptUpdate',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
      

/* 获取部门列表 */
export function SysDeptListGet(params) {
    return axios({
      url: '/webapi/User/SysDeptListGet',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
       

/* 添加用户信息信息 */
export function SysUserAdd(params) {
    return axios({
      url: '/webapi/User/SysUserAdd',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
        

/* 修改用户 */
export function SysUserUpdate(params) {
    return axios({
      url: '/webapi/User/SysUserUpdate',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
         

/* 删除用户 */
export function SysUserDelete(params) {
    return axios({
      url: '/webapi/User/SysUserDelete',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
         

/* 停用用户 */
export function SysUserStop(params) {
    return axios({
      url: '/webapi/User/SysUserStop',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
          

/* 启用用户 */
export function SysUserSetEnable(params) {
    return axios({
      url: '/webapi/User/SysUserSetEnable',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
           

/* 设置用户角色 */
export function SysUserSetRole(params) {
    return axios({
      url: '/webapi/User/SysUserSetRole',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
            

/* 用户列表获取 */
export function SysUserListGet(params) {
    return axios({
      url: '/webapi/User/SysUserListGet',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
             

/* 添加应用模块 */
export function SysModuleAdd(params) {
    return axios({
      url: '/webapi/User/SysModuleAdd',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
              

/* 修改应用模块 */
export function SysModuleUpdate(params) {
    return axios({
      url: '/webapi/User/SysModuleUpdate',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
               

/* 根据AppID获取模块信息 */
export function SysModuleListGetFromAppID(params) {
    return axios({
      url: '/webapi/User/SysModuleListGetFromAppID',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
                

/* 根据模块ID获取模块权限信息 */
export function SysAuthorityListGetFromModuleID(params) {
    return axios({
      url: '/webapi/User/SysAuthorityListGetFromModuleID',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
                 

/* 模块权限信息添加 */
export function SysAuthorityAdd(params) {
    return axios({
      url: '/webapi/User/SysAuthorityAdd',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
                  

/* 修改模块权限信息 */
export function SysAuthorityUpdate(params) {
    return axios({
      url: '/webapi/User/SysAuthorityUpdate',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
                  

/* 关联模块和权限 */
export function SysAuthorityModuleRelevant(params) {
    return axios({
      url: '/webapi/User/SysAuthorityModuleRelevant',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
                   

/* 增加角色信息 */
export function SysRoleAdd(params) {
    return axios({
      url: '/webapi/User/SysRoleAdd',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
                   

/* 修改角色信息 */
export function SysRoleUpdate(params) {
    return axios({
      url: '/webapi/User/SysRoleUpdate',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
                   

/* 角色列表获取 */
export function SysRoleListGet(params) {
    return axios({
      url: '/webapi/User/SysRoleListGet',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
                    

/* 角色权限维护 */
export function SysRoleSetAuthority(params) {
    return axios({
      url: '/webapi/User/SysRoleSetAuthority',
      method: 'post',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
      },
      data: params
    })
  }
                     

/* 完整权限列表返回 */
export function AuthorityListGet(params) {
  return axios({
    url: '/webapi/User/AuthorityListGet',
    method: 'post',
    headers:{
      'Content-Type':' application/x-www-form-urlencoded ',
    },
    data: params
  })
}