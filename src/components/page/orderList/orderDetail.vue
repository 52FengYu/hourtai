<template>
    <div>
        <el-card>
                <h4>订单详情</h4>
                <el-form ref="form" :model="form" label-width="170px"  align="left">
                    <el-form-item label="订单号">
                        <span>{{this.listData.ID}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <el-button type="primary" plain @click="show()">打印</el-button>
                    </el-form-item>
                    <el-form-item label="主供应商">
                        <span>{{this.listData.MainSupplierName}}</span>
                    </el-form-item>
                    <el-form-item label="供应商">
                        <span>{{this.listData.SupplierName}}</span>
                    </el-form-item>
                    <el-form-item label="配送方式">
                        <span>{{this.listData.ReceiverType}}</span>
                    </el-form-item>
                    <el-form-item label="订单状态">
                        <span style="color:red">{{this.listData.OrderState}}</span>
                    </el-form-item>
                    <el-form-item label="预计收货时间">
                        <span>{{this.listData.PlanReceiveTime}}</span>
                    </el-form-item>

                    <h6 style="margin-left:1%">收件人信息</h6>

                    <el-form-item label="收货人">
                        <span>{{this.listData.ReceiveMan}}</span>
                    </el-form-item>
                    <el-form-item label="收货人手机号">
                        <span>{{this.listData.ReceiveMobile}}</span>
                    </el-form-item>
                    <el-form-item label="收货人地址">
                        <span>{{this.listData.ReceiveAddr}}</span>
                    </el-form-item>
                    <el-form-item label="备注">
                        <span>{{this.listData.MemberRemark}}</span>
                    </el-form-item>
                    <el-form-item label="预计收货时间">
                        <span>{{this.listData.PlanReceiveTime}}</span>
                    </el-form-item>
                    <el-form-item label="支付方式">
                        <span>{{this.listData.PayType}}</span>
                            <el-button type="primary" @click="getPayMethods" v-if="this.listData.OrderState === '新建' && this.listData.PayTime === null && this.listData.DelFlag === 'N'">修改支付方式</el-button>
                    </el-form-item>
                    <h6 style="margin-left:1%">支付信息</h6>
                    <el-form-item label="商品金额">
                        <span>{{this.listData.ProductPrice}}</span>
                    </el-form-item>
                    <el-form-item label="运费">
                        <span>{{this.listData.SendFee}}</span>
                    </el-form-item>
                    <el-form-item label="礼品卡金额">
                        <span>{{this.listData.GiftCardAmount}}</span>
                    </el-form-item>
                    <el-form-item label="优惠券金额">
                        <span>{{this.listData.GiftTokenAmount}}</span>
                    </el-form-item>
                    <el-form-item label="积分">
                        <span>{{this.listData.PointMoney}}</span>
                    </el-form-item>
                    <el-form-item label="支付金额">
                        <span>{{this.listData.PayMoney}}</span>
                    </el-form-item>
                    <el-form-item label="优惠金额">
                        <span>{{this.listData.DiscountMoney}}</span>
                    </el-form-item>
                    <el-form-item label="支付时间">
                        <span>{{this.listData.PayTime}}</span>
                    </el-form-item>
                    <el-form-item label="出库增加金额">
                        <span>{{this.listData.OutStockAddPrice}}</span>
                    </el-form-item>
                    <el-form-item label="出库增加金额是否支付">
                        <span>{{this.listData.IsOutStockAddPricePay == 'N'?'否':'是'}}</span>
                    </el-form-item>
                    <h6>订单商品</h6>
                    <el-form-item>
                        <el-table :data="this.listData.Detail" style="width: 80%" border>
                            <el-table-column prop="ProductID" label="商品编码" width="180"></el-table-column>
                            <el-table-column prop="ProductName" label="商品名称" ></el-table-column>
                            <el-table-column prop="ShopCode" label="门店码" width="180"></el-table-column>
                            <el-table-column prop="Qty" label="数量" width="80"></el-table-column>
                            <el-table-column prop="BackQty" label="退货数量" width="80"></el-table-column>
                            <el-table-column prop="PreBackQty" label="预退数量" width="180"></el-table-column>
                            <el-table-column prop="MemberPrice" label="会员价" width="80"></el-table-column>
                            <el-table-column prop="Amount" label="金额小计" width="80"></el-table-column>
                            <el-table-column prop="UnitName" label="单位" width="80"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </el-form>
            <el-button type="primary" @click="goPage()">返回</el-button>
        </el-card>
        
        <!-- 打印弹出框 -->
        <el-dialog title="打印预览" :visible.sync="editVisible" width="75%" :close-on-click-modal="false">
            <div ref="print" class="recordImg" id="printRecord">
                <p style="font-size:18px;text-align:center;font-weight:900">利群网商购物送货单</p>
                <el-form ref="form" :model="form" label-width="90px" class="demo-form-inline" :inline="true" style="width:100%;text-align:left" id="form">
                    <el-form-item label="订单号">
                        <span>{{this.listData.ID}}</span>
                    </el-form-item>
                    <el-form-item label="支付时间">
                        <span>{{this.listData.PayTime}}</span>
                    </el-form-item>
                    <el-form-item label="支付方式">
                        <span>{{this.listData.PayType}}</span>
                    </el-form-item>
                    <el-form-item label="收货人">
                        <span>{{this.listData.ReceiveMan}}</span>
                    </el-form-item>
                    <el-form-item label="收货人手机">
                        <span>{{this.listData.ReceiveMobile}}</span>
                    </el-form-item>
                    <el-form-item label="备注">
                        <span>{{this.listData.MemberRemark}}</span>
                    </el-form-item>
                    <template v-if="this.listData.ReceiverType === '送货上门'">
                        <el-form-item label="预约配送">
                            <span>{{this.listData.PlanReceiveTime}}</span>
                        </el-form-item>
                        <el-form-item label="收货人地址">
                        </el-form-item>
                        <el-form-item>
                            <span>{{this.listData.ReceiveAddr}}</span>
                        </el-form-item>
                    </template>
                    <template v-if="this.listData.ReceiverType === '到店自提'">
                        <el-form-item label="提货时间">
                            <span>{{this.listData.PlanReceiveTime}}</span>
                        </el-form-item>
                    </template>
                </el-form>
                <el-table ref="singleTable" :data="this.listData.Detail" highlight-current-row style="max-width: 850px">
                    <el-table-column type="index"></el-table-column>
                    <el-table-column property="ProductID" label="商品编码"></el-table-column>
                    <el-table-column property="ShopCode" label="门店码" width="100px"></el-table-column>
                    <el-table-column property="ProductName" label="商品名称"></el-table-column>
                    <el-table-column property="Qty" label="数量" width="80px"></el-table-column>
                    <el-table-column property="MemberPrice" label="单价" width="80px"></el-table-column>
                    <el-table-column property="Amount" label="总价"></el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                </el-table-column>
                </el-table>
                <div style="display:flex; justify-content:space-around">
                    <span>商品金额：{{this.listData.ProductPrice}}</span>
                    <span>运费：{{this.listData.SendFee}}</span>
                    <span>优惠券：{{this.listData.GiftTokenAmount}}</span>
                    <span>礼品卡：{{this.listData.GiftCardAmount}}</span>
                    <span>积分：{{this.listData.PointMoney}}</span>
                </div>
                <p style="text-align:right;margin:10px 0">支付金额：{{this.listData.PayMoney}}</p>
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
                <el-button type="primary" @click="PrintRow">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改弹出框 -->
            <el-dialog title="修改" :visible.sync="editVisible2" width="30%" :close-on-click-modal="false">
                <el-form ref="form" :model="form" label-width="80px">
                    <!-- <el-form-item label="订单号">
                        <el-input v-model="this.listData.ID" :disabled="true"></el-input>
                    </el-form-item> -->
                    <el-form-item label="商品编码">
                        <el-input v-model="this.ProductID" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="数量">
                        <el-input v-model="form.Qty"></el-input>
                    </el-form-item>
                    <el-form-item label="价格">
                        <el-input v-model="form.MemberPrice"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible2 = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
            </el-dialog>

    </div>
</template>
<script>
import { getOrderList,orderDetail,changePayMethod,changePayNum,BasePayAllList } from "@/api/orderList"
import qs from 'qs';
import JsBarcode from 'jsbarcode';
inject:['reload'];
    export default{
        data(){
            return{
                listData:'',       /* 获取到的数据放在这 */
                form:{
                    Qty:'',             /* 修改用数量 */
                    MemberPrice:'',
                },
                editVisible:false,
                editVisible2:false,      /* 修改 */
                timestamp:'',       /* 当前时间戳 */
                time:'',            /* 转换完成后的时间 */
                ID:decodeURI(location.href).split('?')[1].split('=')[1],
                ProductID:'',
                PayMethods:{
                    PayID:'',
                    ReceiveAreaID:'',
                    ReceiveAddr:'',
                    ReceiveMan:'',
                    SendFee	:'',
                    Moblie:'',
                    ReceiverType:'',
                    AddrX:'',
                    AddrY:''
                },
                // editVisible3:false,
                PayMethodsLIst:[],                                      /* 所有支付方式 */
                ID:'',
                ReceiverType:'',        /* 点击切换的时候，把状态存到这边，方便带着参数去支付修改页 */
            }
        },
        methods:{
            getData(){
                let params = {
                    ID:decodeURI(location.href).split('?')[1].split('=')[1].split('&')[0],
                }
                orderDetail(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.listData = JSON.parse(res.data.Result)
                        console.log(this.listData)
                        if(this.listData.ReceiverType == '送货上门'){
                            this.ReceiverType = 'R'
                        }
                        if(this.listData.ReceiverType == '自提'){
                            this.ReceiverType = 'S'
                        }
                        console.log(this.ReceiverType)
                    }
                }).catch(function(e){
                    console.log(e)
                })
            },
            goPage(){
                this.$router.push({
                    path:'/orderList',
                })
            },
            show(){
                this.editVisible=true;
                this.timestamp = Date.parse(new Date());
                this.time = this.disposeDate(this.timestamp)
                JsBarcode("#barcode", this.listData.ID, {
                    format: "CODE39",  //条形码的格式
                    lineColor: "black",  //线条颜色
                    width:1, //线宽
                    height:30,  //条码高度
                    displayValue: true //是否显示文字信息
                });
            },
            disposeDate(dateTime) {
                var getTime = new Date(dateTime);
                dateTime = getTime.toLocaleString();
                return dateTime;
            },
            PrintRow(index, row){
                this.$print(this.$refs.print) // 使用
            },
            handleEdit(index, row){
                this.ID = row.ID
                this.ProductID = row.ProductID;
                this.editVisible2 = true;
                this.form.Qty = row.Qty;
                this.form.ID = row.ProductID
                this.form.MemberPrice   =   row.MemberPrice
            },
            saveEdit(){                     /* 修改订单支付数量 */
                let params = {
                    OrderID:decodeURI(location.href).split('?')[1].split('=')[1],           /* 订单号 */
                    ID: this.ID,
                    Qty : this.form.Qty,
                    MemberPrice : this.form.MemberPrice
                }
                changePayNum(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message('提交成功')
                        this.reload()
                        this.editVisible2 = false
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
            getPayMethods(ID){
                this.$router.push({
                    path:'/changeOrder',
                    query:{
                        ID:decodeURI(location.href).split('?')[1].split('=')[1],
                        ReceiverType:this.ReceiverType
                    }
                })
            }
        },
        mounted(){
            this.getData()
        }
    }
</script>  
<style lang="scss" scoped>
body{
    #app{
        .wrapper{
            .content-box{
                .content{
                    div{
                        .el-dialog__wrapper{
                            .el-dialog{
                                .el-dialog__body{
                                    border: 1px lightgreen dashed!important;
                                    #el-form{
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
                    }
                }
            }
        }
    }
}
    #allmap{
        width: 400px;
        height: 400px;
        font-family: "微软雅黑";
        border:1px solid green;
    }
</style>