<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-bank-card"></i> 礼品卡列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>         
        <div class="container">
            <div class="head">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item>
                        <el-input v-model="formInline.phone" placeholder="请输入用户手机号或名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="formInline.giftCardID" placeholder="礼品卡编号"></el-input>
                    </el-form-item>
                    <!-- <el-form-item>
                        <el-input v-model="formInline.giftCardTypeNum" placeholder="礼品卡类型编号"></el-input>
                    </el-form-item> -->
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
                        <el-button type="primary" @click="getData">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <el-table :data="tableData.ModelList" border style="width: 100%"> 
                    <el-table-column prop="ID" label="礼品卡id" width="150" align="center"> </el-table-column> 
                    <el-table-column prop="GiftCardName" label="礼品卡名称" width="120" align="center"> </el-table-column> 
                    <el-table-column prop="Amount" label="礼品卡金额" width="120" align="center"> </el-table-column> 
                    <el-table-column prop="Balance" label="礼品卡余额" width="120" align="center"> </el-table-column> 
                    <el-table-column prop="GiftMemberName" label="用户名字" width="200" align="center"> </el-table-column> 
                    <el-table-column prop="GiftMobile" label="用户手机号" width="120" align="center"> </el-table-column> 
                    <el-table-column prop="CreateTime" label="创建时间" align="center"> </el-table-column> 
                    <el-table-column prop="BeginTime" label="结束时间" align="center"> </el-table-column> 
                    <el-table-column label="是否已废弃" align="center">
                        <template slot-scope="scope">
                            {{scope.row.DelFlag === 'N' ? '未废弃' : '已废弃'}}
                        </template>
                    </el-table-column> 
                    <el-table-column fixed="right" label="操作" width="150" > 
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="primary">查看使用记录</el-button>
                            <el-button type="danger" size="small" v-if="scope.row.DelFlag=='N'" @click="DelFlag(scope.row)">禁用</el-button>
                            <el-button type="success" size="small" v-if="scope.row.DelFlag=='Y'" @click="DelFlag(scope.row)">启用</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    style=" text-align:right"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-size = this.PageSize
                    layout="total, sizes, prev, pager, next, jumper"
                    :total = this.tableData.length>
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<style lang="scss">

</style>
<script>
import { getGiftList,changeGiftList,GiftListDetail } from '@/api/giftList';
import qs from 'qs';
    export default{
        data(){
            return{
                currentPage4: 1,                /* 分页器 */
                formInline:{
                    giftCardTypeNum:'',         /* 礼品卡类型编号 */
                    giftCardID:'',              /* 礼品卡编号 */
                    phone:"",                   /* 请输入用户手机号或名称 */
                    timeStart:'',                    /* 时间选择器开始 */
                    timeEnd:'',                     /* 时间选择器结束 */
                    },
                value2: '',
                tableData:[],
                PageSize:10,
            }
        },
        created(){
            this.getData()
        },
        methods:{
            handleClick(row) {
                console.log(row);
                this.$router.push({
                    path:'/giftDetail',
                    query:{
                        ID: row.ID,
                    }
                })
            },
            handleSizeChange(size) {
                console.log(`每页 ${size} 条`);
                this.PageSize = size
            },
            handleCurrentChange(index) {
                console.log(`当前页: ${index}`);
                this.currentPage4 = index
            },
            getData(){
                let params = {
                    PageNo:this.currentPage4,
                    PageSize:this.PageSize,
                    MemberName:this.formInline.phone,
                    Mobile:this.formInline.phone,
                    BeginTime:this.formInline.timeStart,
                    EndTime:this.formInline.timeEnd,
                    ID:this.formInline.giftCardID
                }
                getGiftList(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        console.log(JSON.parse(res.data.Result))
                        this.tableData = JSON.parse(res.data.Result)
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
            updateDateStart(val) {
                console.log("val:" + val)
                this.formInline.timeStart = val + " 00:00:00"
                console.log("this.value1:" + this.value1)
            },
            updateDateEnd(val) {
                console.log("val:" + val)
                this.formInline.timeEnd =val + " 00:00:00"
                console.log("this.value1:" + this.value1)
            },
            DelFlag(row){
                let params = {
                    ID:row.ID,
                    DelFlag:row.DelFlag == "N" ? 'Y' : 'N'
                }
                changeGiftList(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        console.log(JSON.parse(res.data.Result))
                        // this.tableData = JSON.parse(res.data.Result)
                        this.$message('修改成功')
                        this.getData()
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
            }
        }
    }
</script>  