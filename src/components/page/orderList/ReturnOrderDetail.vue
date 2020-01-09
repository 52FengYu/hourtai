<template>  
    <div>
        <el-card>
            <el-form ref="form" :model="form" label-width="140px">
                <el-form-item label="退单号">
                    <span>{{this.form.ID}}</span>
                </el-form-item>
                <el-form-item label="订单号">
                    <span>{{this.form.OrderID}}</span>
                </el-form-item>
                <el-form-item label="分单结果类型">
                    <span>{{this.form.DeliveryType == 'SH' ? '纯门店' :(this.form.DeliveryType == 'ST' ? '纯仓库' :(this.form.DeliveryType == 'SF' ? '门店集货':(this.form.DeliveryType == 'GF' ? '北方国贸集货':'便利店集货')))}}</span>
                </el-form-item>
                <el-form-item label="退货状态">
                    <span>{{this.form.BackProductState == 'N'?'新建':(this.form.BackProductState == 'A'?'供应商审核':(this.form.BackProductState == 'B1'?'供应商审核驳回':(this.form.BackProductState == 'R'?'供应商已收货':(this.form.BackProductState == 'B2'?'供应商收货审核驳回':(this.form.BackProductState == 'A3'?'呼叫中心审核':(this.form.BackProductState == 'B3'?'呼叫中心驳回':(this.form.BackProductState == 'P1'?'正在退款':(this.form.BackProductState == 'P'?'已退款':''))))))))}}</span>
                </el-form-item>
                <el-form-item label="供应商">
                    <span>{{this.form.Supplier}}</span>
                </el-form-item>
                <el-form-item label="收货人">
                    <span>{{this.form.ReceiveMan}}</span>
                </el-form-item>
                <el-form-item label="收货人手机号">
                    <span>{{this.form.ReceiveMobile}}</span>
                </el-form-item>
                <el-form-item label="供应商备注">
                    <span>{{this.form.SupplierRemark}}</span>
                </el-form-item>
                <el-form-item label="会员备注">
                    <span>{{this.form.MemberRemark}}</span>
                </el-form-item>
                <el-form-item label="是否在线支付">
                    <span>{{this.form.IsLinkPay}}</span>
                </el-form-item>
                <el-form-item label="退货送回方式">
                    <span>{{this.form.BackProductType == 'S' ? '送回门店' : (this.form.BackProductType == 'R' ? '上门取货' : '')}}</span>
                </el-form-item>
                <el-form-item label="申请时间">
                    <span>{{this.form.CreateTime}}</span>
                </el-form-item>
                <el-form-item label="订单金额">
                    <span>{{this.form.OrderAmount}}</span>
                </el-form-item>
                <el-form-item label="退单金额">
                    <span>{{this.form.BackAmount}}</span>
                </el-form-item>
                <el-form-item label="退优惠券金额">
                    <span>{{this.form.GiftTokenMoeny}}</span>
                </el-form-item>
                <el-form-item label="退礼品卡金额">
                    <span>{{this.form.BackGiftCardMoney}}</span>
                </el-form-item>
                <el-form-item label="退积分金额">
                    <span>{{this.form.BackPointMoney}}</span>
                </el-form-item>
                <el-form-item label="退款金额">
                    <span>{{this.form.BackMoney}}</span>
                </el-form-item>
                <el-form-item label="退优惠金额">
                    <span>{{this.form.DiscountMoney}}</span>
                </el-form-item>
                <el-form-item label="抵扣多出库欠款金额">
                    <span>{{this.form.BackOutStockAddMoeny}}</span>
                </el-form-item>
                <el-form-item label="退货图片">
                    <template v-if="form.BackImage.length != 0">
                        <el-image style="width: 30vh" :src="'http://images.liqunshop.com/' + form.BackImage"></el-image>
                    </template>
                    <template v-else>
                        <span>无图片</span>
                    </template>
                </el-form-item>
                <hr>
                商品信息
                <el-form-item label="商品编码">
                    {{this.form.ProductID}}
                </el-form-item>
                <el-form-item label="商品名称">
                    {{this.form.ProductName}}
                </el-form-item>
                <el-form-item label="退货数量">
                    {{this.form.Qty}}
                </el-form-item>
                <el-form-item label="商品售价">
                    {{this.form.Price}}
                </el-form-item>
                <el-form-item label="运费">
                    {{this.form.SendFee}}
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import { OrderBackProductGetFromID } from '@/api/orderList'
import qs from 'qs'
    export default{
        name:'ReturnOrderDetail',
        data(){
            return{
                form:[],
                tableData:[]
            }
        },
        methods:{
            getData(){
                console.log(decodeURI(location.href).split('?')[1].split('=')[1])
                let params = {
                    ID:decodeURI(location.href).split('?')[1].split('=')[1]
                }
                OrderBackProductGetFromID(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.form = JSON.parse(res.data.Result)
                        this.tableData = JSON.parse(res.data.Result)
                        console.log(this.form)
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
            this.getData()
        }
    }
</script>
<style lang="scss" scoped>
    .el-form-item{
        margin:0;
        padding:0
    }
</style>