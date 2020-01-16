<template>
    <div>
        <el-card>
            <el-button type="primary"  @click="editVisible2 = true">添加</el-button>
            <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all="true" :tree-props="{children: 'children'}">
                <el-table-column prop="id" label="ID" sortable align="center"></el-table-column>
                <el-table-column prop="label" label="权限名" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button @click="change(scope.row)" type="primary" size="small">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        
        
        <!-- 添加弹出框 -->
        <el-dialog title="应用模块添加" :visible.sync="editVisible2" width="40%" :close-on-click-modal="false">
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
                <el-button @click="editVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="addModule">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改弹出框 -->
        <el-dialog title="应用模块修改" :visible.sync="editVisible" width="40%" :close-on-click-modal="false">
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
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="fixModule">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import { AuthorityListGet,SysAuthorityAdd,SysAuthorityUpdate } from '@/api/competence'
import qs from 'qs'
    export default{
        name:'authority',
        data(){
            return{
                tableData:[],
                row:{                       /* 数据回显用 */
                    ID:'',
                    AuthorityKey:'',
                    AuthorityName:'',
                },
                editVisible:false,              /* 修改 */
                editVisible2:false,             /* 添加 */
                form:{
                    ModuleID:'',
                    AuthorityKey:'',
                    AuthorityName:''
                }
            }
        },
        methods:{
            getData(){
                let params = {}
                AuthorityListGet(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.tableData = JSON.parse(res.data.Result.replace(/ID/g,'id').replace(/Id/g,'id'))
                        console.log(this.tableData)
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
                this.row.ID = row.id,
                this.editVisible = true
            },
            fixModule(){
                let params = {
                    ID:this.row.ID,
                    AuthorityKey:this.row.AuthorityKey,
                    AuthorityName:this.row.AuthorityName
                }
                SysAuthorityUpdate(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        this.$message.success('模块权限信息修改成功')
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
            addModule(){
                let params = {
                    ModuleID : this.form.ModuleID,
                    AuthortyKey:this.form.AuthorityKey,
                    AuthorityName:this.form.AuthorityName
                }
                SysAuthorityAdd(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('模块权限信息添加成功')
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
        },
        created(){
            this.getData()
        }
    }
</script>
<style lang="scss" scoped>

</style>