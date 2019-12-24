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
                        <span class="OrderState" style="color:red" v-if="scope.row.OrderState == 'A'">审核通过</span>
                        <span class="OrderState" style="color:green" v-if="scope.row.OrderState != 'A'">出库</span>
                    </template>
                </el-table-column>
                <el-table-column prop="MainSupplier" label="主供应商" align="center"></el-table-column>
                <el-table-column prop="Supplier" label="供应商" align="center"></el-table-column>
                <el-table-column prop="ReceiveMan" label="收货人" align="center"></el-table-column>
                <el-table-column prop="ReceiveMobile" label="收货人手机" align="center"></el-table-column>
                <el-table-column prop="CreateTime" label="订单创建时间" align="center">
                    <template slot-scope="scope">
                        {{scope.row.CreateTime.substring(0,scope.row.CreateTime.length-4)}}
                    </template>
                </el-table-column>
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
                <el-table-column prop="ReceiveAddr" label="收货地址" align="center" width="180px"></el-table-column>
                <el-table-column prop="ProductPrice" label="订单金额" align="center"></el-table-column>
                <el-table-column prop="SendFee" label="运费" align="center"></el-table-column>
                <el-table-column prop="GiftCardAmount" label="礼品卡金额" align="center"></el-table-column>
                <el-table-column prop="PointMoney" label="积分支付金额" align="center"></el-table-column>
                <el-table-column prop="PayMoney" label="已付金额" align="center"></el-table-column>
                <el-table-column label="操作" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="success" plain icon="el-icon-edit" v-if="scope.row.OrderState == 'A' && scope.row.OperatorState == 'NE'" @click="print(scope.$index, scope.row);show(scope.row)">打印</el-button>       <!-- 打印分拣单 -->
                        <el-button type="primary" icon="el-icon-edit" @click="editVisible = true;getDetail(scope.row)" v-if="scope.row.OperatorState == 'NE'">分拣</el-button>
                        <el-button type="primary" icon="el-icon-edit" @click="ReChecked(scope.row)" v-if="scope.row.OperatorState == 'FJ'">复核</el-button>
                        <el-button type="primary" plain icon="el-icon-edit" @click="printing(scope.row);show(scope.row)" v-if="(scope.row.OrderState == 'O' || scope.row.OrderState == 'A') && scope.row.DeliveryType == '门店' && scope.row.OperatorState == 'FH'">打印</el-button>        <!-- 打印出库单 -->
                        <el-button type="primary" v-if="scope.row.OperatorState == 'FH' && scope.row.ReceiverType != 'S' && scope.row.ReceiverType == 'O'" @click="Delivery(scope.row)">订单配送</el-button>
                        <el-button type="primary" icon="el-icon-check"  v-if="scope.row.ReceiverType == 'S' && scope.row.OrderState == 'O'" @click="checked(scope.row)">自提确认</el-button>
                        <el-button type="info" plain v-if="scope.row.OperatorState == 'FH' && scope.row.DeliveryType != '门店'" @click="focus(scope.row);show(scope.row)">打印</el-button><!-- 集货打印 -->
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
                        <el-input v-model="scope.row.OutInfo" @change="changeNum(scope.row)"></el-input><el-link type="danger" v-if="!scope.row.OutInfo">出库数量不得为空</el-link>
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
            <el-form :model="orderDelivery" class="demo-form-inline">
                <el-form-item label="配送类型">
                    <el-select v-model="orderDelivery.ExpressName" clearable placeholder="请选择">
                        <el-option label="恒通快递" value="恒通快递"></el-option>
                        <el-option label="门店自送" value="门店自送"></el-option>
                        <el-option label="其他快递" value="其他快递"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="其他快递" v-if="orderDelivery.ExpressName == '其他快递'">
                    <el-input v-model="orderDelivery.companyName" placeholder="请输入其他快递公司名称" style="width:80%"></el-input>
                </el-form-item>
                <el-form-item label="快递单号" v-if="orderDelivery.ExpressName == '恒通快递' || orderDelivery.ExpressName == '其他快递'">
                    <el-input v-model="orderDelivery.ExpressNo" placeholder="请输入快递单号" style="width:80%"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="DeliverConfirm">确 定</el-button>
            </span>
        </el-dialog>

        
        <!-- 自提确认 -->
        <el-dialog title="自提确认" :visible.sync="editVisible6" width="50%"  :close-on-click-modal="false">
            <el-form :inline="true" :model="checkedBox" class="demo-form-inline">
                <el-form-item label="自提码">
                    <el-input v-model="checkedBox.SelfReceiveCode" placeholder="请输入自提码"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible6 = false">取 消</el-button>
                <el-button type="primary" @click="PickupConfirm">确 定</el-button>
            </span>
        </el-dialog>
        
        
        <!-- 打印出库单 -->
        <el-dialog title="出库单打印预览" :visible.sync="editVisible2" width="75%" :close-on-click-modal="false">
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
                </div>
                <div style="display:flex; justify-content:space-around;padding-top:10px">
                    <span>合计金额：{{this.order.allPrice}}</span>
                    <span>应收：{{this.order.amount}}</span>
                    <span>已收金额：{{this.order.receivedAmount}}</span>
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
                <el-button @click="editVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="PrintRow">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 打印分拣单 -->
        <el-dialog title="分拣单打印预览" :visible.sync="editVisible5" width="76%" :close-on-click-modal="false">
            <div ref="print2" class="recordImg" id="printRecord">
                <p style="font-size:18px;text-align:center;font-weight:900">利群网商购物分拣单</p>
                <div class="print-base">
                    <p class="base-item">
                        <span class="label">订单号：</span>
                        <span class="text">{{ this.printListData.ID || '' }}</span>
                    </p>
                    <p class="base-item">
                        <span class="label">指定送货时间：</span>
                        <span class="text">{{ this.printListData.PlanReceiveTime || '' }}</span>
                    </p>
                    <p class="base-item">
                        <span class="label">支付方式：</span>
                        <span class="text">{{ this.printListData.payName || '' }}</span>
                    </p>
                    <p class="base-item">
                        <span class="label">收货人：</span>
                        <span class="text">{{ this.printListData.ReceiveMan || '' }}</span>
                    </p>
                    <p class="base-item">
                        <span class="label">手机号码：</span>
                        <span class="text">{{ this.printListData.ReceiveMobile || '' }}</span>
                    </p>
                    <p class="base-item">
                        <span class="label">备注：</span>
                        <span class="text">{{ this.printListData.remark || '' }}</span>
                    </p>
                    <p class="base-item">
                        <span class="label">收货地址：</span>
                        <span class="text">{{ this.printListData.receiveAddr || '' }}</span>
                    </p>
                </div>
                <table width="100%"  align="center" cellpadding="0" cellspacing="0"  style="border-collapse:collapse;" frame=void rules=rows >
                    <thead style="font-size:12px">
                        <tr>
                            <th colspan="1">序号</th>
                            <th colspan="1">商品编码</th>
                            <th colspan="1">商品名称</th>
                            <th colspan="1">数量</th>
                            <th colspan="1">单位</th>
                            <th colspan="1">会员价格</th>
                            <th colspan="1">优惠价格</th>
                            <th colspan="1">金额</th>
                        </tr>
                    </thead>
                    <tbody style="border-bottom:1px dashed black;font-size:12px">
                        <tr v-for="(item,index) in this.printListData.details" :key='item.ID' >
                            <td style="text-align:center;vertical-align:middle;">{{index+1}}</td>
                            <td style="text-align:center;vertical-align:middle;">{{item.ProductID}}</td>
                            <td style="text-align:center;vertical-align:middle;">{{item.ProductName}}</td>
                            <td style="text-align:center;vertical-align:middle;">{{item.Qty}}</td>
                            <td style="text-align:center;vertical-align:middle;">{{item.UnitName}}</td>
                            <td style="text-align:center;vertical-align:middle;">{{item.MemberPrice}}</td>
                            <td style="text-align:center;vertical-align:middle;">{{item.DiscountMoney}}</td>
                            <td style="text-align:center;vertical-align:middle;">{{item.Amount}}</td>
                        </tr>
                    </tbody>
                </table>
                <div style="display:flex; justify-content:space-around;padding-top:10px;border-top:1px dashed black">
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
                <el-button @click="editVisible5 = false">取 消</el-button>
                <el-button type="primary" @click="PrintRow2">确 定</el-button>
            </span>
        </el-dialog>

        
        <!-- 集货分拣单 -->
        <el-dialog title="集货打印预览" :visible.sync="editVisible7" width="76%" :close-on-click-modal="false">
            <div ref="print3" class="recordImg" id="printRecord">
                <p style="font-size:18px;text-align:center;font-weight:900">利群网商购物集货单</p>
                <div class="print-base">
                    <p class="base-item">
                        <span class="label">订单号：</span>
                        <span class="text">{{ this.concentrated.ID || '' }}</span>
                    </p>
                    <p class="base-item">
                        <span class="label">指定送货时间：</span>
                        <span class="text">{{ this.concentrated.PlanReceiveTime || '' }}</span>
                    </p>
                    <p class="base-item">
                        <span class="label">支付方式：</span>
                        <span class="text">{{ this.concentrated.payName || '' }}</span>
                    </p>
                    <p class="base-item">
                        <span class="label">收货人：</span>
                        <span class="text">{{ this.concentrated.ReceiveMan || '' }}</span>
                    </p>
                    <p class="base-item">
                        <span class="label">手机号码：</span>
                        <span class="text">{{ this.concentrated.ReceiveMobile || '' }}</span>
                    </p>
                    <p class="base-item">
                        <span class="label">收货地址：</span>
                        <span class="text">{{ this.concentrated.ReceiveAddr || '' }}</span>
                    </p>
                    <p class="base-item">
                        <span class="label">备注：</span>
                        <span class="text">{{ this.concentrated.MemberRemark || '' }}</span>
                    </p>
                </div>
                <table width="100%"  align="center" cellpadding="0" cellspacing="0"  style="border-collapse:collapse;" frame=void rules=rows >
                    <thead style="font-size:12px">
                        <tr>
                            <th colspan="1">序号</th>
                            <th colspan="1">商品编码</th>
                            <th colspan="1">商品名称</th>
                            <th colspan="1">数量</th>
                            <th colspan="1">出库数量</th>
                            <th colspan="1">单位</th>
                            <th colspan="1">会员价格</th>
                            <th colspan="1">优惠价格</th>
                            <th colspan="1">金额</th>
                        </tr>
                    </thead>
                    <tbody style="border-bottom:1px dashed black;font-size:12px">
                        <tr v-for="(item,index) in this.concentrated.details" :key='item.ID' >
                            <td style="text-align:center;vertical-align:middle;">{{index+1}}</td>
                            <td style="text-align:center;vertical-align:middle;">{{item.ProductID}}</td>
                            <td style="text-align:center;vertical-align:middle;">{{item.ProductName}}</td>
                            <td style="text-align:center;vertical-align:middle;">{{item.Qty}}</td>
                            <td style="text-align:center;vertical-align:middle;">{{item.RealQty}}</td>
                            <td style="text-align:center;vertical-align:middle;">{{item.UnitName}}</td>
                            <td style="text-align:center;vertical-align:middle;">{{item.MemberPrice}}</td>
                            <td style="text-align:center;vertical-align:middle;">{{item.DiscountMoney}}</td>
                            <td style="text-align:center;vertical-align:middle;">{{item.Amount}}</td>
                        </tr>
                    </tbody>
                </table>
                <div style="display:flex; justify-content:space-around;border-top:1px dashed black;padding-top:10px">
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
                <el-button @click="editVisible7 = false">取 消</el-button>
                <el-button type="primary" @click="PrintRow3">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { SupplierListGetByLevel } from "@/api/goodsList"
import { OrderMasterOutStockList,OrderDeliveryInfoGet,OrderDetailDelivery,OrderDeliveryOK,OrderOutPrintInfoGet,OrderDeliverySetPS,OrderDeliveryReFJ,OrderSelfReceiveConfirm,OrderFJPrintInfoGet,OrderJHPrintInfoGet } from '@/api/orderList'
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
                editVisible2:false,             /* 出库单 */
                editVisible3:false,            /* 订单配送 */
                editVisible4:false,             /* 复核 */
                editVisible5:false,             /* 打印分拣单 */
                editVisible6:false,             /* 自提 */
                editVisible7:false,            /* 集货弹出框 */
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
                    companyName:''
                },
                MakeSureReview:[],          /* 点击复核时，数据存放在这 */
                checkedBox:{                /* 自提确认 */
                    SelfReceiveCode:"",         /* 自提码 */
                },
                printListData:[],               /* 打印分拣单存储的数据 */
                concentrated:[],                /* 集货获取到的数据 */
            }
        },
        methods:{
            getData(){
                let params = {
                    BeginTime:this.formInline.BeginTime ? this.formInline.BeginTime : this.GetDateStr(-2),
                    EndTime:this.formInline.EndTime ? this.formInline.EndTime : this.GetDateStr(1),
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
                console.log(row)
                if(row.OutInfo){
                    this.product1.push({ID:row.ID,Qty:row.OutInfo})
                    this.product1.uniqBy(this.product1, 'ID')           /* 去重 */
                }else{
                    this.$message('出库数量不能为空')
                }
            },
            /* 1、当用户对出库数量做出修改之后 改为空时，会有文字提示：出库数量不得为空 */
            /* 2、当用户做出修改的数量与总数不相等时，会有message提示，并且不会提交 */
            /* 3、当用户多次对出库数量做出修改时，push到的数组会有多个重复对象，会取相同id的最后一个 */
            Outbound(){                                 /* 订单明细出库 */              
                if(this.product1.length != this.row.length){
                    this.$message('出库数量不得为空')
                }else{
                    this.product = JSON.stringify(this.product1)
                    let params = {
                        OrderID:this.ID,
                        OutInfo:this.product,
                    }
                    OrderDetailDelivery(qs.stringify(params)).then((res)=>{
                        if(res.data.Success == 1){
                            this.getData()
                            this.$message.success('提交成功')
                            this.editVisible = false
                            this.ID = ''
                            this.product1 = []
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
                        this.getData()
                        this.$message.success('复核成功')
                        this.editVisible4 = false
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
                        this.getData()
                        this.$message.success('复核驳回')
                        this.editVisible4 = false
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
                this.editVisible2 = true
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
            PrintRow(){                               /* 打印 */
                this.$print(this.$refs.print) // 使用
            },
            PrintRow2(){                               /* 打印 */
                this.$print(this.$refs.print2) // 使用
            },
            PrintRow3(){                               /* 打印 */
                this.$print(this.$refs.print3) // 使用
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
                    ExpressName:this.orderDelivery.ExpressName == '其他快递' ? this.orderDelivery.companyName : this.orderDelivery.ExpressName,
                    ExpressNo:this.orderDelivery.ExpressNo
                }
                OrderDeliverySetPS(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.editVisible3 = false
                        this.getData()
                        this.$message.Success('订单配送设置成功')
                        this.orderDelivery.ExpressName = ''
                        this.orderDelivery.ExpressNo = ''
                        this.orderDelivery.companyName = ''
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
            GetDateStr(AddDayCount) { 
                var dd = new Date();
                dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
                var y = dd.getFullYear(); 
                var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
                var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
                return y+"-"+m+"-"+d+' '+'00:00:00'; 
            },
            checked(row){
                this.row = row
                this.editVisible6 = true 
            },
            PickupConfirm(row){
                let params = {
                    ID:this.row.ID,
                    SelfReceiveCode:this.checkedBox.SelfReceiveCode
                }
                OrderSelfReceiveConfirm(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.editVisible6 = false
                        this.getData()
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
            print(index,row){               /* 打印分拣单 */
                console.log(row)
                this.printListData=[]
                this.editVisible5 = true;
                this.ID = row.ID;
                let params = {
                    OrderID:this.ID,
                }
                OrderFJPrintInfoGet(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.printListData = JSON.parse(res.data.Result)
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
            focus(row){              /* 集货打印 */
                this.editVisible7 = true;
                this.row = row
                let params = {
                    OrderID:row.ID
                }
                OrderJHPrintInfoGet(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.concentrated = JSON.parse(res.data.Result)
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
            this.getMainSupplier()
            this.getData()
        }
    }
</script>
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
    }
    .el-table{
        .OrderState{
            color:red
        }
    }
</style>