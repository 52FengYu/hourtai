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
                                v-model="formInline.orderNum"
                                clearable>
                            </el-input>
                        </el-form-item>
                        <!-- 选择门店 -->
                        <!-- <el-form-item >
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
                        </el-form-item> -->
                        <!-- 活动类型 -->
                        <el-form-item>
                            <!-- <el-select v-model="activeTypeValue" clearable placeholder="活动类型">
                                <el-option
                                v-for="item in activeType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select> -->
                            <!-- 会员号 -->
                            <el-input
                                placeholder="会员号"
                                v-model="formInline.memberID"
                                clearable>
                            </el-input>
                        </el-form-item>
                        <!-- 主供应商号 -->
                        <el-form-item>
                            <el-input
                                placeholder="主供应商号"
                                v-model="formInline.MainSupplierID"
                                clearable>
                            </el-input>
                        </el-form-item>
                        <!-- 供应商号 -->
                        <el-form-item>
                            <el-input
                                placeholder="供应商号"
                                v-model="formInline.SupplierID"
                                clearable>
                            </el-input>
                        </el-form-item>
                        <!-- 购买人姓名 -->
                        <!-- <el-form-item style="width:15vh">
                            <el-input
                                placeholder="收货人姓名"
                                v-model="buyerName"
                                clearable>
                            </el-input>
                        </el-form-item> -->
                        <!-- 购买人手机号 -->
                        <!-- <el-form-item>
                            <el-input
                                placeholder="收货人手机号"
                                v-model="buyerMobile"
                                clearable>
                            </el-input>
                        </el-form-item> -->
                        <!-- 收货人姓名 -->
                        <el-form-item>
                            <el-input
                                placeholder="收件人姓名"
                                v-model="formInline.recipientName"
                                clearable>
                            </el-input>
                        </el-form-item>
                        <!-- 收件人手机号 -->
                        <el-form-item>
                            <el-input
                                placeholder="收件人手机号"
                                v-model="formInline.recipientMobile"
                                clearable>
                            </el-input>
                        </el-form-item>
                        <!-- 配送方式 -->
                        <el-form-item>
                            <el-select v-model="formInline.distributionValue" clearable placeholder="配送方式">
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
                            placeholder="开始时间">
                        </el-date-picker>至
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker
                            v-model="formInline.timeEnd"
                            type="date"
                            placeholder="结束时间">
                        </el-date-picker>
                    </el-form-item>
                        <!-- 支付时间 -->
                    <el-form-item>
                        <span>支付时间：</span>
                        <el-date-picker
                            v-model="formInline.paymentTimeBegin"
                            type="date"
                            placeholder="开始时间">
                        </el-date-picker>至
                    </el-form-item>
                    <el-form-item>
                            <el-date-picker
                                v-model="formInline.paymentTimeEnd"
                                type="date"
                                placeholder="结束时间">
                            </el-date-picker>
                    </el-form-item>
                    <el-form-item label="是否废弃">
                        <el-switch v-model="formInline.DelFLag"></el-switch>
                    </el-form-item>
                    <el-form-item label="订单状态">

                    </el-form-item>
                    <el-form-item label="分单类型">

                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getTableData">搜索</el-button>
                        <el-button type="primary" @click="clear">重置</el-button>
                        <el-button type="primary" :disabled="true">导出</el-button>
                    </el-form-item>
                </el-form>
                <!-- <div class="chackBox">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <div style="margin-right: 15px 0;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </div> -->
                <el-table :data="listData.ModelList" border class="table" ref="multipleTable">
                    <el-table-column prop="ID" label="订单号"  width="80" align=center></el-table-column>
                    <el-table-column prop="DeliveryType" label="分单结果" width="120" align=center></el-table-column>
                    <el-table-column prop="OrderState" label="订单状态"  align=center></el-table-column>
                    <el-table-column prop="orderStatus" label="订单状态"  width="150" align=center></el-table-column>
                    <el-table-column prop="MainSupplier" label="主供应商" width="120" align=center></el-table-column>
                    <el-table-column prop="Supplier" label="供应商" width="150" align=center></el-table-column>
                    <el-table-column prop="ReceiveMan" label="收货人"  width="150" align=center></el-table-column>
                    <el-table-column prop="ReceiveMobile" label="收货人手机号" width="180" align=center></el-table-column>
                    <el-table-column prop="CreateTime" label="下单时间"  align=center width="200"></el-table-column>
                    <el-table-column prop="ProductPrice" label="订单商品金额"  width="150" align=center></el-table-column>
                    <el-table-column prop="SendFee" label="运费" width="120" align=center></el-table-column>
                    <el-table-column prop="GiftCardAmount" label="礼品卡使用金额"  align=center></el-table-column>
                    <el-table-column prop="GiftTokenAmount" label="优惠券使用金额"  width="150" align=center></el-table-column>
                    <el-table-column prop="PointMoney" label="积分金额" width="120" align=center></el-table-column>
                    <el-table-column prop="PayMoney" label="在线支付金额"  align=center></el-table-column>
                    <el-table-column prop="DiscountMoney" label="优惠金额"  width="150" align=center></el-table-column>
                    <el-table-column prop="PayTime" label="支付时间" width="180" align=center></el-table-column>
                    <el-table-column prop="OutStockAddPrice" label="出库增加金额"  align=center></el-table-column>
                    <el-table-column prop="IsOutStockAddPricePay" label="出库增加金额是否支付" width="180" align=center></el-table-column>
                    <el-table-column label="操作" width="180" align="center" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-edit" @click="print(scope.$index, scope.row);show()">打印</el-button>
                            <el-button type="text" icon="el-icon-edit" @click="detail(scope.$index,scope.row);goPage()">详情</el-button>
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

        
        <!-- 打印弹出框 -->
        <el-dialog title="打印预览" :visible.sync="editVisible" width="75%">
            <div ref="print" class="recordImg" id="printRecord">
                <p style="font-size:18px;text-align:center;font-weight:900">利群网商购物送货单</p>
                <el-form ref="form" :model="form" label-width="90px" class="demo-form-inline" :inline="true" style="width:100%;text-align:left">
                    <el-form-item label="订单号">
                        <span>{{this.printListData.ID}}</span>
                    </el-form-item>
                    <el-form-item label="支付时间">
                        <span>{{this.printListData.PayTime}}</span>
                    </el-form-item>
                    <el-form-item label="支付方式">
                        <span>{{this.printListData.PayType}}</span>
                    </el-form-item>
                    <el-form-item label="收货人">
                        <span>{{this.printListData.ReceiveMan}}</span>
                    </el-form-item>
                    <el-form-item label="收货人手机">
                        <span>{{this.printListData.ReceiveMobile}}</span>
                    </el-form-item>
                    <el-form-item label="备注">
                        <span>{{this.printListData.MemberRemark}}</span>
                    </el-form-item>
                    <template v-if="this.printListData.ReceiverType === '送货上门'">
                        <el-form-item label="预约配送">
                            <span>{{this.printListData.PlanReceiveTime}}</span>
                        </el-form-item>
                        <el-form-item label="收货人地址">
                        </el-form-item>
                        <el-form-item>
                            <span>{{this.printListData.ReceiveAddr}}</span>
                        </el-form-item>
                    </template>
                    <template v-if="this.printListData.ReceiverType === '到店自提'">
                        <el-form-item label="提货时间">
                            <span>{{this.printListData.PlanReceiveTime}}</span>
                        </el-form-item>
                    </template>
                </el-form>
                <el-table ref="singleTable" :data="this.printListData.Detail" highlight-current-row @current-change="handleCurrentChange" style="max-width: 750px">
                    <el-table-column type="index"></el-table-column>
                    <el-table-column property="ProductID" label="商品编码"></el-table-column>
                    <el-table-column property="ShopCode" label="门店码" width="100px"></el-table-column>
                    <el-table-column property="ProductName" label="商品名称"></el-table-column>
                    <el-table-column property="Qty" label="数量" width="80px"></el-table-column>
                    <el-table-column property="MemberPrice" label="单价" width="80px"></el-table-column>
                    <el-table-column property="Amount" label="总价"></el-table-column>
                </el-table>
                <div style="display:flex; justify-content:space-around">
                    <span>商品金额：{{this.printListData.ProductPrice}}</span>
                    <span>运费：{{this.printListData.SendFee}}</span>
                    <span>优惠券：{{this.printListData.GiftTokenAmount}}</span>
                    <span>礼品卡：{{this.printListData.GiftCardAmount}}</span>
                    <span>积分：{{this.printListData.PointMoney}}</span>
                </div>
                <p style="text-align:right;margin:10px 0">支付金额：{{this.printListData.PayMoney}}</p>
                <div style="display:flex; justify-content:space-around">
                    <span>打印时间:{{this.time}}</span>
                    <span>拣货员：</span>
                    <span>复核员：</span>
                </div>
                <div style="border-top:1px dashed black;margin-top:20px;padding-top:20px;display:flex;justify-content:space-between">
                    如果您对商品的品质和服务不满意，可拨打客服电话：4006888688；我们将认真对待并改正！
                    <svg id="barcode"></svg>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="PrintRow()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<style lang="scss" scoped>
     .el-dialog__wrapper{
        .el-dialog{
            .el-dialog__body{
                border: 1px lightgreen dashed!important;
                .el-form{
                    border-bottom:1px dashed black;
                    .el-form-item{
                        margin:0!important;
                        padding:0!important;
                        width:30%;
                    }
                }
            }
        }
    }
</style>
<script>
import { getOrderList,orderDetail,changePayMethod,changePayNum } from "@/api/orderList"
import qs from 'qs';
import JsBarcode from 'jsbarcode'
    // const cityOptions = ['待支付', '待分单', '待分配', '待集货','待分拣','待复核','待配送','待自提','取件中','配送中','已收货','已完成','已取消'];
    export default{
        data(){
            return{
                timestamp:'',       /* 当前时间戳 */
                time:'',            /* 转换完成后的时间 */
                form:'',
                editVisible:false,
                ID:'',                      /* 跳转详情时把 该条id存放与此 */
                currentPage: 1,            /* 当前页数 */
                currentSize:10,             /* 每页多少条数据 */
                state1: '',
                checkAll: false,        /* 复选框 */
                // checkedCities: ['待支付', '待分单', '待分配', '待集货','待分拣','待复核','待配送','待自提','取件中','配送中','已收货','已完成','已取消'],        /* 复选框相关 */
                /* cities: cityOptions, */        /* 复选框相关 */
                // isIndeterminate: true,      /* 复选框相关 */
                loading: false,     /* 是否有其他任务正在执行 */
                listData:[],        /* 存放列表数据 */
                printListData:[],       /* 打印数据 */
               /*  loadAll() {
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
                },  */
                /*  activeType: [{
                     value: '选项1',
                     label: '普通'
                     }, {
                     value: '选项2',
                     label: '团购'
                     }, {
                     value: '选项3',
                     label: '预售'
                     }], */
                //  activeTypeValue: '活动类型',    /* 活动类型的value，不能动哦 */
                
                
                
                formInline:{
                    orderNum:'',            /* 订单号 */
                    memberID:'',            /* 会员号 */
                    MainSupplierID:'',      /* 主供应商号 */
                    SupplierID:'',          /* 供应商号 */
                    recipientName:"",       /* 收件人姓名 */
                    recipientMobile:'',     /* 收件人手机号 */
                    DelFLag:false,         /* 是否废单 */
                    timeBegin: '',     /* 时间选择器（下单开始时间）的value */
                    timeEnd: '',     /* 时间选择器（下单开结束时间）的value */
                    paymentTimeBegin: '',     /* 时间选择器（支付开始时间）的value */
                    paymentTimeEnd: '',     /* 时间选择器（支付截止时间）的value */
                    distribution:[{
                        value:'选项1',
                        label:'送货上门',
                    },{
                        value:'选项2',
                        label:'门店自提'
                    }],
                    distributionValue:'',      /* 配送方式的value，也不能动哦 */
                }
            }
        },
        methods:{
            // 选择门店相关
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            /* 复选框有关 */
            /* handleCheckAllChange(val) {     
                this.checkedCities = val ? cityOptions : [];
                this.isIndeterminate = false;
            }, */
            /* 复选框相关 */
            /* handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            }, */
            // 订单列表 获取   点击搜索
            getTableData () {
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
                    DelFLag:this.formInline.DelFLag == false ? "N" :"Y",
                   /*  OrderState:this,
                    DeliveryType:this, */
                    PageIndex:this.currentPage,
                    PageSize:this.currentSize,
                }
                getOrderList(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        console.log(JSON.parse(res.data.Result))
                        this.listData = JSON.parse(res.data.Result)
                    }
                    if(res.data.Success == 0){
                        console.log(res.data.Result)
                    }
                    if(res.data.Success == -999){
                        console.log("用户未登录")
                        console.log(res.data)
                        this.$message('修改失败');
                    }
                    if(res.data.Success == -998){
                        console.log("请求错误")
                    }
                }).catch(function(e){
                    console.log(e)
                    console.log('出错了')
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
            print(index,row){
                this.editVisible = true;
                this.ID = row.ID;
                let params = {
                    ID:this.ID,
                }
                orderDetail(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.printListData = JSON.parse(res.data.Result)
                        console.log(this.listData)
                    }
                    if(res.data.Success == 0){
                        console.log("数据请求失败，请重试")
                        console.log(res.data.Result)
                    }
                    if(res.data.Success == -999){
                        console.log("用户未登录")
                        console.log(res.data)
                    }
                    if(res.data.Success == -998){
                        console.log("请求错误")
                    }
                }).catch(function(e){
                    console.log(e)
                    console.log('出错了')
                })
            },
            show(){
                this.timestamp = Date.parse(new Date());
                this.time = this.disposeDate(this.timestamp)
                JsBarcode("#barcode", this.ID, {
                    format: "CODE39",  //条形码的格式
                    lineColor: "black",  //线条颜色
                    width:1, //线宽
                    height:30,  //条码高度
                    displayValue: true //是否显示文字信息
                });
            },
            detail(index,row){
                this.ID = row.ID;
            },
            handleSizeChange(valSize) {
                this.currentSize = valSize;
                console.log(`每页 ${valSize} 条`);
                this.getTableData()
            },
            handleCurrentChange(valPage) {
                this.currentPage = valPage;
                console.log(`当前页: ${valPage}`);
                this.getTableData()
            },
            goPage(id){
                this.$router.push({
                    path:'/orderDetail',
                    query:{
                        ID:this.ID
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
        },
        created(){
            this.getTableData();
        },
        mounted() {

        }
    }
</script>  