<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-s-ticket"></i> 优惠券列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="head">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="主供应商">
                        <el-select v-model="formInline.MainSupplierID" placeholder="主供应商">
                            <el-option
                            v-for="item in formInline.option1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="供应商">
                        <el-select v-model="formInline.SupplierID" placeholder="供应商">
                            <el-option
                            v-for="item in formInline.option2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="活动ID">
                        <el-input v-model="formInline.ID" placeholder="活动ID"></el-input>
                    </el-form-item>
                    <el-form-item label="活动名称">
                        <el-input v-model="formInline.activityName" placeholder="活动名称"></el-input>
                    </el-form-item>
                    <el-form-item label="起止时间">
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
                    <el-form-item label="审核状态">
                        <el-select v-model="formInline.checkValue" clearable placeholder="请选择">
                            <el-option
                                v-for="item in formInline.checkOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search">搜索</el-button>   
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" icon="el-icon-plus">新建活动列表</el-button>   
                    </el-form-item>
                </el-form>
            </div>
            <el-table :data="tableData.ModelList" border class="tableData" ref="multipleTable">
                <el-table-column prop="GiftTokenGiveOutName" label="领券活动名称" align="center" ></el-table-column>
                <el-table-column label="审核状态" align="center" >
                    <template slot-scope="scope">
                    {{scope.row.Audit === 'N' ? '新建' : ( scope.row.Audit === 'O' ? '审核通过' : '驳回')}}
                  </template>
                </el-table-column>
                <el-table-column prop="AuditMan" label="审核人" align="center" ></el-table-column>
                <el-table-column prop="AuditRemark" label="审核备注"   align="center" ></el-table-column>
                <el-table-column prop="AuditTime" label="审核时间" align="center" ></el-table-column>
                <el-table-column prop="CreateManID" label="创建人编号" align="center" ></el-table-column>
                <el-table-column prop="CreateTime" label="创建时间"  align="center" ></el-table-column>
                <el-table-column prop="DayGiveOutNum" label="当日已领数量"  align="center" ></el-table-column>
                <el-table-column prop="DayMaxNum" label="每天最大领取数量" align="center" ></el-table-column>
                <el-table-column label="废弃标志"  align="center" >
                    {{tableData.ModelList.DelFlag == 'Y' ? '是' : '否'}}
                </el-table-column>
                <el-table-column prop="GiveBeginTime" label="开始领券时间"  align="center" ></el-table-column>
                <el-table-column prop="GiveEndTime" label="结束领券时间" align="center" ></el-table-column>

                <el-table-column prop="GiveOutNum" label="已发数量" align="center" ></el-table-column>
                <el-table-column prop="GiveOutType" label="领券类型" align="center" >{{this.tableData.ModelList === 'C' ? '直接发放' : '密码发放'}}</el-table-column>
                <el-table-column prop="ID" label="领券活动ID" align="center" ></el-table-column>
                <el-table-column prop="IsLastRegTime" label="会员最后注册时间"  align="center" ></el-table-column>
                <el-table-column prop="IsMastNewMember" label="是否必须新会员" align="center" ></el-table-column>
                <el-table-column prop="IsMemberLoginAutoSend" label="是否会员登陆自动发放" align="center" ></el-table-column>
                <el-table-column prop="LastGiveOutTime" label="最后领券时间"  align="center" ></el-table-column>
                <el-table-column prop="LastUpdateManID" label="最后修改人"  align="center" ></el-table-column>
                <el-table-column prop="LastUpdateTime" label="最后修改时间" align="center" ></el-table-column>
                <el-table-column prop="MainSupplierID" label="主供应商号(为空表示不限)"  align="center" ></el-table-column>
                <el-table-column prop="MaxNum " label="最大数量"  align="center" ></el-table-column>
                <el-table-column prop="MemberIDBlackRange" label="会员黑名单" align="center" ></el-table-column>

                <el-table-column prop="MemberIDRange" label="指定发放会员" align="center" ></el-table-column>
                <el-table-column prop="MemberMaxNum" label="每个会员最大领取数量"  align="center" ></el-table-column>
                <el-table-column prop="Remark" label="备注"  align="center" ></el-table-column>
                <el-table-column prop="SupplierID" label="供应商号(为空表示不限)" align="center" ></el-table-column>
                <el-table-column label="操作" width="350">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="choose(scope.$index, scope.row)">通过</el-button>
                        <el-button size="mini" type="success" @click="choose(scope.$index, scope.row)">驳回</el-button>
                        <el-button size="mini" type="primary" plain @click="stop(scope.$index, scope.row)">停止</el-button>
                        <el-button size="mini" type="primary" round @click="discard(scope.$index, scope.row)">废弃</el-button>
                        <el-button size="mini" type="danger" @click="detail(scope.$index, scope.row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                 <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total= this.tableData.TotalCount>
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<style lang="scss">

</style>
<script>
import { MemberGiftTokenGiveOutMasterListGet } from '@/api/coupon';
import { SupplierListGetByLevel } from '@/api/goodsList';
import qs from 'qs'
    export default{
        data(){
            return{
                currentPage4: 1,           /* 分页 */
                PageSize:10,
                formInline:{
                    title:"",           /* 优惠券ID/优惠券标题 */
                    option1:[],                 /* 主供应商 */
                    option2:[],                 /* 供应商 */
                    MainSupplierID:'',              /* 主供应商 */
                    SupplierID:'',                  /* 供应商 */
                    timeStart:'',                    /* 时间选择器开始 */
                    timeEnd:'',                     /* 时间选择器结束 */
                    checkValue:'',                      /* 审核状态 */
                    checkOptions:[
                        {value: 'N',
                        label: '新建'
                        }, {
                        value: 'O',
                        label: '审核'
                        }, {
                        value: 'B',
                        label: '驳回'}
                    ]
                },
                tableData:[]
            }
        },
        methods:{
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.PageSize = val;
                this.getData()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage4 = val;
                this.getData()
            },
            getData(){
                let params = {
                    /* MainSupplierID:,
                    SupplierID:,
                    ID:,
                    Name:,
                    CreateBeginTime:,
                    CreateEndTime:,
                    Audit:, */
                    PageIndex:1,
                    PageSize:10,
                }
                MemberGiftTokenGiveOutMasterListGet(qs.stringify(params)).then((res)=>{
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
            getMainSupplier(){
                let params = {
                    Level:1
                }
                SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.formInline.option1 = JSON.parse(res.data.Result)
                        console.log(this.option1)
                    }
                    if(res.data.Success == 0){
                        console.log("数据请求失败，请重试")
                        console.log(res.data.Result)
                        this.$message(res.data.Result)
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
            getSupplier(){
                let params = {
                    Level:2
                }
                SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.formInline.option2 = JSON.parse(res.data.Result)
                        console.log(this.option2)
                    }
                    if(res.data.Success == 0){
                        console.log("数据请求失败，请重试")
                        console.log(res.data.Result)
                        this.$message(res.data.Result)
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
            updateDateStart(val) {
                console.log("val:" + val)
                this.formInline.timeStart = val + " 00:00:00"
                this.form.changeTimeStart = val + " 00:00:00"
                console.log("this.value1:" + this.value1)
            },
            updateDateEnd(val) {
                console.log("val:" + val)
                this.formInline.timeEnd = val + " 00:00:00"
                this.form.changeTimeEnd = val + " 00:00:00"
                console.log("this.value1:" + this.value1)
            },
        },
        created(){
            this.getMainSupplier()
            this.getSupplier()
            this.getData()
        }
    }
</script>  