/* 获取用户可添加的页面类型 */
export function getItemList(params) {
    return request({
      url: '/api/Page/PageTypeListGetByUser',
      method: 'post',
      data: params
    })
  }