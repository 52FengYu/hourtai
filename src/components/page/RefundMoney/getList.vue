<template>
    <div>   
        <el-card>
            <el-form ref="form" :inline="true" :model="form" label-width="100px">
                <el-form-item label="确认收货时间">
                    <el-date-picker
                        v-model="form.BeginTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="开始时间">
                    </el-date-picker>
                    至
                    <el-date-picker
                        v-model="form.EndTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getList">搜索</el-button>
                    <el-button type="primary" @click="open">添加</el-button>
                    <el-button type="primary" @click="goPage">返回</el-button>
                </el-form-item> 
            </el-form>
            <el-table ref="multipleTable" :data="table" style="width: 100%" @selection-change="handleSelectionChange" highlight-current-row>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="ID" label="退单号" align="center"></el-table-column>
                <el-table-column prop="OrderID" label="订单号" align="center"></el-table-column>
                <el-table-column prop="ProductID" label="商品编码" align="center"></el-table-column>
                <el-table-column prop="ProductName" label="商品名称" align="center"></el-table-column>
                <el-table-column prop="MemberID" label="会员号" align="center"></el-table-column>
                <el-table-column prop="Qty" label="数量" align="center"></el-table-column>
                <el-table-column prop="Price" label="单价" align="center"></el-table-column>
                <el-table-column prop="BackMoney" label="退款金额" align="center"></el-table-column>
                <el-table-column prop="DiscountMoney" label="优惠金额" align="center"></el-table-column>
                <el-table-column prop="GiftTokenMoeny" label="退优惠券金额" align="center"></el-table-column>
                <el-table-column prop="BackPointMoney" label="退积分金额" align="center"></el-table-column>
                <el-table-column prop="BackGiftCardMoney" label="退礼品卡金额" align="center"></el-table-column>
                <el-table-column prop="BackOutStockAddMoeny" label="退零钱包金额" align="center"></el-table-column>
            </el-table>
            <el-button type="primary" @click="add">添加</el-button>
        </el-card>
    </div>
</template>        
<script>
import { OrderBackProductUnPayListGet,OrderBackProductPayAdd } from '@/api/orderList'
import qs from 'qs'
    export default{
        name:'getList',
        data(){
            return{
                form:{
                    BeginTime:'',
                    EndTime:''
                },
                table:[],
                multipleSelection: [],       /* 添加退单退货是选中的内容 */
            }
        },
        methods:{
            getList(){
                let params = {
                    BeginTime:this.form.BeginTime?this.form.BeginTime:this.GetDateStr(-7),
                    EndTime:this.form.EndTime?this.form.EndTime: this.GetDateStr(1),
                }
                OrderBackProductUnPayListGet(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.table = JSON.parse(res.data.Result).ModelList
                        // console.log(this.table)
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
            handleSelectionChange(val) {
                this.multipleSelection = []
                for(var i = 0;i < val.length; i++){
                    this.multipleSelection.push(val[i].ID)
                }
                console.log(this.multipleSelection)
            },
            goPage(){
                this.$router.push({
                    path:'/RefundMoney'
                })
            },
            add(){
                let params = {
                    OrderBackIDs:JSON.stringify(this.multipleSelection)
                }/*  */
                OrderBackProductPayAdd(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.Success('添加成功')
                        this.getList()
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
            open() {
                this.$confirm('此操作不可逆, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.add()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消添加'
                    });          
                });
            }
        },
        created(){
            this.form.BeginTime = this.GetDateStr(-7)
            this.form.EndTime = this.GetDateStr(1)
            this.getList()
        }
    }
</script>  