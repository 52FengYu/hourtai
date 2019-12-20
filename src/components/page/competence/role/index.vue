<template>
    <div>
        <el-card>
            <el-button type="primary" @click="editVisible = true">添加</el-button>
            <el-table :data="tableData.ModelList" border style="width: 100%">
                <el-table-column prop="ID" label="角色ID" align="center"></el-table-column>
                <el-table-column prop="RoleName" label="角色名称" align="center"></el-table-column>
                <el-table-column prop="AuthorityIDList" label="角色对应的模块权限ID列表" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="show(scope.row)">点击查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="PageIndex"
                :page-size= this.PageSize
                align="right"
                :total= this.tableData.Totalcount>
            </el-pagination>
        </el-card>

        
        <!-- 新建角色弹出框 -->
        <el-dialog title="新建角色" :visible.sync="editVisible" width="40%" :close-on-click-modal="false">
            <el-form ref="form" :model="addRole" label-width="100px">
                <el-form-item label="角色名称">
                    <el-input v-model="addRole.RoleName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRoles">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改角色弹出框 -->
        <el-dialog title="修改角色" :visible.sync="editVisible2" width="40%" :close-on-click-modal="false">
            <el-form ref="form" :model="changeRole" label-width="100px">
                <el-form-item label="角色名称">
                    <el-input v-model="changeRole.RoleName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="changeRoles">确 定</el-button>
            </span>
        </el-dialog>

        
        <!-- 角色弹出框 -->
        <el-dialog title="权限列表" :visible.sync="editVisible3" width="40%" :close-on-click-modal="false">
            <el-tree
                :data="role"
                ref="tree"
                show-checkbox
                node-key="id"
                default-expand-all
                :default-checked-keys =  this.AuthorityIDList
                :props="defaultProps">
            </el-tree>
            <el-button type="primary" @click="submit">提交</el-button>
        </el-dialog>
    </div>
</template>
<script>
import { SysRoleListGet,SysRoleAdd,SysRoleUpdate,AuthorityListGet,SysRoleSetAuthority } from '@/api/competence'
import qs from 'qs'
    export default{
        data(){
            return{
                tableData:[],               /* 列表数据 */
                PageSize:10,
                PageIndex:1,
                editVisible:false,          /* 新建 */
                editVisible2:false,          /* 新建 */
                editVisible3:false,
                addRole:{
                    RoleName:'',            /* 新建角色-角色名 */
                },
                ID:'',                      /* 存放修改角色的ID */
                AuthorityIDList:'',
                changeRole:{
                    RoleName:''
                },
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                role:[],
                choose:'',                  /* 当前已选中的 */
            }
        },
        methods:{
            getData(){
                let params = {
                    PageNo:this.PageIndex,
                    PageSize:this.PageSize,
                }
                SysRoleListGet(qs.stringify(params)).then((res)=>{
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
            handleClick(row){
                console.log(row)
                this.ID = row.ID
                this.changeRole.RoleName = row.RoleName
                this.editVisible2 = true
            },
            changeRoles(){
                let params = {
                    ID:this.ID,
                    RoleName:this.changeRole.RoleName
                }
                SysRoleUpdate(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success("修改成功")
                        this.editVisible2 = false
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
                    console.log('出错了')
                })
            },
            addRoles(){
                let params = {
                    RoleName:this.addRole.RoleName
                }
                SysRoleAdd(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success("角色新建成功")
                        this.editVisible = false
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
            },
            show(row){
                console.log(row)
                this.editVisible3 = true
                this.ID = row.ID
                this.AuthorityIDList = row.AuthorityIDList
                let params = {}
                AuthorityListGet(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.role = JSON.parse(res.data.Result)
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
            submit(){
                const tree = JSON.stringify(this.$refs.tree.getCheckedKeys(true))
                let reg=new RegExp(',','g')//g代表全部
                let newMsg=tree.replace(reg,'|');
                var deleteY = newMsg.substring(1, newMsg.length - 1);
                let reg1=new RegExp('"','g')//g代表全部
                let newMsg1=deleteY.replace(reg1,'');
                let params = {
                    RoleID:this.ID,
                    AuthorityIDS:newMsg1,
                }
                SysRoleSetAuthority(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('提交成功')
                        this.editVisible3 = false
                        this.getData()
                    }
                    if(res.data.Success == 0){
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -998){
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

</style>