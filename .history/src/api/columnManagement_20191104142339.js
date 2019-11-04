export function getItemList(params) {
    return request({
      url: '/api/Page/PageTypeListGetByUser',
      method: 'post',
      data: params
    })
  }