<template>
    <div>
        <el-card>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="是否在应用列表显示">
                    <el-radio v-model="formInline.IsDisPlay" label="Y" @change="reset">是</el-radio>
                    <el-radio v-model="formInline.IsDisPlay" label="N" @change="reset">否</el-radio>                
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getLIst">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="editVisible = true">应用添加</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData.ModelList" border style="width: 100%">
                <el-table-column prop="ID" label="应用ID" align="center"></el-table-column>
                <el-table-column prop="AppName" label="应用名称" align="center"></el-table-column>
                <el-table-column prop="AppPath" label="应用地址" align="center"></el-table-column>
                <el-table-column prop="IsDisplay" label="是否在应用列表显示" align="center">
                    <template slot-scope="scope">
                        {{scope.row.IsDisplay == '1' ? '是' : '否'}}
                    </template>
                </el-table-column>
                <el-table-column prop="Remark" label="备注" align="center"></el-table-column>
                <el-table-column fixed="right" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button @click="change(scope.row)" type="text" size="small">修改</el-button>
                        <el-button @click="getDetail(scope.row)" type="text" size="small">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync= this.PageIndex
            :page-size = this.PageSize
            layout="sizes, prev, pager, next"
            align="right"
            :total= this.tableData.TotalCount>
        </el-pagination>

        <!-- 添加弹出框 -->
        <el-dialog title="应用添加" :visible.sync="editVisible" width="40%" :close-on-click-modal="false">
            <el-form ref="form" :model="form" label-width="160px">
                <el-form-item label="应用名称">
                    <el-input v-model="form.AppName"></el-input>
                </el-form-item>
                <el-form-item label="应用地址">
                    <el-input v-model="form.AppPath"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.Remark"></el-input>
                </el-form-item>
                <el-form-item label="是否在应用列表页显示">
                    <el-radio v-model="form.IsDisPlay" label="Y">是</el-radio>
                <el-radio v-model="form.IsDisPlay" label="N">否</el-radio>      
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </span>
        </el-dialog>

        
        <!-- 修改弹出框 -->
        <el-dialog title="应用修改" :visible.sync="editVisible2" width="40%" :close-on-click-modal="false">
            <el-form ref="form" :model="fix" label-width="160px">
                <!-- <el-form-item label="应用编号">
                    <el-input v-model="this.ID" :disabled="true"></el-input>
                </el-form-item> -->
                <el-form-item label="应用名称">
                    <el-input v-model="fix.AppName"></el-input>
                </el-form-item>
                <el-form-item label="应用地址">
                    <el-input v-model="fix.AppPath"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="fix.Remark"></el-input>
                </el-form-item>
                <el-form-item label="是否在应用列表页显示">
                    <el-radio v-model="fix.IsDisPlay" label="Y">是</el-radio>
                <el-radio v-model="fix.IsDisPlay" label="N">否</el-radio>      
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="saveChange">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { SysAppListGet,SysAppAdd,SysAppUpdate } from '@/api/competence'
import qs from 'qs'
    export default{
        name:'application',
        data(){
            return{
                editVisible:false,                      /* 应用添加 */
                editVisible2:false,                     /* 应用修改 */
                PageSize:10,                            /* 每页数据数量 */
                PageIndex:1,                               /* 当前页数 */
                formInline:{
                    IsDisPlay:'',                       /* 是否在应用列表显示 */
                },
                tableData:[],                            /* 请求到的数据现在这 */
                form:{                                      /* 应用添加 */
                    AppName:'',
                    AppPath:'',
                    Remark:"",
                    IsDisPlay:'',
                },
                fix:{
                    AppName:'',
                    AppPath:'',
                    Remark:"",
                    IsDisPlay:'',
                },
                ID:''                             /* 点击修改时，将ID存到这 */
            }
        },
        methods:{
            reset(){
                this.PageSize = 10,
                this.PageIndex = 1
            },
            getLIst(){
                let params = {
                    PageNo:this.PageIndex,
                    PageSize:this.PageSize,
                    IsDisPlay:this.formInline.IsDisPlay
                }
                SysAppListGet(qs.stringify(params)).then((res)=>{
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
                this.PageSize = val;
                console.log(`每页 ${val} 条`);
                this.getLIst()
            },
            handleCurrentChange(val) {
                this.PageIndex = val;
                console.log(`当前页: ${val}`);
                this.getLIst()
            },
            save(){
                let params = {
                    AppName:this.form.AppName,
                    AppPath:this.form.AppPath,
                    Remark:this.form.Remark,
                    IsDisPlay:this.form.IsDisPlay,
                }
                SysAppAdd(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.editVisible = false
                        this.$message.success('添加成功')
                        this.getLIst()
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
                this.ID = row.ID
                this.editVisible2 = true
            },
            saveChange(){
                let params = {
                    ID:this.ID,
                    AppName:this.fix.AppName,
                    AppPath:this.fix.AppPath,
                    Remark:this.fix.Remark,
                    IsDisPlay:this.fix.IsDisPlay,
                }
                SysAppUpdate(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.editVisible2 = false
                        this.$message.success('修改成功')
                        this.getLIst()
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
            getDetail(row){
                this.ID = row.ID;
                this.$router.push({
                    path:'/applicationDetail',
                    query:{
                        ID:this.ID
                    }
                })
            }
        },
        created(){
             this.getLIst()
        }
    }
</script>  
<style lang="scss" scoped>

</style>