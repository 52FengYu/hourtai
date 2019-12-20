<template>
    <div>
        <el-card>
            <el-form>
                <el-form-item>
                    <el-button type="primary" @click="editVisible = true">添加</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData.ModelList"  border style="width: 100%">
               <!--  <el-table-column prop="AppID" label="AppID" align="center"></el-table-column>
                <el-table-column prop="ID" label="模块ID" align="center"></el-table-column> -->
                <el-table-column prop="ModuleName" label="模块名称" align="center"></el-table-column>
                 <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button @click="change(scope.row)" type="text" size="small">修改</el-button>
                    <el-button @click="moduleInfo(scope.row)" type="text" size="small">模块权限信息</el-button>
                </template>
            </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage2"
                :page-size= this.PageSize
                layout="sizes, prev, pager, next"
                align="right"
                :total= this.tableData.TotalCount>
            </el-pagination>
        </el-card>
        
        <!-- 添加弹出框 -->
        <el-dialog title="应用模块添加" :visible.sync="editVisible" width="40%" :close-on-click-modal="false">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="AppID">
                    <el-input v-model="form.AppID" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="模块名称">
                    <el-input v-model="form.ModuleName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="addApp">确 定</el-button>
            </span>
        </el-dialog>


        <!-- 修改弹出框 -->
        <el-dialog title="应用模块修改" :visible.sync="editVisible2" width="40%" :close-on-click-modal="false">
            <el-form ref="form" :model="fix" label-width="80px">
                <!-- <el-form-item label="ID">
                    <el-input v-model="this.ID" :disabled="true"></el-input>
                </el-form-item> -->
                <el-form-item label="模块名称">
                    <el-input v-model="fix.ModuleName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="fixApp">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import { SysModuleListGetFromAppID,SysModuleAdd,SysModuleUpdate } from '@/api/competence'
import qs from 'qs'
    export default{
        data(){
            return{
                tableData:[],               /* 列表信息 */
                currentPage2:1,             /* 当前页码 */
                PageSize:10,
                form:{
                    AppID:'',
                    ModuleName:''
                },
                editVisible:false,          /* 添加显示/隐藏 */
                editVisible2:false,          /* 添加显示/隐藏 */
                ID:'',                         /* 点击修改时，这一行的ID存放与此 */
                ModuleName:'',                 /* 点击修改时，这一行的模块名字存放在这 */
                fix:{
                    ModuleName:'',          /* 修改时 输入的名称 */
                }
            }
        },
        methods:{
            getData(){
                let params = {
                    AppID:decodeURI(location.href).split('?')[1].split('=')[1],
                    PageNo:this.currentPage2,
                    PageSize:this.PageSize,
                }
                SysModuleListGetFromAppID(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.tableData = JSON.parse(res.data.Result)
                        this.form.AppID = decodeURI(location.href).split('?')[1].split('=')[1];
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
                this.currentPage2 = val
                console.log(`当前页: ${val}`);
                this.getData()
            },
            addApp(){
                let params = {
                   AppID:this.form.AppID,
                   ModuleName:this.form.ModuleName
                }
                SysModuleAdd(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success(res.data.Result)
                        this.editVisible = false
                        this.getData()
                        this.form.ModuleName = ''
                    }
                    if(res.data.Success == 0){
                        console.log("数据请求失败，请重试")
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
                console.log(row)
                this.ID = row.ID
                this.fix.ModuleName = row.ModuleName
                this.editVisible2 = true
            },
            fixApp(){
                let params = {
                   ID:this.ID,
                   ModuleName:this.fix.ModuleName
                }
                SysModuleUpdate(qs.stringify(params)).then((res)=>{
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
                })
            },
            moduleInfo(row){
                this.$router.push({
                    path:'/limit',
                    query:{
                        ID:row.ID
                    }
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