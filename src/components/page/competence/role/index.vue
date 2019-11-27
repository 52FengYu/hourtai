<template>
    <div>
        <el-card>
            <el-button type="primary" @click="editVisible2 = true">添加</el-button>
            <el-table :data="tableData.ModelList" border style="width: 100%">
                <el-table-column prop="ID" label="部门编号" align="center"></el-table-column>
                <el-table-column prop="DeptName" label="部门名称" align="center"></el-table-column>
                <el-table-column prop="CreateTime" label="添加时间" align="center"></el-table-column>
                <el-table-column fixed="right" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button @click="change(scope.row)" type="text" size="small">修改</el-button>
                        <el-button @click="detail(scope.row)" type="text" size="small">详情</el-button>
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
                :total= tableData.TotalCount>
            </el-pagination>
        </el-card>
        
        <!-- 修改部门信息 -->
        <el-dialog title="修改部门信息" :visible.sync="editVisible" width="40%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="部门ID">
                    <el-input v-model="form.ID" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="部门名称">
                    <el-input v-model="form.DeptName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeInfo">确 定</el-button>
            </span>
        </el-dialog>

        
        <!-- 新增部门信息 -->
        <el-dialog title="新增部门信息" :visible.sync="editVisible2" width="40%">
            <el-form ref="form" :model="addInfo" label-width="100px">
                <el-form-item label="部门名称">
                    <el-input v-model="addInfo.DeptName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { SysDeptListGet,SysDeptUpdate,SysDeptAdd } from '@/api/competence'
import qs from 'qs'
    export default{
        data(){
            return{
                tableData:[],                    /* 列表数据 */
                PageIndex:1,
                PageSize:10,
                editVisible:false,              /* 修改 */
                editVisible2:false,              /* 修改 */
                form:{
                    ID:'',  
                    DeptName:''
                },
                addInfo:{
                    DeptName:'',
                }
            }
        },
        methods:{
            getData(){
                let params = {
                    PageNo:this.PageIndex,
                    PageSize:this.PageSize,
                }
                SysDeptListGet(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.tableData = JSON.parse(res.data.Result)
                        console.log(this.tableData)
                    }
                    if(res.data.Success == 0){
                        console.log("数据请求失败，请重试")
                        console.log(res.data.Result)
                    }
                    if(res.data.Success == -998){
                        console.log("请求错误")
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
            change(row){
                console.log(row)
                this.editVisible = true
                this.form.ID = row.ID
                this.form.DeptName = row.DeptName
            },
            changeInfo(){
                let params = {
                    ID:this.form.ID,
                    DeptName:this.form.DeptName
                }
                SysDeptUpdate(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.$message.success('修改成功')
                        this.getData()
                        this.editVisible = false
                    }
                    if(res.data.Success == 0){
                        console.log("数据请求失败，请重试")
                        console.log(res.data.Result)
                    }
                    if(res.data.Success == -998){
                        console.log("请求错误")
                    }
                }).catch(function(e){
                    console.log(e)
                    console.log('出错了')
                })
            },
            add(){
                let params = {
                    DeptName:this.addInfo.DeptName
                }
                SysDeptAdd(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.$message.success('添加成功')
                        this.getData()
                        this.editVisible2 = false
                        this.addInfo.DeptName = ''
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
            detail(row){
                this.$router.push({
                    path:'/users',
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