<template>
    <div>
        <el-card>
            <!-- <el-button type="primary" @click="editVisible = true">添加</el-button> -->
            <el-button type="primary" @click="connectModule">关联模块和权限</el-button>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="ID" label="模块权限ID" align="center"></el-table-column>
                <el-table-column prop="ModuleID" label="模块ID" align="center"></el-table-column>
                <el-table-column prop="AuthorityName" label="权限名称" align="center"></el-table-column>
                <el-table-column prop="AuthorityKey" label="权限Key" align="center"></el-table-column>
                <el-table-column prop="CreateTime" label="权限创建时间"  align="center"></el-table-column>
                <el-table-column fixed="right" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button @click="change(scope.row)" type="text" size="small">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        
        <!-- 添加弹出框 -->
        <el-dialog title="应用模块添加" :visible.sync="editVisible" width="40%">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="模块ID">
                    <el-input v-model="form.ModuleID"></el-input>
                </el-form-item>
                <el-form-item label="权限Key">
                    <el-input v-model="form.AuthorityKey"></el-input>
                </el-form-item>
                <el-form-item label="权限名称">
                    <el-input v-model="form.AuthorityName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="addModule">确 定</el-button>
            </span>
        </el-dialog>
        
        <!-- 修改弹出框 -->
        <el-dialog title="应用模块修改" :visible.sync="editVisible2" width="40%">
            <el-form ref="form" :model="row" label-width="80px">
                <!-- <el-form-item label="ID">
                    <el-input v-model="row.ID" :disabled="true"></el-input>
                </el-form-item> -->
                <el-form-item label="权限Key">
                    <el-input v-model="row.AuthorityKey"></el-input>
                </el-form-item>            
                <el-form-item label="权限名称">
                    <el-input v-model="row.AuthorityName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="fixModule">确 定</el-button>
            </span>
        </el-dialog>

        
        <!-- 关联模块和权限弹出框 -->
        <el-dialog title="现未关联的权限" :visible.sync="editVisible3" width="40%">
            <el-tree
                :data="limit"
                ref="tree"
                show-checkbox
                node-key="ID"
                default-expand-all
                :default-checked-keys =  this.AuthorityIDList
                :props="defaultProps">
            </el-tree>
            <el-button type="primary" @click="submit">提交</el-button>
        </el-dialog>
    </div>
</template>
<script>
import { SysAuthorityListGetFromModuleID,SysAuthorityAdd,SysAuthorityUpdate,SysAuthorityModuleRelevant,AuthorityListGet,SysRoleSetAuthority } from '@/api/competence'
import qs from 'qs'
    export default{
        data(){
            return{
                tableData:[],           /* 获取到的列表信息 */
                editVisible:false,
                editVisible2:false,
                editVisible3:false,
                form:{
                    ModuleID:'',
                    AuthorityKey:'',
                    AuthorityName:''
                },
                row:{                       /* 数据回显用 */
                    ID:'',
                    AuthorityKey:'',
                    AuthorityName:'',
                },
                Module:{
                    ID:'',
                    ModuleID:''
                },
                limit:[],               /* data */
                defaultProps: {
                    children: 'children',
                    label: 'AuthorityName'
                },
                AuthorityIDList:[],             /* 已经关联的 */
            }
        },
        methods:{
            getData(){
                let params = {
                    ModuleID : decodeURI(location.href).split('?')[1].split('=')[1]
                }
                SysAuthorityListGetFromModuleID(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.tableData = JSON.parse(res.data.Result)
                        for(var i = 0; i < this.tableData.length; i++){
                            this.AuthorityIDList.push(this.tableData[i].ID)
                        }
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
            addModule(){
                let params = {
                    ModuleID : this.form.ModuleID,
                    AuthortyKey:this.form.AuthorityKey,
                    AuthorityName:this.form.AuthorityName
                }
                SysAuthorityAdd(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('模块权限信息添加成功')
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
            change(row){
                this.row.ID = row.ID,
                this.row.AuthorityKey = row.AuthorityKey,
                this.row.AuthorityName = row.AuthorityName,
                this.editVisible2 = true
            },
            fixModule(){
                let params = {
                    ID:this.row.ID,
                    AuthorityKey:this.row.AuthorityKey,
                    AuthorityName:this.row.AuthorityName
                }
                SysAuthorityUpdate(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('模块权限信息修改成功')
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
                })
            },
            connectModule(){                /* 关联模块和权限,获取全部的权限数据 */
                this.editVisible3 = true
                let params = {
                    ModuleID:'0000000000'
                }
                SysAuthorityListGetFromModuleID(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.limit = JSON.parse(res.data.Result)
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
                let params = {
                    ModuleID:decodeURI(location.href).split('?')[1].split('=')[1],
                    IDS:JSON.stringify(this.$refs.tree.getCheckedKeys(true)),
                }
                SysAuthorityModuleRelevant(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('提交成功')
                        this.editVisible3 = false
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
        },
        created(){
            this.getData()
        }
    } 
</script>  
<style lang="scss" scoped>

</style>