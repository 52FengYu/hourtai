import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/orderList'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                /* {
                    path: '/useManagement',
                    component: resolve => require(['../components/page/useManagement.vue'], resolve),
                    meta: { title: '用户列表',requireAuth:true }
                },
                {
                    path: '/permissionList',
                    component: resolve => require(['../components/page/PermissionList.vue'], resolve),
                    meta: { title: '权限列表',requireAuth:true }
                },
                {
                    path: '/roleList',
                    component: resolve => require(['../components/page/RoleList.vue'], resolve),
                    meta: { title: '角色列表',requireAuth:true }
                }, */
                {
                    path: '/membershipList',
                    component: resolve => require(['../components/page/MembershipList.vue'], resolve),
                    meta: { title: '会员列表',requireAuth:true }
                },
                {
                    path: '/memberReg',
                    component: resolve => require(['../components/page/memberReg.vue'], resolve),
                    meta: { title: '会员注册数统计',requireAuth:true }
                },
                {
                    path: '/shopList',
                    component: resolve => require(['../components/page/shopList/index.vue'], resolve),
                    meta: { title: '门店列表',requireAuth:true }
                },
                {
                    path: '/Supplier',
                    component: resolve => require(['../components/page/Supplier/index.vue'], resolve),
                    meta: { title: '供应商列表',requireAuth:true }
                },
                {
                    path: '/SupplierDetail',
                    component: resolve => require(['../components/page/Supplier/supplierDetail.vue'], resolve),
                    meta: { title: '供应商详情',requireAuth:true }
                },
                {
                    path: '/addSupplier',          
                    component: resolve => require(['../components/page/Supplier/addSupplier.vue'], resolve),
                    meta: { title: '新建供应商',requireAuth:true }
                },
                {
                    path: '/Correspondence',
                    component: resolve => require(['../components/page/Supplier/Correspondence.vue'], resolve),
                    meta: { title: '对应关系',requireAuth:true }
                },             
                {
                    path: '/showLevel',
                    component: resolve => require(['../components/page/Supplier/showLevel.vue'], resolve),
                    meta: { title: '三级分类获取',requireAuth:true }
                },
                {
                    path: '/SupplierFeeList',
                    component: resolve => require(['../components/page/Supplier/SupplierFeeList.vue'], resolve),
                    meta: { title: '运费列表',requireAuth:true }
                },
                {
                    path: '/newStore',
                    component: resolve => require(['../components/page/shopList/newStore.vue'], resolve),
                    meta: { title: '新增门店',requireAuth:true }
                },
                {
                    path: '/columnManagement',
                    component: resolve => require(['../components/page/columnManagement/ColumnManagement.vue'], resolve),
                    meta: { title: '页面管理',requireAuth:true }    
                },
                {
                    path: '/columnManagementList',
                    component: resolve => require(['../components/page/columnManagement/index.vue'], resolve),
                    meta: { title: '页面管理列表',requireAuth:true }    
                },
                {
                    path: '/hotManagement',
                    component: resolve => require(['../components/page/hotManagement.vue'], resolve),
                    meta: { title: '热搜词管理',requireAuth:true }   
                },
                {
                    path: '/goodsList',
                    component: resolve => require(['../components/page/goodsList/index.vue'], resolve),
                    meta: { title: '商品列表',requireAuth:true },
                },
                {
                    path: '/brandManagement',
                    component: resolve => require(['../components/page/brandManagement/index.vue'], resolve),
                    meta: { title: '品牌管理',requireAuth:true }
                },
                {
                    path: '/addBrand',
                    component: resolve => require(['../components/page/brandManagement/addBrand.vue'], resolve),
                    meta: { title: '新增品牌',requireAuth:true }
                },
                {
                    path: '/newgoods',
                    component: resolve => require(['../components/page/goodsList/newgoods.vue'], resolve),
                    meta: { title: '新增商品',requireAuth:true }
                },
                {
                    path: '/productDetail',
                    component: resolve => require(['../components/page/goodsList/productDetail.vue'], resolve),
                    meta: { title: '商品详情',requireAuth:true }
                },
                {
                    path: '/changeProductDetail',
                    component: resolve => require(['../components/page/goodsList/changeProductDetail.vue'], resolve),
                    meta: { title: '修改商品',requireAuth:true }
                },
                {
                    path: '/List',
                    component: resolve => require(['../components/page/List.vue'], resolve),
                    meta: { title: '类目列表',requireAuth:true }
                },
                {
                    path: '/priceList',
                    component: resolve => require(['../components/page/priceList'], resolve),
                    meta: { title: '价格审核列表',requireAuth:true }
                },
                {
                    path: '/detail',
                    component: resolve => require(['../components/page/priceList/detail.vue'], resolve),
                    meta: { title: '价格变更记录详情',requireAuth:true }
                },
                {
                    path: '/priceChange',
                    component: resolve => require(['../components/page/priceChange.vue'], resolve),
                    meta: { title: '价格变更列表',requireAuth:true }
                },
                {
                    path: '/couponList',
                    component: resolve => require(['../components/page/couponList/index.vue'], resolve),
                    meta: { title: '优惠券列表',requireAuth:true }
                },
                {
                    path: '/addCouponActivity',
                    component: resolve => require(['../components/page/couponList/addCouponActivity.vue'], resolve),
                    meta: { title: '领券活动主表添加',requireAuth:true }
                },
                {
                    path: '/changeCouponActivity',
                    component: resolve => require(['../components/page/couponList/changeCouponActivity.vue'], resolve),
                    meta: { title: '领券活动主表修改',requireAuth:true }
                },
                {
                    path: '/MemberGiftTokenGiveOutDetailListGetFromGiftTokenGiveOutMasterID',
                    component: resolve => require(['../components/page/couponList/MemberGiftTokenGiveOutDetailListGetFromGiftTokenGiveOutMasterID.vue'], resolve),
                    meta: { title: '领券活动明细',requireAuth:true }
                },
                {
                    path: '/giftList',
                    component: resolve => require(['../components/page/giftList/index.vue'], resolve),
                    meta: { title: '礼品卡列表',requireAuth:true }
                },
                {
                    path: '/giftDetail',
                    component: resolve => require(['../components/page/giftList/giftDetail.vue'], resolve),
                    meta: { title: '礼品卡明细',requireAuth:true }
                },
                {
                    path: '/activeList',
                    component: resolve => require(['../components/page/activeList/index.vue'], resolve),
                    meta: { title: '活动列表',requireAuth:true }
                },
                {
                    path: '/fullFold',
                    component: resolve => require(['../components/page/activeList/fullFold.vue'], resolve),
                    meta: { title: '满折活动详情',requireAuth:true }
                },
                {
                    path: '/Markdown',
                    component: resolve => require(['../components/page/activeList/Markdown.vue'], resolve),
                    meta: { title: '降价活动详情',requireAuth:true }
                },
                {
                    path: '/fullGift',
                    component: resolve => require(['../components/page/activeList/fullGift.vue'], resolve),
                    meta: { title: '满赠活动详情',requireAuth:true }
                },
                {
                    path: '/littleGiftList',
                    component: resolve => require(['../components/page/activeList/littleGiftList.vue'], resolve),
                    meta: { title: '赠品列表',requireAuth:true }
                },
                {
                    path: '/orderList',            
                    component: resolve => require(['../components/page/orderList/index.vue'], resolve),
                    meta: { title: '订单列表',requireAuth:true }
                },
                {
                    path: '/Sorting',       
                    component: resolve => require(['../components/page/orderList/Sorting.vue'], resolve),
                    meta: { title: '分拣集货',requireAuth:true }
                },
                {
                    path: '/ReturnGoods',       
                    component: resolve => require(['../components/page/orderList/ReturnGoods.vue'], resolve),
                    meta: { title: '退货列表',requireAuth:true }
                },
                {
                    path: '/orderDetail',
                    component: resolve => require(['../components/page/orderList/orderDetail.vue'], resolve),
                    meta: { title: '订单详情',requireAuth:true }
                },
                {
                    path: '/changeOrder',
                    component: resolve => require(['../components/page/orderList/changeOrder.vue'], resolve),
                    meta: { title: '修改订单信息',requireAuth:true }
                },
                {
                    path: '/application',
                    component: resolve => require(['../components/page/competence/application/index.vue'], resolve),
                    meta: { title: '应用',requireAuth:true }
                },
                {
                    path: '/applicationDetail',
                    component: resolve => require(['../components/page/competence/application/detail.vue'], resolve),
                    meta: { title: '应用模块',requireAuth:true }
                },
                {
                    path: '/users',
                    component: resolve => require(['../components/page/competence/users/index.vue'], resolve),
                    meta: { title: '用户',requireAuth:true }
                },
                {
                    path: '/limit',
                    component: resolve => require(['../components/page/competence/application/limit.vue'], resolve),
                    meta: { title: '权限',requireAuth:true }
                },
                {
                    path: '/section',
                    component: resolve => require(['../components/page/competence/section/index.vue'], resolve),
                    meta: { title: '部门',requireAuth:true }
                },
                {
                    path: '/role',
                    component: resolve => require(['../components/page/competence/role/index.vue'], resolve),
                    meta: { title: '角色',requireAuth:true }
                },
                {
                    path: '/authority',
                    component: resolve => require(['../components/page/competence/authority/index.vue'], resolve),
                    meta: { title: '权限列表',requireAuth:true }
                },
                /* {
                    path: '/place',
                    component: resolve => require(['../components/page/goodsList/place.vue'], resolve),
                    meta: { title: '地图',requireAuth:true }
                }, */
                {
                    path: '/test',
                    component: resolve => require(['../components/page/Supplier/test.vue'], resolve),
                    meta: { title: '地图',requireAuth:true }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
 router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
      next();
    } else {
      let token = sessionStorage.getItem('TokenID');
   
      if (token === null || token === '') {
        next('/login');
      } else {
        next();
      }
    }
    if(to.meta.requireAuth == true){

    } else{
        next()
    }
  });
   
  export default router;