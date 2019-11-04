/* 获取用户可添加的页面类型 */
export function getAddItemType(params) {
    return request({
      url: '/api/Page/PageTypeListGetByUser',
      method: 'post',
      data: params
    })
  }

  /* 根据页面类型获取页面内容类型 */
export function getItemType(params) {
    return request({
      url: '/api/Page/PageContentTypeListGetByPageTypeID',
      method: 'post',
      data: params
    })
  }

   /* 增加页面 */
export function addPage(params) {
    return request({
      url: '/api/Page/PageAdd',
      method: 'post',
      data: params
    })
  }

   /* 修改页面信息 */
export function changeItemInfo(params) {
    return request({
      url: '/api/Page/PageUpdate',
      method: 'post',
      data: params
    })
  }