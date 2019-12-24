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
                        <el-form-item label="订单号" required>
                            <el-input
                                placeholder="请输入订单号"
                                v-model="formInline.orderNum"
                                clearable
                                @change="reset">
                            </el-input>
                        </el-form-item>
                        <!-- 活动类型 -->
                        <el-form-item label="会员号" required>
                            <!-- 会员号 -->
                            <el-input
                                placeholder="会员号"
                                v-model="formInline.memberID"
                                clearable
                                @change="reset">
                            </el-input>
                        </el-form-item>
                        <!-- 主供应商号 -->
                        <el-form-item label="主供应商号">
                            <el-select v-model="formInline.MainSupplierID" placeholder="主供应商" clearable filterable @change="getSupplier">
                                <el-option
                                v-for="item in formInline.option1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 供应商号 -->
                        <el-form-item label="供应商">
                            <el-select v-model="formInline.SupplierID" placeholder="供应商" clearable filterable @change="reset">
                                <el-option
                                v-for="item in formInline.option2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 收货人姓名 -->
                        <el-form-item label="收件人姓名">
                            <el-input
                                placeholder="收件人姓名"
                                v-model="formInline.recipientName"
                                @change="reset"
                                clearable>
                            </el-input>
                        </el-form-item>
                        <!-- 收件人手机号 -->
                        <el-form-item label="收货人手机号">
                            <el-input
                                placeholder="收件人手机号"
                                v-model="formInline.recipientMobile"
                                @change="reset"
                                clearable>
                            </el-input>
                        </el-form-item>
                        <!-- 配送方式 -->
                        <el-form-item label="配送方式">
                            <el-select v-model="formInline.distributionValue" clearable placeholder="配送方式" @change="reset">
                                <el-option
                                v-for="item in formInline.distribution"
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
                            v-model="formInline.timeBegin"
                            type="date"
                            placeholder="开始时间"
                             @change="reset">
                        </el-date-picker>至
                        <el-date-picker
                            v-model="formInline.timeEnd"
                            type="date"
                            placeholder="结束时间"
                             @change="reset">
                        </el-date-picker>
                    </el-form-item>
                        <!-- 支付时间 -->
                    <el-form-item>
                        <span>支付时间：</span>
                        <el-date-picker
                            v-model="formInline.paymentTimeBegin"
                            type="date"
                            placeholder="开始时间"
                             @change="reset">
                        </el-date-picker>至
                        <el-date-picker
                            v-model="formInline.paymentTimeEnd"
                            type="date"
                            placeholder="结束时间"
                             @change="reset">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="是否废弃">
                        <el-select v-model="formInline.DelFLag" clearable placeholder="请选择" @change="reset">
                            <el-option value="Y" label="是"></el-option>
                            <el-option value="N" label="否"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="订单状态">
                        <el-select v-model="formInline.OrderState" clearable placeholder="请选择" @change="reset">
                            <el-option
                            v-for="item in formInline.OrderStateList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="分单类型">
                        <el-select v-model="formInline.DeliveryType" clearable placeholder="请选择" @change="reset">
                            <el-option
                            v-for="item in formInline.DeliveryTypeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getTableData">搜索</el-button>
                        <el-button type="primary" @click="clear">重置</el-button>
                    </el-form-item>
                </el-form>
                <el-table :data="listData.ModelList" border class="table" ref="multipleTable" highlight-current-row>            <!-- PayName -->
                    <el-table-column prop="ID" label="订单号" align=center fixed></el-table-column>
                    <el-table-column prop="OrderState" label="订单状态"  align=center></el-table-column>
                    <el-table-column prop="DeliveryType" label="分单结果" align=center></el-table-column>
                    <el-table-column prop="MainSupplier" label="主供应商" align=center></el-table-column>
                    <el-table-column prop="Supplier" label="供应商" align=center></el-table-column>
                    <el-table-column prop="ReceiveAddr" label="收货地址" align=center width="183px"></el-table-column>
                    <el-table-column prop="ReceiveMan" label="收货人"  align=center></el-table-column>
                    <el-table-column prop="ReceiveMobile" label="收货人手机号" align=center></el-table-column>
                    <el-table-column prop="CreateTime" label="下单时间"  align=center width="140px">
                        <template slot-scope="scope">
                            {{scope.row.CreateTime.substring(0,scope.row.CreateTime.length-4)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="PayName" label="支付方式名称"  align=center ></el-table-column>
                    <el-table-column label="收货方式类型" align=center>
                        <template slot-scope="scope">
                            {{scope.row.ReceiverType === 'S' ? '门店自提' : '送货到家'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="ProductPrice" label="订单商品金额"  align=center></el-table-column>
                    <el-table-column label="是否废弃" align=center>
                        <template slot-scope="scope">
                            {{scope.row.DelFlag === 'N' ? '否' : '是'}}
                        </template>
                    </el-table-column>
                    <el-table-column label="出库增加金额是否支付" align=center>
                        <template slot-scope="scope">
                            {{scope.row.IsOutStockAddPricePay === 'Y' ? '是' : '否'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="SendFee" label="运费" align=center></el-table-column>
                    <el-table-column prop="GiftCardAmount" label="礼品卡使用金额"  align=center></el-table-column>
                    <el-table-column prop="GiftTokenAmount" label="优惠券使用金额"  align=center></el-table-column>
                    <el-table-column prop="PointMoney" label="积分金额" align=center></el-table-column>
                    <el-table-column prop="PayMoney" label="在线支付金额"  align=center></el-table-column>
                    <el-table-column prop="DiscountMoney" label="优惠金额"  align=center></el-table-column>
                    <el-table-column prop="PayTime" label="支付时间" align=center>
                        
                    </el-table-column>
                    <el-table-column prop="OutStockAddPrice" label="出库增加金额"  align=center></el-table-column>
                    <el-table-column label="操作" align="center" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-info" @click="detail(scope.$index,scope.row);goPage()">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="this.currentPage"
                    :page-size="this.currentSize"
                    style="text-align:right"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="this.listData.TotalCount">
                </el-pagination>
            </el-card>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    #printRecord{
        font-family: '宋体';
        font-size: 13px!important;
            .print-base{
                padding: 0 10px;
                display: flex;
                flex-flow: row wrap;
                align-items: center;
                align-content: center;
                justify-content: space-between;
                text-align: center;
                > * { margin: 0; min-width: 28%; height: 25px; text-align: left; }
                .base-item{
                    display:inline-block;
                    min-width: 15%;
                    // float: left;
                    height: 30px;
                    margin-right: 30px;
                    height:auto!important;
                    span{
                        font-size:12px
                    }
                }
            }
        .el-table{
            .el-table__body-wrapper,.is-scrolling-none{
                .el-table__body{
                    tbody{
                        .el-table__row{
                            td{
                                margin:0;
                                padding:0
                            }
                        }
                    }
                }
            }
        }
    }
</style>
<script>
import { getOrderList,orderDetail,changePayMethod,changePayNum,OrderSelfReceiveConfirm,OrderDeliverySetPS,OrderFJPrintInfoGet } from "@/api/orderList"
import qs from 'qs';
import { SupplierListGetByLevel } from '@/api/goodsList';
import JsBarcode from 'jsbarcode'
    export default{
        data(){
            return{
                timestamp:'',       /* 当前时间戳 */
                time:'',            /* 转换完成后的时间 */
                form:'',
                editVisible:false,
                editVisible2:false,            /* 自提确认 */
                editVisible3:false, 
                ID:'',                      /* 跳转详情时把 该条id存放与此 */
                currentPage: 1,            /* 当前页数 */
                currentSize:10,             /* 每页多少条数据 */
                state1: '',
                checkAll: false,        /* 复选框 */
                loading: false,     /* 是否有其他任务正在执行 */
                listData:[],        /* 存放列表数据 */
                printListData:[],       /* 打印数据 */
                DelFLag:'',
                formInline:{
                    option1:[],
                    option2:[],
                    orderNum:'',            /* 订单号 */
                    memberID:'',            /* 会员号 */
                    MainSupplierID:'',      /* 主供应商号 */
                    SupplierID:'',          /* 供应商号 */
                    recipientName:"",       /* 收件人姓名 */
                    recipientMobile:'',     /* 收件人手机号 */
                    DelFLag:'',         /* 是否废单 */
                    timeBegin: '',     /* 时间选择器（下单开始时间）的value */
                    timeEnd: '',     /* 时间选择器（下单开结束时间）的value */
                    paymentTimeBegin: '',     /* 时间选择器（支付开始时间）的value */
                    paymentTimeEnd: '',     /* 时间选择器（支付截止时间）的value */
                    OrderState:'',          /* 订单状态 */
                    OrderStateList:[
                        {
                            value:'N',
                            label:'新建',
                        },
                        {
                            value:'A',
                            label:'审核',
                        },
                        {
                            value:'O',
                            label:'出库',
                        },
                        {
                            value:'R',
                            label:'确认收货',
                        }
                    ],
                    DeliveryType:'',            /* 分单类型 */
                    DeliveryTypeList:[
                        {
                            value:'SH',
                            label:'纯门店'
                        },
                        {
                            value:'ST',
                            label:'纯仓库'
                        },
                        {
                            value:'CP',
                            label:'集货'
                        }

                    ],
                    distribution:[{
                        value:'选项1',
                        label:'送货上门',
                    },{
                        value:'选项2',
                        label:'门店自提'
                    }],
                    distributionValue:'',      /* 配送方式的value，也不能动哦 */
                    row:[],                     /* 自提确认和订单配送的暂存数据 */
                },
                checkedBox:{                /* 自提确认 */
                    SelfReceiveCode:"",         /* 自提码 */
                },
            }
        },
        methods:{           
            // 订单列表 获取   点击搜索     
            getTableData () {                                                                       /* formInline.OrderState */
                let params = {
                    ID:this.formInline.orderNum,
                    MemberID:this.formInline.memberID,
                    MainSupplierID:this.formInline.MainSupplierID,
                    SupplierID:this.formInline.SupplierID,
                    CreateTime:this.formInline.timeBegin,
                    EndTime:this.formInline.timeEnd,
                    PayBeginTime:this.formInline.paymentTimeBegin,
                    PayEndTIme:this.formInline.paymentTimeEnd,
                    ReceiveMobile:this.formInline.recipientMobile,
                    ReceiveMan:this.formInline.recipientName,
                    ReceiveType:this.formInline.distributionValue,
                    DelFLag:this.formInline.DelFLag,
                    OrderState:this.formInline.OrderState,
                    DeliveryType:this.formInline.DeliveryType,
                    PageIndex:this.currentPage,
                    PageSize:this.currentSize,
                }
                getOrderList(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.listData = JSON.parse(res.data.Result)
                        console.log(this.listData)
                    }
                    if(res.data.Success == 0){
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -998){
                        this.$message(res.data.Result)
                    }
                }).catch(function(e){
                    console.log(e)
                })
            },
            clear(){
                    this.formInline.orderNum = '',
                    this.formInline.memberID = '',
                    this.formInline.MainSupplierID = '',
                    this.formInline.SupplierID = '',
                    this.formInline.timeBegin = '',
                    this.formInline.timeEnd = '',
                    this.formInline.paymentTimeBegin = '',
                    this.formInline.paymentTimeEnd = '',
                    this.formInline.recipientMobile = '',
                    this.formInline.recipientName = '',
                    this.formInline.distributionValue = ''
            },
            reset(){
                this.currentPage = 1,
                this.currentSize = 10
            },
            detail(index,row){
                this.ID = row.ID;
                this.DelFLag = row.DelFLag
            },
            handleSizeChange(valSize) {
                this.currentSize = valSize;
                this.getTableData()
            },
            handleCurrentChange(valPage) {
                this.currentPage = valPage;
                this.getTableData()
            },
            goPage(id){
                this.$router.push({
                    path:'/orderDetail',
                    query:{
                        ID:this.ID,
                        DelFLag:this.DelFLag	
                    }
                })
            },
            PrintRow(index, row){
                this.$print(this.$refs.print) // 使用
            },
            disposeDate(dateTime) {
                var getTime = new Date(dateTime);
                dateTime = getTime.toLocaleString();
                return dateTime;
            },
            getMainSupplier(){
                let params = {
                    Level:1
                }
                SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.formInline.option1 = JSON.parse(res.data.Result)
                    }
                    if(res.data.Success == 0){
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -998){
                        this.$message(res.data.Result)
                    }
                }).catch(function(e){
                    console.log(e)
                })
            },
            getSupplier(){
                this.formInline.SupplierID = ''
                let params = {
                    Level:2,
                    MainSupplierID:this.formInline.MainSupplierID
                }
                SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.formInline.option2 = JSON.parse(res.data.Result)
                    }
                    if(res.data.Success == 0){
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -998){
                        this.$message(res.data.Result)
                    }
                }).catch(function(e){
                    console.log(e)
                })
            },
        },
        created(){
            this.getTableData();
            this.getMainSupplier()
            window.setInterval(() => {
                setTimeout(this.getMainSupplier(), 0)
            }, 600000)
        },
        mounted() {

        }
    }
</script>  