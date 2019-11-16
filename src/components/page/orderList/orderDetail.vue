<template>
    <div>
        <el-card>
                <h4>订单详情</h4>
                <el-form ref="form" :model="form" label-width="100px">
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

                    <h5>订单信息</h5>
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
                    <el-form-item label="支付类型">
                        <span>{{this.listData.PayType}}</span>
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
                        <span>{{this.listData.IsOutStockAddPricePay}}</span>
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
                        </el-table>
                    </el-form-item>
                </el-form>
            <el-button type="primary" @click="goPage()">返回</el-button>
        </el-card>
        
        <!-- 打印弹出框 -->
        <el-dialog title="打印预览" :visible.sync="editVisible" width="75%">
            <div ref="print" class="recordImg" id="printRecord">
                <p style="font-size:18px;text-align:center;font-weight:900">利群网商购物送货单</p>
                <el-form ref="form" :model="form" label-width="90px" class="demo-form-inline" :inline="true" style="width:100%;text-align:left">
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
                <el-table ref="singleTable" :data="this.listData.Detail" highlight-current-row @current-change="handleCurrentChange" style="max-width: 750px">
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
    </div>
</template>
<script>
import { getOrderList,orderDetail,changePayMethod,changePayNum } from "@/api/orderList"
import qs from 'qs';
import JsBarcode from 'jsbarcode'
    export default{
        data(){
            return{
                listData:'',       /* 获取到的数据放在这 */
                form:'',
                editVisible:false,
                timestamp:'',       /* 当前时间戳 */
                time:'',            /* 转换完成后的时间 */
                ID:decodeURI(location.href).split('?')[1].split('=')[1],
            }
        },
        methods:{
            getData(){
                let params = {
                    ID:decodeURI(location.href).split('?')[1].split('=')[1],
                }
                orderDetail(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.listData = JSON.parse(res.data.Result)
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
            goPage(){
                this.$router.push({
                    path:'/orderList',
                })
            },
            show(){
                this.editVisible=true;
                this.timestamp = Date.parse(new Date());
                this.time = this.disposeDate(this.timestamp)
                JsBarcode("#barcode", this.ID, {
                    format: "CODE39",  //条形码的格式
                    lineColor: "black",  //线条颜色
                    width:1, //线宽
                    height:30,  //条码高度
                    displayValue: false //是否显示文字信息
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
                    }
                }
            }
        }
    }
}
</style>