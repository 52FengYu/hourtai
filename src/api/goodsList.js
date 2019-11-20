import axios from "axios"
import request from '../utils/request'; 


/* 根据统一编码获取图库信息 */
export function getPicInfo(obj) {
    return request({
      url: '/api/Product/LqUnicodeImageInfoGetFromUnicode',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  

/* 根据门店码获取商品信息 */
export function getProductInfo(obj) {
    return request({
      url: '/api/Product/ProductInfoGetFromShopcode',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }


  /* 商品详情获取 */
export function getProductDetail(obj) {
    return request({
      url: '/api/Product/ProductInfoGetFromID',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  

  /* 商品列表获取 */
export function getProductList(obj) {
    return request({
      url: '/api/Product/ProductListGet',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
   

  /* 商品添加 */
export function addProduct(obj) {
    return request({
      url: '/api/Product/ProductAdd',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
    

  /* 修改商品 */
export function changeProduct(obj) {
    return request({
      url: '/api/Product/ProductUpdate',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }


  /* 商品上下架 */
  export function ProductState(obj) {
    return request({
      url: '/api/Product/ProductSell',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  

  /* 商品审核 */
  export function ProductReview(obj) {
    return request({
      url: '/api/Product/ProductAudit',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }


  /* 添加主图 */
  export function addPicture(obj) {
    return request({
      url: '/api/Product/ProductHeadImageAdd',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  

  /* 删除主图 */
  export function delPicture(obj) {
    return request({
      url: '/api/Product/ProductHeadImageDelete',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  

  /* 添加详情图 */
  export function AddDetailMap(obj) {
    return request({
      url: '/api/Product/ProductContentImageAdd',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  

  /* 删除详情图 */
  export function delDetailMap(obj) {
    return request({
      url: '/api/Product/ProductContentImageDelete',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  

  /* 修改商品利群内部信息 */
  export function changeProductInternalInfo(obj) {
    return request({
      url: '/api/Product/ProductLiQunInfoUpdate',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  

  /* 商品库存修改 */
  export function changeProductStock(obj) {
    return request({
      url: '/api/Product/ProductStockUpdate',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  

  /* 商品调价添加 */
  export function ProductPriceAdjustment(obj) {
    return request({
      url: '/api/Product/ProductChangePriceAdd',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  

  /* 商品调价修改 */
  export function ProductPriceChange(obj) {
    return request({
      url: '/api/Product/ProductChangePriceUpdate',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  

  /* 调价审核 */
  export function PriceAdjustmentReview(obj) {
    return request({
      url: '/api/Product/ProductChangePriceAudit',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  

  /* 停止区间调价 */
  export function StopPriceAdjustment(obj) {
    return request({
      url: '/api/Product/ProductChangePriceStop',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
  

  /* 调价废弃 */
  export function PriceAdjustment(obj) {
    return request({
      url: '/api/Product/ProductChangePriceDelete',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }
   

  /* 全部分类ID和分类名获取 */
  export function getIDclass(obj) {
    return request({
      url: '/api/Base/BaseClassAllListGet',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }


  /* 调价列表 */
  export function changePriceList(obj) {
    return request({
      url: '/api/Product/ProductChangePriceListGet',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }

  

  /* 供应商 */
  export function SupplierListGetByLevel(obj) {
    return request({
      url: '/api/Supplier/SupplierListGetByLevel',
      method: 'POST',
      headers:{
        TokenID:'jd',
        'Content-Type':' application/x-www-form-urlencoded '
      },
      data: obj
    })
  }