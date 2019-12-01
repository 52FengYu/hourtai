import axios from "axios"
import request from '../utils/request'; 


/* 根据统一编码获取图库信息 */
export function getPicInfo(obj) {
    return axios({
      url: '/api/Product/LqUnicodeImageInfoGetFromUnicode',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  

/* 根据门店码获取商品信息 */
export function getProductInfo(obj) {
    return axios({
      url: '/api/Product/ProductInfoGetFromShopcode',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }


  /* 商品详情获取 */
export function getProductDetail(obj) {
    return axios({
      url: '/api/Product/ProductInfoGetFromID',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  

  /* 商品列表获取 */
export function getProductList(obj) {
    return axios({
      url: '/api/Product/ProductListGet',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
   

  /* 商品添加 */
export function addProduct(obj) {
    return axios({
      url: '/api/Product/ProductAdd',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
    

  /* 修改商品 */
export function changeProduct(obj) {
    return axios({
      url: '/api/Product/ProductUpdate',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }


  /* 商品上下架 */
  export function ProductState(obj) {
    return axios({
      url: '/api/Product/ProductSell',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  

  /* 商品审核 */
  export function ProductReview(obj) {
    return axios({
      url: '/api/Product/ProductAudit',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }


  /* 添加主图 */
  export function addPicture(obj) {
    return axios({
      url: '/api/Product/ProductHeadImageAdd',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  

  /* 删除主图 */
  export function delPicture(obj) {
    return axios({
      url: '/api/Product/ProductHeadImageDelete',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  

  /* 添加详情图 */
  export function AddDetailMap(obj) {
    return axios({
      url: '/api/Product/ProductContentImageAdd',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  

  /* 删除详情图 */
  export function delDetailMap(obj) {
    return axios({
      url: '/api/Product/ProductContentImageDelete',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  

  /* 修改商品利群内部信息 */
  export function changeProductInternalInfo(obj) {
    return axios({
      url: '/api/Product/ProductLiQunInfoUpdate',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  

  /* 商品库存修改 */
  export function changeProductStock(obj) {
    return axios({
      url: '/api/Product/ProductStockUpdate',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  

  /* 商品调价添加 */
  export function ProductPriceAdjustment(obj) {
    return axios({
      url: '/api/Product/ProductChangePriceAdd',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  

  /* 商品调价修改 */
  export function ProductPriceChange(obj) {
    return axios({
      url: '/api/Product/ProductChangePriceUpdate',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  

  /* 调价审核 */
  export function PriceAdjustmentReview(obj) {
    return axios({
      url: '/api/Product/ProductChangePriceAudit',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  

  /* 停止区间调价 */
  export function StopPriceAdjustment(obj) {
    return axios({
      url: '/api/Product/ProductChangePriceStop',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  

  /* 调价废弃 */
  export function PriceAdjustment(obj) {
    return axios({
      url: '/api/Product/ProductChangePriceDelete',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
   

  /* 全部分类ID和分类名获取 */
  export function getIDclass(obj) {
    return axios({
      url: '/api/Base/BaseClassAllListGet',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }


  /* 调价列表 */
  export function changePriceList(obj) {
    return axios({
      url: '/api/Product/ProductChangePriceListGet',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }

  

  /* 供应商 */
  export function SupplierListGetByLevel(obj) {
    return axios({
      url: '/api/Supplier/SupplierListGetByLevel',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  
  

  /* 上传图片 */
  export function UploadImage(obj) {
    return axios({
      url: '/api/Image/UploadImage',
      method: 'POST',
      headers:{
        'Content-Type':' application/x-www-form-urlencoded ',
        'TokenID':SessionStorage.getItem('TokenID')
      },
      data: obj
    })
  }