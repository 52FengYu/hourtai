<template>
    <div>
        <el-card>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="主供应商">
                    <el-select v-model="formInline.MainSupplierID" placeholder="主供应商" clearable filterable @change="getSupplier">
                        <el-option
                            v-for="item in formInline.option1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="供应商">
                    <el-select v-model="formInline.SupplierID" placeholder="供应商" clearable filterable  @change='reset'>
                        <el-option
                            v-for="item in formInline.option2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单号">
                    <el-input v-model="formInline.OrderID" placeholder="订单号" @change='reset'></el-input>
                </el-form-item>
                <el-form-item label="开始时间" required>
                    <el-date-picker
                        v-model="formInline.BeginTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" required>
                    <el-date-picker
                        v-model="formInline.EndTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="修改状态">
                    <el-select v-model="formInline.State" clearable  placeholder="请选择" @change='reset'>
                        <el-option label="未分配" value="NE"></el-option>
                        <el-option label="已分配任务" value="FP"></el-option>
                        <el-option label="分拣完成" value="FJ"></el-option>
                        <el-option label="已复核" value="FH"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getData">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData.ModelList" border style="width: 100%"  highlight-current-row>
                <el-table-column prop="ID" label="单号" align="center" fixed></el-table-column>
                <el-table-column prop="DeliveryType" label="出库类型" align="center"></el-table-column>
                <el-table-column prop="OrderState" label="订单状态" align="center">
                    <template slot-scope="scope">
                        {{scope.row.OrderState == 'A' ? "审核通过":"出库"}}
                    </template>
                </el-table-column>
                <el-table-column prop="MainSupplier" label="主供应商" align="center"></el-table-column>
                <el-table-column prop="Supplier" label="供应商" align="center"></el-table-column>
                <el-table-column prop="ReceiveMan" label="收货人" align="center"></el-table-column>
                <el-table-column prop="ReceiveMobile" label="收货人手机" align="center"></el-table-column>
                <el-table-column prop="CreateTime" label="订单创建时间" align="center"></el-table-column>
                <el-table-column prop="ReceiverType" label="收货方式类型" align="center">
                    <template slot-scope="scope">
                        {{scope.row.ReceiverType == 'S' ? "门店自提":"送货到家"}}
                    </template>
                </el-table-column>

                <el-table-column prop="OperatorState" label="操作状态" align="center">
                    <template slot-scope="scope">
                        {{scope.row.OperatorState == 'NE' ? "未分配":(scope.row.OperatorState == 'FP' ? "已分配任务":(scope.row.OperatorState == 'FJ' ? "分拣完成":(scope.row.OperatorState == 'FH' ? "已复核":(scope.row.OperatorState == 'FS' ? "已送出":""))))}}
                    </template>
                </el-table-column>
                <el-table-column prop="ReceiveAddr" label="收货地址" align="center"></el-table-column>
                <el-table-column prop="ProductPrice" label="订单金额" align="center"></el-table-column>
                <el-table-column prop="SendFee" label="运费" align="center"></el-table-column>
                <el-table-column prop="GiftCardAmount" label="礼品卡金额" align="center"></el-table-column>
                <el-table-column prop="PointMoney" label="积分支付金额" align="center"></el-table-column>
                <el-table-column prop="PayMoney" label="已付金额" align="center"></el-table-column>

                <el-table-column label="操作" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="editVisible = true;getDetail(scope.row)" v-if="scope.row.OperatorState == 'NE'">分拣</el-button>
                        <el-button type="primary" icon="el-icon-edit" @click="ReChecked(scope.row)" v-if="scope.row.OperatorState == 'FJ'">复核</el-button>
                        <el-button type="primary" icon="el-icon-edit" @click="printing(scope.row)" v-if="scope.row.OrderState == 'O' && scope.row.DeliveryType == '纯门店'">打印</el-button>
                        <el-button type="primary" v-if="scope.row.OperatorState == 'FH'" @click="Delivery(scope.row)">订单配送</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="PageIndex"
                :page-size= this.PageSize
                layout="total, sizes, prev, pager, next, jumper"
                align="right"
                :total= this.tableData.TotalCount>
            </el-pagination>
        </el-card>

        <!-- 待分拣弹出框 -->
        <el-dialog title="待分拣信息" :visible.sync="editVisible" width="50%" :close-on-click-modal="false">
            <el-table :data="row" stripe style="width: 100%">
                <el-table-column prop="ID" label="订单明细编号" width="180"></el-table-column>
                <el-table-column prop="ProductName" label="商品名称"></el-table-column>
                <el-table-column prop="Qty" label="下单数量"></el-table-column>
                <el-table-column prop="OutInfo" label="出库数量">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.OutInfo" @change="changeNum(scope.row)"></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="Outbound">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 复核弹出框 -->
        <el-dialog title="复核" :visible.sync="editVisible4" width="50%" :close-on-click-modal="false">
            <el-table :data="row" stripe style="width: 100%">
                <el-table-column prop="ID" label="订单明细编号" width="180"></el-table-column>
                <el-table-column prop="ProductName" label="商品名称"></el-table-column>
                <el-table-column prop="Qty" label="下单数量"></el-table-column>
                <el-table-column prop="RealQty" label="出库数量"></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="reject">驳回</el-button>
                <el-button type="primary" @click="Review">通过</el-button><!-- Review -->
            </span>
        </el-dialog>
        
        <!-- 订单配送 -->
        <el-dialog title="订单配送" :visible.sync="editVisible3" width="50%" :close-on-click-modal="false">
            <el-form :inline="true" :model="orderDelivery" class="demo-form-inline">
                <el-form-item label="快递名称">
                    <el-input v-model="orderDelivery.ExpressName" placeholder="请输入快递名称"></el-input>
                </el-form-item>
                <el-form-item label="快递单号">
                    <el-input v-model="orderDelivery.ExpressNo" placeholder="请输入快递单号"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="DeliverConfirm">确 定</el-button>
            </span>
        </el-dialog>

        
        <!-- 打印弹出框 -->
        <el-dialog title="打印预览" :visible.sync="editVisible2" width="75%" :close-on-click-modal="false">
            <div ref="print" class="recordImg" id="printRecord">
                <p style="font-size:18px;text-align:center;font-weight:900">利群网商购物出库单</p>
                <el-form ref="form" :model="order" label-width="120px" class="demo-form-inline" :inline="true" style="width:100%;text-align:left">
                    <el-form-item label="订单号">
                        <span>{{this.order.orderNo}}</span>
                    </el-form-item>
                    <el-form-item label="支付方式">
                        <span>{{this.order.payName}}</span>
                    </el-form-item>
                    <el-form-item label="指定送货时间">
                        <span>{{this.order.appointtime}}</span>
                    </el-form-item>
                    <el-form-item label="收货人">
                        <span>{{this.order.receiveMan}}</span>
                    </el-form-item>
                    <el-form-item label="收货人手机">
                        <span>{{this.order.receiveMobile}}</span>
                    </el-form-item>
                    <el-form-item label="备注">
                        <span>{{this.order.remark}}</span>
                    </el-form-item>
                    <el-form-item label="收货人地址">
                        <span>{{this.order.receiveAddr}}</span>
                    </el-form-item>
                </el-form>
                <el-table ref="singleTable" :data="this.order.details" highlight-current-row @current-change="handleCurrentChange" style="max-width: 750px">
                    <el-table-column type="index"></el-table-column>
                    <el-table-column property="incode" label="商品编码"></el-table-column>
                    <el-table-column property="productName" label="商品名称" width="100px"></el-table-column>
                    <el-table-column property="realcount" label="出库数量"></el-table-column>
                    <el-table-column property="unitName" label="单位" width="80px"></el-table-column>
                    <el-table-column property="discountMoney" label="优惠金额"></el-table-column>
                    <el-table-column property="salePrice" label="售价" width="80px"></el-table-column>
                    <el-table-column property="amount" label="金额小计" width="80px"></el-table-column>
                </el-table>
                <div style="display:flex; justify-content:space-around">
                    <span>商品金额：{{this.order.productPrice}}</span>
                    <span>优惠券金额：{{this.order.giftTokenAmount}}</span>
                    <span>优惠金额：{{this.order.discountMoney}}</span>
                    <span>运费：{{this.order.sendFee}}</span>
                    <span>出库增加金额：{{this.order.outStockAddPrice}}</span>
                    <span>合计金额：{{this.order.allPrice}}</span>
                    <span>应收：{{this.order.amount}}</span>
                    <span>已收金额：{{this.order.receivedAmount}}</span>
                </div>
                <p style="text-align:right;margin:10px 0">支付金额：{{this.order.PayMoney}}</p>
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
                <el-button @click="editVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="PrintRow()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { SupplierListGetByLevel } from "@/api/goodsList"
import { OrderMasterOutStockList,OrderDeliveryInfoGet,OrderDetailDelivery,OrderDeliveryOK,OrderOutPrintInfoGet,OrderDeliverySetPS,OrderDeliveryReFJ } from '@/api/orderList'
import qs from 'qs';
import JsBarcode from 'jsbarcode'
    export default{
        data(){
            return{
                formInline:{
                    BeginTime:'',           /* 开始时间 */
                    EndTime:'',             /* 结束时间 */
                    OrderID:'',             /* 订单号 */
                    PageIndex:'',           /* 当前页码 */
                    PageSize:'',            /* 每页数量 */
                    MainSupplierID:'',      /* 主供应商号 */
                    SupplierID:'',          /* 供应商号 */
                    option1:[],             /* 主供应商 */
                    option2:[],             /* 供应商 */
                    State:[],               /* 修改状态数组 */
                },
                PageIndex:1,
                PageSize:10,
                tableData:[],
                editVisible:false,          /* 获取分拣信息的弹窗 */
                editVisible2:false, 
                editVisible3:false,            /* 订单配送 */
                editVisible4:false,
                row:[],                     /* 点击分拣时的分拣信息都放在这 */
                product1:[],                 /* 用户修改出库数量 把数据都放在这 */
                product:'',                 /* 将product1数组转化为字符串 */
                ID:'',                       /* 点击分拣时，orderID存在这 */
                order:[],                    /* 点击打印的时候，打印信息放在这 */
                timestamp:'',       /* 当前时间戳 */
                time:'',
                orderDelivery:{
                    ExpressName:'',
                    ExpressNo:'',
                },
                MakeSureReview:[],          /* 点击复核时，数据存放在这 */
            }
        },
        methods:{
            getData(){
                let params = {
                    BeginTime:this.formInline.BeginTime,
                    EndTime:this.formInline.EndTime,
                    OrderID:this.formInline.OrderID,
                    PageIndex:this.PageIndex,
                    PageSize:this.PageSize,
                    MainSupplierID:this.formInline.MainSupplierID,
                    SupplierID:this.formInline.SupplierID,
                    State:this.formInline.State
                }
                OrderMasterOutStockList(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.tableData = JSON.parse(res.data.Result)
                        console.log(this.tableData)
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
            getDetail(row){
                // this.editVisible = true
                this.ID = row.ID
                let params = {
                   OrderID:row.ID
                }
                OrderDeliveryInfoGet(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.row = JSON.parse(res.data.Result)
                        console.log(row)
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
            changeNum(row){                             /* 待分拣信息修改之后触发这个方法 */
                this.product1.push({ID:row.ID,Qty:row.OutInfo})
                console.log(this.product1)
            },
            Outbound(){                                 /* 订单明细出库 */
                this.product = JSON.stringify(this.product1)
                let params = {
                   OrderID:this.ID,
                   OutInfo:this.product
                }
                OrderDetailDelivery(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('提交成功')
                        console.log(123)
                        this.editVisible = false
                        this.getData()
                        this.ID = ''
                        this.product1 = ''
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
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.PageSize = val
                this.getData()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.PageIndex = val
                this.getData()
            },
            reset(){
                this.PageIndex = 1,
                this.PageSize = 10
            },
            /* 复核 */          /* 当点击复核的时候要先调用 待分拣列表获取 接口 */
            Review(){ 
                this.editVisible4 = false 
                let params = {
                   OrderID:this.MakeSureReview.ID
                }
                OrderDeliveryOK(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('复核成功')
                        this.editVisible4 = false
                        this.getData()
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
            reject(){
                this.editVisible4 = false
                let params = {
                   OrderID:this.MakeSureReview.ID
                }
                OrderDeliveryReFJ(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('复核驳回')
                        this.editVisible4 = false
                        this.getData()
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
            ReChecked(row){
                this.editVisible4 = true
                this.MakeSureReview = row;
                this.getDetail(row)
                console.log(row)
            },
            printing(row){              /* 点击打印获取到打印信息 */
                this.row = row
                let params = {
                    OrderID:row.ID
                }
                OrderOutPrintInfoGet(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.editVisible2 = true
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
            show(row){
                this.timestamp = Date.parse(new Date());
                this.time = this.disposeDate(this.timestamp)
                JsBarcode("#barcode",row.ID, {
                    format: "CODE39",  //条形码的格式
                    lineColor: "black",  //线条颜色
                    width:1, //线宽
                    height:30,  //条码高度
                    displayValue: true //是否显示文字信息
                });
            },
            PrintRow(index, row){                               /* 打印 */
                this.$print(this.$refs.print) // 使用
            },
            disposeDate(dateTime) {
                var getTime = new Date(dateTime);
                dateTime = getTime.toLocaleString();
                return dateTime;
            },
            Delivery(row){
                this.row = row
                this.editVisible3 = true
            },
            DeliverConfirm(){                   /* 订单配送 */
                let params = {
                    OrderID:this.row.ID,
                    ExpressName:this.orderDelivery.ExpressName,
                    ExpressNo:this.orderDelivery.ExpressNo
                }
                OrderDeliverySetPS(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.editVisible2 = false
                        this.getTableData()
                        this.$message.Success('订单配送设置成功')
                        this.orderDelivery.ExpressName = ''
                        this.orderDelivery.ExpressNo = ''
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
            this.getMainSupplier()
        }
    }
</script>
<style lang="scss" scoped>

</style>