<template>
    <div>
        <el-card>
            <el-form :inline="true" class="demo-form-inline">
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
                <el-table-column prop="LastLoginIP" label="最后登陆IP" align="center"></el-table-column>
                <el-table-column prop="LastLoginTime" label="最后登陆时间" align="center"></el-table-column>
                <el-table-column prop="LoginCount" label="登陆次数" align="center"></el-table-column>
                <el-table-column prop="Remark" label="备注" align="center"></el-table-column>
                <el-table-column prop="UserID" label="用户编号" align="center"></el-table-column>
                <el-table-column prop="UserName" label="用户姓名" align="center"></el-table-column>
                <el-table-column prop="State" label="当前状态" align="center">
                    <template slot-scope="scope">
                        {{scope.row.State == 'N' ? '新建' : (scope.row.State == 'Y' ? '启用' : '停用')}}
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="RoleIDs" label="用户角色ID列表" align="center"></el-table-column> -->
                <el-table-column fixed="right" label="操作" align="center" width="300%">
                    <template slot-scope="scope">
                        <el-button @click="change(scope.row)" type="primary" size="small">修改</el-button>
                        <el-button @click="deleteItem(scope.row)" type="danger" size="small">删除</el-button>
                        <el-button @click="stop(scope.row)" type="warning" v-if="scope.row.State == 'Y' || scope.row.State == 'N'" size="small">停用</el-button>
                        <el-button @click="start(scope.row)" type="success" v-if="scope.row.State == 'T' || scope.row.State == 'N'" size="small">启用</el-button>
                        <el-button @click="itemRole(scope.row)" type="primary" size="small">角色</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="PageIndex"
                :page-size= this.PageSize
                layout="sizes, prev, pager, next"
                align="right"
                :total= this.tableData.TotalCount>
            </el-pagination>
        </el-card>

        
        <!-- 添加用户信息 -->
        <el-dialog title="添加用户信息" :visible.sync="editVisible" width="40%">
            <el-form ref="form" :model="addInfo" label-width="120px">
                <el-form-item label="部门编号">
                    <el-cascader
                        v-model="addInfo.DeptID"
                        clearable 
                        :options="addInfo.deptPool"
                        :props="addInfo.SetKesDept"
                        @change="test"
                    ></el-cascader>
                </el-form-item>
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

        <!-- 修改用户信息 -->
        <el-dialog title="修改用户信息" :visible.sync="editVisible2" width="40%">
            <el-form ref="form" :model="addInfo" label-width="120px">
                <el-form-item label="部门编号">
                    <el-cascader
                        v-model="addInfo.DeptID"
                        clearable 
                        :options="addInfo.deptPool"
                        :props="addInfo.SetKesDept"
                        @change="test"
                    ></el-cascader>
                </el-form-item>
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
                <el-button @click="editVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="changeInfo">确 定</el-button>
            </span>
        </el-dialog>

        
        <!-- 角色弹出框 -->
        <el-dialog title="权限列表" :visible.sync="editVisible3" width="40%">
            <el-tree
                :data="role"
                ref="tree"
                show-checkbox
                node-key="ID"
                default-expand-all
                :default-checked-keys =  this.RoleIDs
                :props="defaultProps">
            </el-tree>
            <el-button type="primary" @click="submit">提交</el-button>
        </el-dialog>
    </div>
</template>
<script>
import { SysUserListGet,SysUserAdd,SysDeptListGet,SysUserUpdate,SysUserDelete,SysUserStop,SysUserSetEnable,SysRoleListGet,SysUserSetRole } from '@/api/competence'
import qs from 'qs'
    export default{
        data(){
            return{
                editVisible:false,      /* 添加用户信息 */
                editVisible2:false,      /* 修改用户信息 */
                editVisible3:false,
                tableData:[],           /* 列表信息 */
                PageIndex:1,
                PageSize:10,
                HasDelFlag:'0',
                addInfo:{
                    DeptID:'',
                    UserName:'',
                    UserID:'',
                    Tel:'',
                    Remark:"",
                    IsAdmin:'',
                    SetKesDept:{                //自定义  级联选择器value label
                        value:'ID',
                        label:'DeptName',
                    },
                    deptPool:[],                /* 部门池 */
                },
                ID:'',
                RoleIDs:[],                     /* 点击角色时，将已存在的角色ID存到这里 */
                role:[],
                defaultProps: {
                    children: 'children',
                    label: 'RoleName'
                },
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
                this.getData()
            },
            handleCurrentChange(val) {
                this.PageIndex = val
                console.log(`当前页: ${val}`);
                this.getData()
            },
            add(){
                let params = {
                    DeptID:this.addInfo.DeptID[0],
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
                        this.getData()
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
            },
            change(row){                    /* 在这里进行数据回显 */
                // console.log(row)
                this.ID = row.ID
                this.editVisible2 = true
                this.addInfo.UserName = row.UserName,
                this.addInfo.Remark = row.Remark,
                this.addInfo.UserID = row.UserID
            },
            changeInfo(){
                let params = {
                    ID:this.ID,
                    DeptID:this.addInfo.DeptID[0],
                    IsAdmin:this.addInfo.IsAdmin,
                    Remark:this.addInfo.Remark,
                    Tel:this.addInfo.Tel,
                    UserID:this.addInfo.UserID,
                    UserName:this.addInfo.UserName,
                }
                SysUserUpdate(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.$message.success('修改成功')
                        this.editVisible2 = false
                        this.getData()
                        this.addInfo.UserName = '',
                        this.addInfo.UserID = '',
                        this.addInfo.IsAdmin = '',
                        this.addInfo.Tel=""
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
            },
            getSection(){
                let params = {
                    PageNo:-1,
                    PageSize:-1
                }
                SysDeptListGet(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.addInfo.deptPool = JSON.parse(res.data.Result).ModelList
                        console.log(this.addInfo.deptPool)
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
            },
            test(){
                console.log(this.addInfo.DeptID[0])
            },
            deleteItem(row){
                console.log(row)
                this.ID = row.ID,
                this.open()
            },
            delete(){
                let params = {
                    ID:this.ID
                }
                SysUserDelete(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.$message.success('删除成功')
                        this.getData()
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
            },
            open() {                                /* 删除提示框 */
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.delete()
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            stop(row){
                let params = {
                    ID:row.ID
                }
                SysUserStop(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.$message.success('禁用成功')
                        this.getData()
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
            },
            start(row){
                let params = {
                    ID:row.ID
                }
                SysUserSetEnable(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.$message.success('启用成功')
                        this.getData()
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
            },
            itemRole(row){
                this.RoleIDs = row.RoleIDs
                this.ID = row.ID
                console.log(this.RoleIDs)
                this.editVisible3 = true
                let params = {
                    PageNo:-1,
                    PageSize:-1
                }
                SysRoleListGet(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.role =  JSON.parse(res.data.Result).ModelList
                        console.log(this.role)
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
            },
            submit(){                   /* 用户绑定角色 */
                console.log(JSON.stringify(this.$refs.tree.getCheckedKeys()))
                let params = {
                    ID:this.ID,
                    RoleIDS:JSON.stringify(this.$refs.tree.getCheckedKeys())
                }
                SysUserSetRole(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.role =  JSON.parse(res.data.Result).ModelList
                        console.log(this.role)
                        this.editVisible3 = false
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
            this.getSection()
        }
    }
</script>
<style lang="scss" scoped>

</style>