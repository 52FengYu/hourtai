<template>
    <div>
        <el-card>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="开始时间">
                    <el-date-picker
                        v-model="formInline.BeginTime"
                        type="datetime"
                        placeholder="选择日期时间"
                        value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker
                        v-model="formInline.EndTime"
                        type="datetime"
                        placeholder="选择日期时间"
                        value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="是否退款完成">
                    <el-select v-model="formInline.PayOK" clearable placeholder="请选择">
                        <el-option label="否" value="N"></el-option>
                        <el-option label="是" value="Y"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="reset();getData()">搜索</el-button>
                    <el-button type="primary" @click="goPage">添加</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData.ModelList" border style="width: 100%" highlight-current-row>
                <el-table-column prop="ID" label="退款编号" align="center"></el-table-column>
                <el-table-column prop="CreateTime" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="PayOKTime" label="退款完成时间" align="center"></el-table-column>
                <el-table-column prop="PayOK" label="是否退款完成" align="center">
                    <template slot-scope="scope">
                        {{scope.row.PayOK == 'N'?"否":(scope.row.PayOK == 'Y'? "是":'')}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="goDetail(scope.row)">详情</el-button>
                        <el-button type="text" size="small" @click="open(scope.row)" v-if="scope.row.PayOK == 'N'">退款确认</el-button>
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
    </div>
</template>
<script>
import { OrderBackProductPayMasterListGet,OrderBackProductUnPayListGet,OrderBackProductPaySetOK } from '@/api/orderList'
import qs from 'qs'
    export default{
        name:'RefundMoney',
        data(){
            return{
                formInline:{            /* 顶部输入框 */
                    BeginTime:'',       /* 开始时间 */
                    EndTime:'',         /* 结束时间 */
                    PayOK:''            /* 是否退款完成 */
                },
                PageIndex:1,
                PageSize:10,
                tableData:{},
                form:{
                    BeginTime:'',
                    EndTime:''
                },
                row:[]
            }
        },
        methods:{
            getData(){
                let params = {
                    BeginTime:this.formInline.BeginTime ? this.formInline.BeginTime : this.GetDateStr(-7),
                    EndTime:this.formInline.EndTime ? this.formInline.EndTime : this.GetDateStr(1),
                    PageIndex:this.PageIndex,
                    PageSize:this.PageSize,
                    PayOK:this.formInline.PayOK
                }
                OrderBackProductPayMasterListGet(qs.stringify(params)).then((res)=>{
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
            },
            reset(){
                this.PageIndex = 1,
                this.PageSize = 10
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
            goPage(){
                this.$router.push(
                    {
                        path:'/getList'
                    }
                )
            },
            goDetail(row){
                this.$router.push({
                    path:'/GetRefundDetails',
                    query:{
                        ID:row.ID
                    }
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
            open(row) {
                this.row = row
                this.$confirm('此操作不可逆, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.confirm()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退款'
                    });          
                });
            },
            confirm(){
                let params = {
                    ID:this.row.ID
                }/*  */
                OrderBackProductPaySetOK(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('退款确认成功')
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
            }
        },
        created(){
            this.formInline.BeginTime = this.GetDateStr(-7)
            this.formInline.EndTime = this.GetDateStr(1)
            this.getData()
        }
    }
</script>
<style lang="scss" scoped>

</style>