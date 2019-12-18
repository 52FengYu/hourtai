<template>
    <div>
        <el-card class="box-card">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="礼品卡ID">
                <el-input v-model="formInline.ID" placeholder="礼品卡ID" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="订单或者退货单ID">
                <el-input v-model="formInline.OrderID" placeholder="订单或者退货单ID"></el-input>
            </el-form-item>
            <el-form-item>
                <el-date-picker
                    v-model="formInline.timeStart"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="开始时间"
                    @change="updateDateStart">
                </el-date-picker>至
                <el-date-picker
                    v-model="formInline.timeEnd"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="结束时间"
                    @change="updateDateEnd">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getData">查询</el-button>
            </el-form-item>
            </el-form>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="GiftCardID" label="礼品卡id" width="180"></el-table-column>
                <el-table-column prop="InfoType" label="信息类型" width="180"></el-table-column>
                <el-table-column prop="UseAmount" label="礼品卡变动金额"></el-table-column>

                <el-table-column prop="CreateTime" label="创建时间" width="180"></el-table-column>
                <el-table-column prop="GiftCardUseDetailPayTime" label="支付时间" width="180"></el-table-column>
                <el-table-column prop="GiftCardUseDetailPayID" label="支付单id"></el-table-column>

                <el-table-column prop="BillID" label="订单或者退货单id" width="180"></el-table-column>
                <el-table-column prop="state" label="交易状态" width="180"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script>
import { GiftListDetail } from '@/api/giftList';
import qs from 'qs';
    export default{
        data(){                 GiftListDetail
            return{
                formInline:{
                    ID:decodeURI(location.href).split('?')[1].split('=')[1],
                    OrderID:'',
                    timeStart:'',                    /* 时间选择器开始 */
                    timeEnd:'',                     /* 时间选择器结束 */
                },
                tableData:{}
            }
        },
        methods:{
            updateDateStart(val) {
                this.formInline.timeStart = val + " 00:00:00"
            },
            updateDateEnd(val) {
                this.formInline.timeEnd =val + " 00:00:00"
            },
            getData(){
                let params = {
                    ID:this.formInline.ID,
                    OrderID:this.formInline.OrderID,
                    BeginTime:this.formInline.timeStart,
                    timeEnd:this.formInline.timeEnd,
                }
                GiftListDetail(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.tableData = JSON.parse(res.data.Result)
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
            this.getData()
        }
    }
</script>
<style lang="scss" scoped>

</style>