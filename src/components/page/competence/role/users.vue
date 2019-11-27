<template>
    <div>
        <el-card>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="是否包含废弃">
                    <el-radio v-model="HasDelFlag" label="0">否</el-radio>
                    <el-radio v-model="HasDelFlag" label="1">是</el-radio>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getData">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="editVisible = true">添加</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData.ModelList" border style="width: 100%">
                <el-table-column prop="DeptName" label="部门名称" align="center"></el-table-column>
                <el-table-column prop="DelFlag" label="是否废弃" align="center"></el-table-column>
                <el-table-column prop="ID" label="用户表ID" align="center"></el-table-column>
                <el-table-column prop="IsAdmin" label="是否超级管理员" align="center"></el-table-column>
                <el-table-column prop="LastLoginIP" label="最后登陆ID" align="center"></el-table-column>
                <el-table-column prop="LastLoginTime" label="最后登陆时间" align="center"></el-table-column>
                <el-table-column prop="LoginCount" label="登陆次数" align="center"></el-table-column>
                <el-table-column prop="Remark" label="备注" align="center"></el-table-column>
                <el-table-column prop="UserID" label="用户编号" align="center"></el-table-column>
                <el-table-column prop="UserName" label="用户姓名" align="center"></el-table-column>
                <el-table-column prop="RoleIDs" label="用户角色ID列表" align="center"></el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="PageIndex"
                :page-size= this.PageIndex
                layout="sizes, prev, pager, next"
                align="right"
                :total= this.tableData.TotalCount>
            </el-pagination>
        </el-card>

        
        <!-- 添加用户信息 -->
        <el-dialog title="添加用户信息" :visible.sync="editVisible" width="40%">
            <el-form ref="form" :model="addInfo" label-width="120px">
                <el-form-item label="用户姓名">
                    <el-input v-model="addInfo.UserName"></el-input>
                </el-form-item>
                <el-form-item label="用户号">
                    <el-input v-model="addInfo.UserID"></el-input>
                    <i>通常为员工号</i>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="addInfo.Tel"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="addInfo.Remark"></el-input>
                </el-form-item>
                <el-form-item label="是否超级管理员">
                    <el-radio v-model="addInfo.IsAdmin" label="0">否</el-radio>
                    <el-radio v-model="addInfo.IsAdmin" label="1">是</el-radio>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { SysUserListGet,SysUserAdd } from '@/api/competence'
import qs from 'qs'
    export default{
        data(){
            return{
                editVisible:false,      /* 添加用户信息 */
                tableData:[],           /* 列表信息 */
                PageIndex:1,
                PageSize:10,
                HasDelFlag:'0',
                addInfo:{
                    UserName:'',
                    UserID:'',
                    Tel:'',
                    Remark:"",
                    IsAdmin:''
                }
            }
        },
        methods:{
            getData(){
                let params = {
                    PageNo:this.PageIndex,
                    PageSize:this.PageSize,
                    HasDelFlag:this.HasDelFlag
                }
                SysUserListGet(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        console.log(JSON.parse(res.data.Result))
                        this.tableData = JSON.parse(res.data.Result)
                    }
                    if(res.data.Success == 0){
                        console.log("数据请求失败，请重试")
                        console.log(res.data.Result)
                    }
                    if(res.data.Success == -998){
                        console.log("请求错误")
                        this.$message(res.data.Result)
                    }
                }).catch(function(e){
                    console.log(e)
                    console.log('出错了')
                })
            },
            handleSizeChange(val) {
                this.PageSize = val
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.PageIndex = val
                console.log(`当前页: ${val}`);
            },
            add(){
                let params = {
                    DeptID:decodeURI(location.href).split('?')[1].split('=')[1],
                    IsAdmin:this.addInfo.IsAdmin,
                    Remark:this.addInfo.Remark,
                    Tel:this.addInfo.Tel,
                    UserID:this.addInfo.UserID,
                    UserName:this.addInfo.UserName,
                }
                SysUserAdd(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.$message.success('添加成功')
                        this.editVisible = false
                    }
                    if(res.data.Success == 0){
                        console.log("数据请求失败，请重试")
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -998){
                        console.log("请求错误")
                    }
                }).catch(function(e){
                    console.log(e)
                    console.log('出错了')
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