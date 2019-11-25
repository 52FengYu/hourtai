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
                {
                    path: '/useManagement',
                    component: resolve => require(['../components/page/useManagement.vue'], resolve),
                    meta: { title: '用户列表' }
                },
                {
                    path: '/permissionList',
                    component: resolve => require(['../components/page/PermissionList.vue'], resolve),
                    meta: { title: '权限列表' }
                },
                {
                    path: '/roleList',
                    component: resolve => require(['../components/page/RoleList.vue'], resolve),
                    meta: { title: '角色列表' }
                },
                {
                    path: '/membershipList',
                    component: resolve => require(['../components/page/MembershipList.vue'], resolve),
                    meta: { title: '会员列表' }
                },
                {
                    path: '/memberReg',
                    component: resolve => require(['../components/page/memberReg.vue'], resolve),
                    meta: { title: '会员注册数统计' }
                },
                {
                    path: '/shopList',
                    component: resolve => require(['../components/page/shopList/index.vue'], resolve),
                    meta: { title: '门店列表' }
                },
                {
                    path: '/newStore',
                    component: resolve => require(['../components/page/shopList/newStore.vue'], resolve),
                    meta: { title: '新增门店' }
                },
                {
                    path: '/columnManagement',
                    component: resolve => require(['../components/page/columnManagement/ColumnManagement.vue'], resolve),
                    meta: { title: '栏目管理' }    
                },
                {
                    path: '/columnManagementList',
                    component: resolve => require(['../components/page/columnManagement/index.vue'], resolve),
                    meta: { title: '栏目管理列表' }    
                },
                {
                    path: '/hotManagement',
                    component: resolve => require(['../components/page/hotManagement.vue'], resolve),
                    meta: { title: '热搜词管理' }   
                },
                {
                    path: '/goodsList',
                    component: resolve => require(['../components/page/goodsList/index.vue'], resolve),
                    meta: { title: '商品列表' },
                },
                {
                    path: '/brandManagement',
                    component: resolve => require(['../components/page/brandManagement/index.vue'], resolve),
                    meta: { title: '品牌管理' }
                },
                {
                    path: '/addBrand',
                    component: resolve => require(['../components/page/brandManagement/addBrand.vue'], resolve),
                    meta: { title: '新增品牌' }
                },
                {
                    path: '/newgoods',
                    component: resolve => require(['../components/page/goodsList/newgoods.vue'], resolve),
                    meta: { title: '新增商品' }
                },
                {
                    path: '/productDetail',
                    component: resolve => require(['../components/page/goodsList/productDetail.vue'], resolve),
                    meta: { title: '商品详情' }
                },
                {
                    path: '/changeProductDetail',
                    component: resolve => require(['../components/page/goodsList/changeProductDetail.vue'], resolve),
                    meta: { title: '修改商品' }
                },
                {
                    path: '/List',
                    component: resolve => require(['../components/page/List.vue'], resolve),
                    meta: { title: '类目列表' }
                },
                {
                    path: '/priceList',
                    component: resolve => require(['../components/page/priceList'], resolve),
                    meta: { title: '价格审核列表' }
                },
                {
                    path: '/detail',
                    component: resolve => require(['../components/page/priceList/detail.vue'], resolve),
                    meta: { title: '价格变更记录详情' }
                },
                {
                    path: '/priceChange',
                    component: resolve => require(['../components/page/priceChange.vue'], resolve),
                    meta: { title: '价格变更列表' }
                },
                {
                    path: '/couponList',
                    component: resolve => require(['../components/page/couponList/index.vue'], resolve),
                    meta: { title: '优惠券列表' }
                },
                {
                    path: '/addCouponActivity',
                    component: resolve => require(['../components/page/couponList/addCouponActivity.vue'], resolve),
                    meta: { title: '领券活动主表添加' }
                },
                {
                    path: '/changeCouponActivity',
                    component: resolve => require(['../components/page/couponList/changeCouponActivity.vue'], resolve),
                    meta: { title: '领券活动主表修改' }
                },
                {
                    path: '/MemberGiftTokenGiveOutDetailListGetFromGiftTokenGiveOutMasterID',
                    component: resolve => require(['../components/page/couponList/MemberGiftTokenGiveOutDetailListGetFromGiftTokenGiveOutMasterID.vue'], resolve),
                    meta: { title: '领券活动明细' }
                },
                {
                    path: '/giftList',
                    component: resolve => require(['../components/page/giftList/index.vue'], resolve),
                    meta: { title: '礼品卡列表' }
                },
                {
                    path: '/giftDetail',
                    component: resolve => require(['../components/page/giftList/giftDetail.vue'], resolve),
                    meta: { title: '礼品卡明细' }
                },
                {
                    path: '/activeList',
                    component: resolve => require(['../components/page/activeList.vue'], resolve),
                    meta: { title: '活动列表' }
                },
                {
                    path: '/orderList',
                    component: resolve => require(['../components/page/orderList/index.vue'], resolve),
                    meta: { title: '订单列表' }
                },
                {
                    path: '/orderDetail',
                    component: resolve => require(['../components/page/orderList/orderDetail.vue'], resolve),
                    meta: { title: '订单详情' }
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
/* router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
      next();
    } else {
      let token = localStorage.getItem('Authorization');
   
      if (token === null || token === '') {
        next('/login');
      } else {
        next();
      }
    }
  }); */
  export default router;