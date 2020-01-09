<template>
    <div>
        <el-card>
                <h4>订单详情</h4>
                <el-form ref="form" :model="form" label-width="170px"  align="left">
                    <el-form-item label="订单号">
                        <span>{{this.listData.ID}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                    <el-form-item label="身份证号">
                        <span>{{this.listData.IDNumber}}</span>
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
                        <span>{{this.listData.IsOutStockAddPricePay == 'N'?'否':(this.listData.IsOutStockAddPricePay == 'Y'?'是':'')}}</span>
                    </el-form-item>
                </el-form>
                    <h6>订单商品</h6>
                    <el-table :data="this.listData.Detail" style="width: 80%" border>
                        <el-table-column prop="ProductID" label="商品编码" align="center"></el-table-column>
                        <el-table-column prop="ProductName" label="商品名称" align="center" width="180"></el-table-column>
                        <el-table-column prop="ShopCode" label="门店码" align="center"></el-table-column>
                        <el-table-column prop="OldMemberPrice" label="下单价格" align="center"></el-table-column>
                        <el-table-column prop="OldQty" label="下单数量" align="center"></el-table-column>
                        <el-table-column prop="Qty" label="数量" align="center"></el-table-column>
                        <el-table-column prop="BackQty" label="退货数量" align="center"></el-table-column>
                        <el-table-column prop="PreBackQty" label="预退数量" align="center"></el-table-column>
                        <el-table-column prop="MemberPrice" label="会员价" align="center"></el-table-column>
                        <el-table-column prop="Amount" label="金额小计" align="center"></el-table-column>
                        <el-table-column prop="UnitName" label="单位" align="center"></el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" v-if="DelFlag == 'N' && listData.OrderState == '新建'">修改</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
            <!-- <el-button type="primary" @click="goPage()">返回</el-button> -->
        </el-card>

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
        name:'orderDetail',
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
                DelFlag:'',
                DetailList:[],
                DetailList1:'',         /* 保留DetailList中同ID的最后一个，并将DetailList转化为字符串 */
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
                        this.DelFlag = decodeURI(location.href).split('&')[1].split('=')[1]
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
        /*     goPage(){
                this.$router.push({
                    path:'/orderList',
                })
            }, */
            handleEdit(index, row){
                this.ID = row.ID
                this.ProductID = row.ProductID;
                this.editVisible2 = true;
                this.form.Qty = row.Qty;
                this.form.ID = row.ProductID
                this.form.MemberPrice = row.MemberPrice
            },
            /* push123(){
                this.DetailList.push({'ID':this.ID,'Qty':this.form.Qty,'MemberPrice':this.form.MemberPrice})
                let hash = {}; 
                this.DetailList1 = this.DetailList.reduce((preVal, curVal) => {
                    hash[curVal.ID] ? '' : hash[curVal.ID] = true && preVal.push(curVal); 
                    return curVal 
                }, [])
            }, */
            saveEdit(){                     /* 修改订单支付数量 */
                let params = {
                    OrderID:decodeURI(location.href).split('?')[1].split('=')[1].split('&')[0],           /* 订单号 */
                    // DetailList:JSON.stringify([this.DetailList1]).replace(/:"/g,':').replace(/"}/g,'}')
                    ID:this.ID,
                    Qty:this.form.Qty,
                    MemberPrice:this.form.MemberPrice
                }
                changePayNum(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.getData()
                        this.$message.success('提交成功')
                        this.editVisible2 = false
                        // this.reload()
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
                        ID:decodeURI(location.href).split('?')[1].split('=')[1].split('&')[0],
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
                        .el-card{
                            .el-card__body{
                                .el-form{
                                    .el-form-item{
                                        margin:0!important
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
</style>