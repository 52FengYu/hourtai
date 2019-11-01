<template>
    <div class="orderList">
        <!-- 顶部的图标 -->
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 订单管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 下面的内容 -->
        <div class="container">
            <el-card class="box-card">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <!-- 订单号 -->
                        <el-form-item>
                            <el-input
                                placeholder="请输入订单号"
                                v-model="orderNum"
                                clearable>
                            </el-input>
                        </el-form-item>
                        <!-- 选择门店 -->
                        <el-form-item >
                            <el-row class="demo-autocomplete">
                                <el-col :span="12" style="width:100%">
                                    <el-autocomplete
                                    class="inline-input"
                                    v-model="state1"
                                    :fetch-suggestions="querySearch"
                                    placeholder="请选择门店"
                                    @select="handleSelect"
                                    style="width:100%"
                                    ></el-autocomplete>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <!-- 活动类型 -->
                        <el-form-item>
                            <el-select v-model="activeTypeValue" clearable placeholder="活动类型">
                                <el-option
                                v-for="item in activeType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 购买人姓名 -->
                        <el-form-item style="width:15vh">
                            <el-input
                                placeholder="购买人姓名"
                                v-model="buyerName"
                                clearable>
                            </el-input>
                        </el-form-item>
                        <!-- 购买人手机号 -->
                        <el-form-item>
                            <el-input
                                placeholder="购买人手机号"
                                v-model="buyerMobile"
                                clearable>
                            </el-input>
                        </el-form-item>
                        <!-- 收件人姓名 -->
                        <el-form-item>
                            <el-input
                                placeholder="收件人姓名"
                                v-model="recipientName"
                                clearable>
                            </el-input>
                        </el-form-item>
                        <!-- 收件人手机号 -->
                        <el-form-item>
                            <el-input
                                placeholder="收件人手机号"
                                v-model="recipientMobile"
                                clearable>
                            </el-input>
                        </el-form-item>
                        <!-- 配送方式 -->
                        <el-form-item>
                            <el-select v-model="distributionValue" clearable placeholder="配送方式">
                                <el-option
                                v-for="item in distribution"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 下单时间 -->
                    <el-form-item>
                        <span>下单时间：</span>
                        <el-date-picker
                            v-model="time"
                            type="datetimerange"
                            :picker-options="pickerOptions"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right">
                        </el-date-picker>
                    </el-form-item>
                        <!-- 支付时间 -->
                    <el-form-item>
                        <span>支付时间：</span>
                        <el-date-picker
                            v-model="paymentTime"
                            type="datetimerange"
                            :picker-options="paymentTime"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getDataBtn">搜索</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">重置</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">导出</el-button>
                    </el-form-item>
                </el-form>
                <div class="chackBox">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <div style="margin-right: 15px 0;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </el-card>
        </div>
    </div>
</template>
<style lang="scss">

</style>
<script>
    const cityOptions = ['待支付', '待分单', '待分配', '待集货','待分拣','待复核','待配送','待自提','取件中','配送中','已收货','已完成','已取消'];
    export default{
        data(){
            return{
                orderNum:'',
                state1: '',
                buyerName:"",        /* 购买人姓名 */
                buyerMobile:'',     /* 购买人手机号 */
                recipientName:"",       /* 收件人姓名 */
                recipientMobile:'',     /* 收件人手机号 */
                checkAll: false,
                checkedCities: ['待支付', '待分单', '待分配', '待集货','待分拣','待复核','待配送','待自提','取件中','配送中','已收货','已完成','已取消'],        /* 复选框相关 */
                cities: cityOptions,        /* 复选框相关 */
                isIndeterminate: true,      /* 复选框相关 */
                loading: false,     /* 是否有其他任务正在执行 */
                loadAll() {
                    return [
                        { "value": "利群商厦",},
                        { "value": "四方广场",},
                        { "value": "李沧国贸" },
                        { "value": "海琴广场" },
                        { "value": "前海广场" },
                        { "value": "城阳广场" },
                        { "value": "长江广场" },
                        { "value": "长江商厦" },
                        { "value": "黄岛瑞泰" },
                        { "value": "金海岸超市" },
                        { "value": "辛安超市" },
                        { "value": "即墨商厦" },
                        { "value": "即墨广场" },
                        { "value": "胶南中心" },
                        { "value": "胶南家乐城" },
                        { "value": "胶南超市" },
                        { "value": "威海利群" },
                        { "value": "淄博广场" },
                        { "value": "莲池广场" },
                        { "value": "蓬莱广场" },
                        { "value": "麦岛超市" },
                        { "value": "宇恒电器" },
                        { "value": "百惠商厦" },
                        { "value": "莱西广场" },
                        { "value": "莱西商厦" },
                        { "value": "胶州商厦" },
                        { "value": "胶州新城区利群" },
                        { "value": "胶州国贸" },
                        { "value": "日照广场" },
                        { "value": "日照瑞泰"},  
                        { "value": "诸城购物广场"},  
                        { "value": "平度国贸"},  
                        { "value": "平度购物"},  
                        { "value": "龙口国贸"},  
                        { "value": "莱州商厦"},  
                        { "value": "东营瑞泰"},  
                        { "value": "乳山利群"},  
                        { "value": "文登利群"},  
                        { "value": "沧口超市"},  
                        { "value": "胶南商厦"},  
                        { "value": "日照新区超市"},  
                        { "value": "金鼎广场"},  
                        { "value": "连云港广场"},  
                        { "value": "全球购"},  
                        { "value": "旅行社"},  
                        { "value": "便利店"},  
                        { "value": "诺德广场"},  
                        { "value": "池州店"},  
                        { "value": "芜湖店"},  
                        { "value": "淮安三店"},  
                        { "value": "海安店"},  
                        { "value": "启东店"},  
                        { "value": "南通开发区店"},  
                        { "value": "普陀店"},  
                        { "value": "沭阳一店"},  
                        { "value": "灌南店"},  
                        { "value": "连云港朝阳路店"},  
                        { "value": "靖江店"},  
                        { "value": "海陵店"},  
                        { "value": "迎春路店"},  
                        { "value": "扬州店"},  
                        { "value": "江都店"},  
                        { "value": "滕州二店"},  
                        { "value": "楚州店"},  
                        { "value": "工农路店"},  
                        { "value": "灌云店"},  
                        { "value": "新沂店"},  
                        { "value": "统一战线公益扶贫商城"},  
                        { "value": "盐城一店"},  
                        { "value": "盐城二店"},  
                        { "value": "响水店"},  
                        { "value": "沭阳二店"},  
                        { "value": "泗阳一店"},  
                        { "value": "泗洪一点"},  
                        { "value": "项王路店"},  
                        { "value": "宿迁店"},  
                        { "value": "淮安二店"},  
                        { "value": "金湖店"},  
                        { "value": "仪征店"},  
                        { "value": "滁州店"},  
                        { "value": "兴化店"},  
                        { "value": "海门店"},  
                        { "value": "无锡金城店"},  
                        { "value": "九州店"},  
                        { "value": "连云港二店"},  
                        { "value": "连云港一店"},  
                        { "value": "滨海店"},  
                        { "value": "江阴店"},  
                        { "value": "淄博柳泉路店"},  
                        { "value": "嘉瑞宝店"},  
                        { "value": "宿州店"},  
                        { "value": "叶挺路店"},  
                        { "value": "西城利群超市"},
                        { "value": "丹阳店"},
                        { "value": "东营利群超市"},
                        { "value": "青岛幸福互联企业管理有限公司"},
                        { "value": "利群鲜花"},
                    ];
                }, 
                 activeType: [{
                     value: '选项1',
                     label: '普通'
                     }, {
                     value: '选项2',
                     label: '团购'
                     }, {
                     value: '选项3',
                     label: '预售'
                     }],
                 activeTypeValue: '活动类型',    /* 活动类型的value，不能动哦 */
                 distribution:[{
                     value:'选项1',
                     label:'送货上门',
                 },{
                     value:'选项2',
                     label:'门店自提'
                 }],
                distributionValue:'配送方式',      /* 配送方式的value，也不能动哦 */
                pickerOptions: {        /* 下单时间 */
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                        }
                    }], 
                },
                time: '',     /* 时间选择器（下单时间）的value */
                /* 支付时间 */
                paymentTime: {        /* 下单时间 */
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                        }
                    }], 
                },
                paymentTime: '',     /* 时间选择器（支付时间）的value */
            }
        },
        methods:{
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            /* 复选框有关 */
            handleCheckAllChange(val) {     
                this.checkedCities = val ? cityOptions : [];
                this.isIndeterminate = false;
            },
            /* 复选框相关 */
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            },
            //搜索按钮查询
            getDataBtn() {
                this.pageIndex = 1;
                this.getTableData();
            },
            // 订单列表 获取
            getTableData () {
                if (this.loading) {
                    this.$message.info('正在处理中，请稍等...');
                    return;
                }
                this.loading = true;
                let queryParams = filterSpaceData(this.queryData);
                getOrderList({...{ pageNo: this.pageIndex, pageSize: this.pageSize },...queryParams})
                .then(response => {
                    this.loading = false;
                    this.tableData = response.data.list;
                    this.total = response.data.totalNum;
                }).catch(err => {
                    this.dealing = false;
                })
            },
        },
        mounted() {
            this.restaurants = this.loadAll();
        }
    }
</script>  