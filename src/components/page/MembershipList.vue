<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-s-custom"></i> 会员列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="head">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="会员卡号">
                        <el-input v-model="formInline.inputCard" placeholder="会员卡号" style="width:15rem;margin-right:2rem"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="formInline.inputMobile" placeholder="手机号" style="width:15rem;margin-right:2rem"></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间">
                        <div class="block">
                            <el-date-picker
                                v-model="formInline.pickerDateCreate"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                     <el-form-item label="结束时间">
                        <div class="block">
                            <el-date-picker
                                v-model="formInline.pickerDateEnd"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="是否废弃">
                        <el-switch v-model="formInline.delivery" label="是否废弃"></el-switch>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="margin-left:2rem" @click="getData">搜索</el-button>
                        <el-button type="primary" disabled>导出</el-button>   <!-- 不可用的情况下 动态添加disabled -->
                    </el-form-item>
                </el-form>
            </div>
                 
            <el-table :data="tableData.ModelList" border class="table" ref="multipleTable">
                <el-table-column prop="ID" label="会员卡号"  width="180" align="center" ></el-table-column>
                <el-table-column prop="Mobile" label="手机号"  width="180" align="center" ></el-table-column>
                <el-table-column prop="MemberType" label="注册类型" width="120" align="center" >{{this.tableData.ModelList.MemberType != 'c'? '普通会员':"内部会员" }}</el-table-column>
                <el-table-column prop="Source" label="注册会员来源" width="180" align="center" >{{this.tableData.ModelList.Source != 'W'? 'wap':"app" }}</el-table-column>
                <el-table-column prop="CreateTime" label="注册时间"  width="150" align="center" ></el-table-column>
                <el-table-column prop="DelFlag" label="是否废弃" width="180" align="center" ></el-table-column>
                <el-table-column prop="MemberCode" label="CRM系统会员号" width="120" align="center" ></el-table-column>
                <el-table-column prop="Balance" label="零钱包金额" :formatter="formatter" align="center" ></el-table-column>
                <el-table-column label="操作" align="center" fixed="right" min-width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" plain @click="show(scope.$index, scope.row)">重置会员密码</el-button>
                        <el-button type="primary" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">废弃会员</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="this.tableData.TotalCount">
                </el-pagination>
            </div>
        </div>

        <!-- 重置弹出框 -->
        <el-dialog title="重置密码" :visible.sync="editVisible" width="50%">
            <el-form ref="form" :model="resetPsd" label-width="100px">
                <el-form-item label="ID">
                    <el-input :disabled="true" v-model="resetPsd.ID"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="resetPsd.psd" type="password" ></el-input>
                </el-form-item>
                <el-form-item label="再次输入密码">
                    <el-input v-model="resetPsd.rePsd" type="password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="savePsd">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="delMember">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getMemberList,resetMemberPsd,deleteMember } from '@/api/memberShipList'
import qs from 'qs';
    export default {
        name: 'basetable',
        data() {
            return {
                tableData: [],             /* 列表数据存放在此，请勿惊扰 */
                cur_page: 1,            /* 分页用 */
                is_search: false,
                editVisible: false,
                delVisible: false,
                resetPsd:{
                    ID:'',                      /* 重置密码用 */
                    psd:'',                     /* 密码 */
                    rePsd:'',                   /* 再次输入密码 */
                },
                formInline:{
                    inputCard: '',          /* 会员卡号 */
                    inputMobile:'',         /* 用户手机号 */
                    pickerDateCreate:"",          /* 时间选择器开始 */
                    pickerDateEnd:'',       /* 时间选择器结束 */
                    delivery:false          /* 是否废弃 */
                },
                form: {
                    cardNum: '',    /* 会员卡号 */
                    type: '',       /* 注册类型 */
                    name: '',       /* 昵称 */
                    sex:'',     /* 性别 */
                    mobile:'',      /* 手机号 */
                    birthday:'',        /* 生日 */
                    time:'',        /* 注册时间 */
                    state:'',       /* 状态 */
                    money:''        /* 零钱包金额 */
                },
                idx: -1,
                id: -1,
                deleteMemberID:'',          /* 删除会员时用 */
            }
        },
        created(){
            this.data()
        },
        computed: {
         },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.data();
            },
            getData(){
                let params = {
                    PageIndex:this.cur_page,
                    ID:this.formInline.inputCard,
                    Mobile:this.formInline.inputMobile,
                    PageSize:10,
                    DelFlag:this.formInline.delivery == true ? "Y" :"N",
                    BeginTime:this.formInline.pickerDateCreate,
                    EndTime:this.formInline.pickerDateEnd,
                }
                getMemberList(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        console.log(JSON.parse(res.data.Result))
                        this.tableData = JSON.parse(res.data.Result)
                        console.log(this.tableData)
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
            data(){
                let params = {
                    PageIndex:this.cur_page,
                }
                getMemberList(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        console.log(JSON.parse(res.data.Result))
                        this.tableData = JSON.parse(res.data.Result)
                        console.log(this.tableData)
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
            show(index, row){
                this.resetPsd.ID = row.ID;
                this.editVisible = true
            },
            savePsd(){
                if(this.resetPsd.psd === this.resetPsd.rePsd){
                    let params = {
                        ID:this.resetPsd.ID,
                        PassWord:this.$md5(this.resetPsd.psd)
                    }
                    resetMemberPsd(qs.stringify(params)).then((res)=>{
                        console.log(res.data)
                        if(res.data.Success == 1){
                            console.log("数据请求成功")
                            console.log(JSON.parse(res.data.Result))
                            this.$message({
                                message: '密码修改成功',
                                type: 'success'
                            });
                            this.editVisible = false
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
                }else{
                    this.$message.error('两次密码输入不一致');
                }
            },
            handleDelete(index, row) {
                this.deleteMemberID = row.ID;
                this.delVisible = true;
            },
            delMember(){
                let params = {
                    ID:this.deleteMemberID,
                }
                deleteMember(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        console.log(JSON.parse(res.data.Result))
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.delVisible = false;
                    }
                    if(res.data.Success == 0){
                        console.log(res.data.Result)
                        this.$message('修改失败');
                    }
                    if(res.data.Success == -999){
                        console.log("用户未登录")
                        console.log(res.data)
                        this.$message('请重新登录');
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

<style lang="scss" scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
    .container{
        width:100%;
       .head{
           display:flex
       }
        input{
            width:15rem
        }
        .table{
            margin-top:3rem;
            width:96%
        }
        .el-pagination{
            margin-right:1rem
        }
    }
</style>
