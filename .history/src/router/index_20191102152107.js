import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
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
                    component: resolve => require(['../components/page/ColumnManagement.vue'], resolve),
                    meta: { title: '栏目管理' }    
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
                    component: resolve => require(['../components/page/brandManagement.vue'], resolve),
                    meta: { title: '品牌管理' }
                },
                {
                    path: '/suit',
                    component: resolve => require(['../components/page/goodsList/suit.vue'], resolve),
                    meta: { title: '新增套装' }
                },
                {
                    path: '/cross',
                    component: resolve => require(['../components/page/goodsList/new_cross_goods.vue'], resolve),
                    meta: { title: '跨境商品发布' }
                },
                {
                    path: '/newgoods',
                    component: resolve => require(['../components/page/goodsList/newgoods.vue'], resolve),
                    meta: { title: '新增商品' }
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
                    component: resolve => require(['../components/page/couponList.vue'], resolve),
                    meta: { title: '优惠券列表' }
                },
                {
                    path: '/giftList',
                    component: resolve => require(['../components/page/giftList.vue'], resolve),
                    meta: { title: '礼品卡列表' }
                },
                {
                    path: '/activeList',
                    component: resolve => require(['../components/page/activeList.vue'], resolve),
                    meta: { title: '活动列表' }
                },
                {
                    path: '/orderList',
                    component: resolve => require(['../components/page/orderList.vue'], resolve),
                    meta: { title: '订单列表' }
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
