<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-user-solid',
                        index: '0',
                        title: '用户管理',
                        subs: [
                            {
                                index: 'useManagement',
                                title: '用户列表'
                            },
                            {
                                index: 'permissionList',
                                title: '权限列表'
                            },
                            {
                                index: 'roleList',
                                title: '角色列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-more',
                        index: '1',
                        title: '会员管理',
                        subs:[
                            {
                                index:'membershipList',
                                title:'会员列表'
                            },
                            {
                                index:'memberReg',
                                title:'会员注册数统计'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-s-home',
                        index: '2',
                        title: '门店管理',
                        subs:[
                            {
                                index:'shopList',
                                title:'门店列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-s-goods',
                        index: '3',
                        title: '商城管理',
                        subs: [
                            {
                                index: 'columnManagementList',
                                title: '栏目管理'
                            },
                            {
                                index: 'hotManagement',
                                title: '热搜词管理'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-pie-chart',
                        index: '4',
                        title: '商品管理',
                        subs:[
                            {
                                index:'goodsList',
                                title:'商品列表'
                            },
                            {
                                index:'brandManagement',
                                title:'品牌管理'
                            },
                            {
                                index:'List',
                                title:'类目列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-rank',
                        index: '5',
                        title: '价格管理',
                        subs: [
                            {
                                index: 'priceList',
                                title: '价格审核列表',
                            },
                            {
                                index: 'priceChange',
                                title: '价格变更列表',
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-s-ticket',
                        index: '6',
                        title: '促销管理',
                        subs:[
                            {
                                index:'couponList',
                                title:'优惠券列表',
                            },
                            {
                                index:'giftList',
                                title:'礼品卡列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-document',
                        index: '7',
                        title: '活动管理',
                        subs: [
                            {
                                index: 'activeList',
                                title: '活动列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-paperclip',
                        index: '8',
                        title: '订单管理',
                        subs: [
                            {
                                index: 'orderList',
                                title: '订单列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-s-tools',
                        index: '9',
                        title: '权限管理',
                        subs: [
                            {
                                index: 'application',
                                title: '应用'
                            },
                            {
                                index: 'section',
                                title: '部门'
                            },
                            {
                                index: 'users',
                                title: '用户'
                            },
                            {
                                index: 'role',
                                title: '角色'
                            },
                            {
                                index:'authority',
                                title:'权限列表'
                            }
                        ]
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
