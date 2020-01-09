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
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="开始时间"
                             @change="reset">
                        </el-date-picker>至
                        <el-date-picker
                            v-model="formInline.timeEnd"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="结束时间"
                             @change="reset">
                        </el-date-picker>
                    </el-form-item>
                        <!-- 支付时间 -->
                    <el-form-item>
                        <span>支付时间：</span>
                        <el-date-picker
                            v-model="formInline.paymentTimeBegin"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="开始时间"
                             @change="reset">
                        </el-date-picker>至
                        <el-date-picker
                            v-model="formInline.paymentTimeEnd"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
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
                        <el-button type="primary" @click="exportExcel">导出</el-button>
                    </el-form-item>
                </el-form>
                <el-table :data="listData.ModelList" border class="table" ref="multipleTable" highlight-current-row>            <!-- PayName -->
                    <el-table-column prop="ID" label="订单号" align=center fixed></el-table-column>
                    <el-table-column prop="OrderState" label="订单状态"  align=center></el-table-column>
                    <el-table-column label="是否废弃" align=center>
                        <template slot-scope="scope">
                            {{scope.row.DelFlag === 'N' ? '否' : '是'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="DeliveryType" label="分单结果" align=center></el-table-column>
                    <el-table-column prop="MainSupplier" label="主供应商" align=center></el-table-column>
                    <el-table-column prop="Supplier" label="供应商" align=center></el-table-column>
                    <el-table-column prop="ReceiveMan" label="收货人"  align=center></el-table-column>
                    <el-table-column prop="ReceiveMobile" label="收货人手机号" align=center></el-table-column>
                    <el-table-column prop="ReceiveAddr" label="收货地址" align=center width="183px"></el-table-column>
                    <el-table-column prop="ReceiverAddrID" label="收货地址编号" align=center></el-table-column>
                    <el-table-column prop="MemberID" label="会员号" align=center></el-table-column>
                    <el-table-column prop="CreateTime" label="下单时间"  align=center width="140px">
                        <template slot-scope="scope">
                            {{scope.row.CreateTime.substring(0,scope.row.CreateTime.length-4)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="PayName" label="支付方式名称"  align=center ></el-table-column>
                    <el-table-column prop="OrderPayID" label="支付单号" align=center></el-table-column>
                    <el-table-column prop="PayTime" label="支付时间" align=center></el-table-column>
                    <el-table-column prop="ReceiverType" label="收货方式类型" align=center>
                        <template slot-scope="scope">
                            {{scope.row.ReceiverType === 'S' ? '门店自提' : '送货到家'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="ProductPrice" label="订单商品金额"  align=center></el-table-column>
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
                    <!-- <el-table-column prop="PayName" label="支付方式名称" align=center></el-table-column> -->
                    <el-table-column prop="OutStockAddPrice" label="出库增加金额"  align=center></el-table-column>
                    <!-- <el-table-column prop="IsOutStockAddPricePay" label="出库增加金额是否支付"  align=center></el-table-column> -->
                    <!-- <el-table-column prop="ReceiverType" label="收货方式类型" align=center>
                        <template slot-scope="scope">   
                            {{scope.row.ReceiverType == 'S' ? '门店自提': '送货到家'}}
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="IsLinkPay" label="是否在线支付" align=center>
                        <template slot-scope="scope">
                            {{scope.row.IsLinkPay == 'Y' ? '是':'否'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="ExpressSendOKTime" label="门店确认送达时间" align=center></el-table-column>
                    <el-table-column label="操作" align="center" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-info" @click="detail(scope.$index,scope.row);goPage()">详情</el-button>
                            <el-button type="text" icon="el-icon-check" v-if="scope.row.ReceiverType == 'S'" @click="checked(scope.row)">自提确认</el-button>
                            <el-button type="text" icon="el-icon-edit" @click="printing(scope.row);show(scope.row)" v-if="(scope.row.OrderState == '出库' || scope.row.OrderState == '顾客收货') && scope.row.DeliveryType == '门店'">打印</el-button>        <!-- 打印出库单 -->
                            <el-button type="text" icon="el-icon-message" v-if="scope.row.DeliveryType == '门店' && (scope.row.OrderState == '出库' || scope.row.OrderState == '顾客收货') && scope.row.ExpressSendOKTime == null" @click="open(scope.row)">确认送达</el-button>
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
            
            <!-- 自提确认 -->
            <el-dialog title="自提确认" :visible.sync="editVisible2" width="50%">
                <el-form :inline="true" :model="checkedBox" class="demo-form-inline">
                    <el-form-item label="自提码">
                        <el-input v-model="checkedBox.SelfReceiveCode" placeholder="请输入自提码"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible2 = false">取 消</el-button>
                    <el-button type="primary" @click="PickupConfirm">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 打印出库单 -->
            <el-dialog title="出库单打印预览" :visible.sync="editVisible4" width="75%" :close-on-click-modal="false">
                <div ref="print" class="recordImg" id="printRecord">
                    <p style="font-size:18px;text-align:center;font-weight:900">利群网商购物出库单</p>
                    <div class="print-base">
                        <p class="base-item">
                            <span class="label">订单号：</span>
                            <span class="text">{{ this.order.orderNo || '' }}</span>
                        </p>
                        <p class="base-item">
                            <span class="label">支付方式：</span>
                            <span class="text">{{ this.order.payName || '' }}</span>
                        </p>
                        <p class="base-item">
                            <span class="label">指定送货时间：</span>
                            <span class="text">{{ this.order.appointtime || '' }}</span>
                        </p>
                        <p class="base-item">
                            <span class="label">收货人：</span>
                            <span class="text">{{ this.order.receiveMan || '' }}</span>
                        </p>
                        <p class="base-item">
                            <span class="label">手机号码：</span>
                            <span class="text">{{ this.order.receiveMobile || '' }}</span>
                        </p>
                        <p class="base-item">
                            <span class="label">收货人地址：</span>
                            <span class="text">{{ this.order.receiveAddr || '' }}</span>
                        </p>
                        <p class="base-item">
                            <span class="label">备注：</span>
                            <span class="text">{{ this.order.remark || '' }}</span>
                        </p>
                    </div>
                    <table width="100%"  align="center" cellpadding="0" cellspacing="0"  style="border-collapse:collapse;" frame=void rules=rows >
                        <thead style="font-size:12px">
                            <tr style="font-size:12px">
                                <th colspan="1">序号</th>
                                <th colspan="1">商品编码</th>
                                <th colspan="1">商品名称</th>
                                <th colspan="1">出库数量</th>
                                <th colspan="1">单位</th>
                                <th colspan="1">优惠金额</th>
                                <th colspan="1">售价</th>
                                <th colspan="1">金额小计</th>
                            </tr>
                        </thead>
                        <tbody style="border-bottom:1px dashed #ddd;font-size:12px" >
                            <tr v-for="(item,index) in this.order.details" :key='item.ID'>
                                <td style="text-align:center;vertical-align:middle;">{{index+1}}</td>
                                <td style="text-align:center;vertical-align:middle;">{{item.incode}}</td>
                                <td style="text-align:center;vertical-align:middle;">{{item.productName}}</td>
                                <td style="text-align:center;vertical-align:middle;">{{item.realcount}}</td>
                                <td style="text-align:center;vertical-align:middle;">{{item.unitName}}</td>
                                <td style="text-align:center;vertical-align:middle;">{{item.discountMoney}}</td>
                                <td style="text-align:center;vertical-align:middle;">{{item.salePrice}}</td>
                                <td style="text-align:center;vertical-align:middle;">{{item.amount}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="display:flex; justify-content:space-around;border-top:1px dashed black;padding-top:10px">
                        <span>商品金额：{{this.order.productPrice}}</span>
                        <span>优惠券金额：{{this.order.giftTokenAmount}}</span>
                        <span>优惠金额：{{this.order.discountMoney}}</span>
                        <span>运费：{{this.order.sendFee}}</span>
                        <span>出库增加金额：{{this.order.outStockAddPrice}}</span>
                        <span>礼品卡金额：{{this.order.GiftCardAmount}}</span>
                        <span>积分金额：{{this.order.PointMoney}}</span>
                    </div>
                    <div style="display:flex; justify-content:space-around;padding-top:10px">
                        <span>合计金额：{{this.order.allPrice}}</span>
                        <span>应收：{{this.order.amount}}</span>
                        <!-- <span>出库返回金额：{{this.order.outStockBackPrice}}</span> -->
                        <span>支付金额：{{this.order.PayMoney}}</span>
                    </div>
                    <div style="display:flex; justify-content:space-around;margin-top:10px">
                        <span>打印时间:{{this.time}}</span>
                        <span>顾客签字：</span>
                    </div>
                    <div style="border-top:1px dashed black;margin-top:20px;padding-top:20px;display:flex;justify-content:space-between">
                        如果您对商品的品质和服务不满意，可拨打客服电话：4006888688；我们将认真对待并改正！
                        <svg id="barcode"></svg>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible4 = false">取 消</el-button>
                    <el-button type="primary" @click="PrintRow">确 定</el-button>
                </span>
            </el-dialog>
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
import { getOrderList,orderDetail,changePayMethod,changePayNum,OrderSelfReceiveConfirm,OrderDeliverySetPS,OrderFJPrintInfoGet,OrderOutPrintInfoGet,OrderMasterListExport,OrderSetExpressSendOK } from "@/api/orderList"
import qs from 'qs';
import { SupplierListGetByLevel } from '@/api/goodsList';
import JsBarcode from 'jsbarcode'
    export default{
        name:'orderList',
        data(){
            return{
                timestamp:'',       /* 当前时间戳 */
                time:'',            /* 转换完成后的时间 */
                form:'',
                editVisible:false,
                editVisible2:false,            /* 自提确认 */
                editVisible3:false, 
                editVisible4:false,             /* 出库单打印 */
                ID:'',                      /* 跳转详情时把 该条id存放与此 */
                currentPage: 1,            /* 当前页数 */
                currentSize:10,             /* 每页多少条数据 */
                state1: '',
                checkAll: false,        /* 复选框 */
                loading: false,     /* 是否有其他任务正在执行 */
                listData:[],        /* 存放列表数据 */
                printListData:[],       /* 打印数据 */
                DelFlag:'',
                DeliveryType:'',        /* 跳转详情时用 */
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
                timestamp:'',       /* 当前时间戳 */
                time:'',
                order:[],
                tableData:[],
                row:[]
            }
        },
        methods:{           
            // 订单列表 获取   点击搜索     
            getTableData () {                                                                       /* formInline.OrderState */
                let params = {
                    ID:this.formInline.orderNum.replace(/ /g,''),                    /* 订单号 */
                    MemberID:this.formInline.memberID.replace(/ /g,''),              /* 会员号 */
                    MainSupplierID:this.formInline.MainSupplierID,
                    SupplierID:this.formInline.SupplierID,
                    CreateTime:this.formInline.timeBegin,
                    EndTime:this.formInline.timeEnd,
                    PayBeginTime:this.formInline.paymentTimeBegin,
                    PayEndTIme:this.formInline.paymentTimeEnd,
                    ReceiveMobile:this.formInline.recipientMobile.replace(/ /g,''),     /* 收货人手机号 */
                    ReceiveMan:this.formInline.recipientName.replace(/ /g,''),          /* 收货人姓名 */
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
                this.DelFlag = row.DelFlag
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
                        DelFlag:this.DelFlag,
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
            checked(row){               /* 自提确认 */
                this.row = row
                this.editVisible2 = true 
            },
            PickupConfirm(){                    /* 自提确认按钮 */
                let params = {
                    ID:this.row.ID,
                    SelfReceiveCode:this.checkedBox.SelfReceiveCode
                }
                OrderSelfReceiveConfirm(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.editVisible2 = false
                        this.getTableData()
                        this.$message.success('自提确认成功')
                        this.checkedBox.SelfReceiveCode =''
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
            printing(row){              /* 点击打印获取到打印信息 */
                this.editVisible4 = true
                this.row = row
                let params = {
                    OrderID:row.ID
                }
                OrderOutPrintInfoGet(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.order = JSON.parse(res.data.Result)
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
            show(row){                                             /* 打印分拣单 */
                this.timestamp = Date.parse(new Date());
                this.time = this.disposeDate(this.timestamp)
                JsBarcode("#barcode", row.ID, {
                    format: "CODE128",  //条形码的格式
                    lineColor: "black",  //线条颜色
                    width:2, //线宽
                    height:30,  //条码高度
                    displayValue: true //是否显示文字信息
                });
            },
            PrintRow(){                               /* 打印 */
                this.$print(this.$refs.print) // 使用
            },
            exportExcel(){
                let params = {
                    ID:this.formInline.orderNum.replace(/ /g,''),                    /* 订单号 */
                    MemberID:this.formInline.memberID.replace(/ /g,''),              /* 会员号 */
                    MainSupplierID:this.formInline.MainSupplierID,
                    SupplierID:this.formInline.SupplierID,
                    CreateTime:this.formInline.timeBegin,
                    EndTime:this.formInline.timeEnd,
                    PayBeginTime:this.formInline.paymentTimeBegin,
                    PayEndTIme:this.formInline.paymentTimeEnd,
                    ReceiveMobile:this.formInline.recipientMobile.replace(/ /g,''),     /* 收货人手机号 */
                    ReceiveMan:this.formInline.recipientName.replace(/ /g,''),          /* 收货人姓名 */
                    ReceiveType:this.formInline.distributionValue,
                    DelFLag:this.formInline.DelFLag,
                    OrderState:this.formInline.OrderState,
                    DeliveryType:this.formInline.DeliveryType,
                }
                OrderMasterListExport(qs.stringify(params)).then((res)=>{
                    var blob = new Blob([res.data]); //application/vnd.openxmlformats-officedocument.wordprocessingml.document这里表示doc类型
                    var contentDisposition = res.headers["content-disposition"]; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
                    var patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
                    var result = patt.exec(contentDisposition);
                    console.log(result)
                    var filename = result[1];
                    if (window.navigator.msSaveOrOpenBlob) {
                        //兼容ie
                        navigator.msSaveBlob(blob, filename);
                    } else {
                        var downloadElement = document.createElement("a");
                        var href = window.URL.createObjectURL(blob); //创建下载的链接
                        var reg = /^["](.*)["]$/g;
                        downloadElement.style.display = "none";
                        downloadElement.href = href;
                        downloadElement.download = decodeURI(filename.replace(reg, "$1")); //下载后文件名
                        document.body.appendChild(downloadElement);
                        downloadElement.click(); //点击下载
                        document.body.removeChild(downloadElement); //下载完成移除元素
                        window.URL.revokeObjectURL(href); //释放掉blob对象
                    }
                }).catch(function(e){
                    console.log(e)
                })
            },
            open(row) {
                this.row = row
                console.log(row)
                this.$confirm('正在订单送达确认, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.OrderDelivery()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消确认'
                    });          
                });
            },
            OrderDelivery(){
                let params = {
                    ID:this.row.ID
                }
                OrderSetExpressSendOK(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('订单已确认送达')
                        this.getTableData()
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
            }
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