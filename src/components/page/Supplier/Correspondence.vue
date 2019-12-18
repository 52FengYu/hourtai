<template>
    <div>
        <el-card>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="用户编号">
                    <el-input v-model="formInline.UserID" placeholder="用户编号"></el-input>
                </el-form-item>
                <el-form-item label="供应商编号">
                    <el-select v-model="formInline.SupplierID" placeholder="供应商" clearable filterable>
                        <el-option
                            v-for="item in formInline.option2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getData">搜索</el-button>
                    <el-button type="primary" @click="editVisible = true">对应关系添加</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData.ModelList" border style="width: 100%">
                <el-table-column prop="UserName" label="用户信息" align="center"></el-table-column>
                <el-table-column prop="UserID" label="用户ID" align="center"></el-table-column>
                <el-table-column prop="SupplierName" label="供应商名称" align="center"></el-table-column>
                <el-table-column prop="SupplierID" label="供应商ID" align="center"></el-table-column>
                <el-table-column label="操作" align="center" fixed="right" min-width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="handleChange(scope.row)">修改</el-button>
                        <el-button type="primary" icon="el-icon-delete" plain @click="open(scope.row)">废弃</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="PageIndex"
                :page-size= this.PageSize
                align="right"
                layout="total, sizes, prev, pager, next, jumper"
                :total= tableData.TotalCount>
            </el-pagination>
        </el-card>
        <!-- 供应商与用户对应关系添加 -->
        <el-dialog title="供应商与用户对应关系添加" :visible.sync="editVisible" width="50%">
            <el-form ref="form" :model="addRelationship" label-width="100px" :inline="true" >
                <el-form-item label="用户编号">
                    <el-select v-model="addRelationship.UserID" clearable placeholder="请选择用户编号">
                        <el-option
                            v-for="item in addRelationship.users"
                            :key="item.UserID"
                            :label="item.UserID"
                            :value="item.UserID">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="供应商号">
                    <el-select v-model="addRelationship.SupplierID" placeholder="供应商" clearable filterable>
                        <el-option
                            v-for="item in addRelationship.Suppliers"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCorrespondence">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 供应商与用户对应关系修改 -->
        <el-dialog title="供应商与用户对应关系修改" :visible.sync="editVisible2" width="50%">
            <el-form ref="form" :model="changeRelationship" label-width="100px" :inline="true" >
                <el-form-item label="用户编号">
                    <el-input v-model="changeRelationship.UserID" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="供应商号">
                    <el-select v-model="changeRelationship.SupplierID" placeholder="供应商" clearable filterable>
                        <el-option
                            v-for="item in changeRelationship.Suppliers"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="changeCorrespondence">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { SupplierListGetByLevel } from '@/api/goodsList';
import { SupplierOpUserListGet,SupplierOpUserAdd,SupplierOpUserUpdate,SupplierOpUserDelete } from '@/api/SupplierList'
import { SysUserListGet } from '@/api/competence'
import qs from 'qs'
    export default{
        data(){
            return{
                formInline:{
                    UserID:'',
                    SupplierID:'',
                    option2:[],         /* 供应商备选 */
                },
                PageIndex:1,
                PageSize:10,
                tableData:[],           /* 列表数据 */
                editVisible:false,      /* 供应商与用户对应关系添加 */
                editVisible2:false,      /* 供应商与用户对应关系修改 */
                addRelationship:{          /* 添加 */
                    UserID:'',          /* 用户编号value */
                    users:[],           /* 用户列表的候选 */
                    SupplierID:'',      /* 供应商value */
                    Suppliers:[],       /* 供应商的候选 */
                },
                row:[],
                changeRelationship:{    /* 修改 */
                    UserID:'',          /* 用户编号value */
                    users:[],           /* 用户列表的候选 */
                    SupplierID:'',      /* 供应商value */
                    Suppliers:[],       /* 供应商的候选 */
                },
            }
        },
        methods:{
            getSupplier(){
                let params = {
                    Level:2,
                }
                SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.formInline.option2 = JSON.parse(res.data.Result)
                        this.addRelationship.Suppliers = JSON.parse(res.data.Result)
                        this.changeRelationship.Suppliers = JSON.parse(res.data.Result)
                    }
                    if(res.data.Success == 0){
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -998){
                        console.log("请求错误")
                    }
                }).catch(function(e){
                    console.log(e)
                })
            },
            getData(){
                let params = {
                    UserID:this.formInline.UserID,
                    SupplierID:this.formInline.SupplierID,
                    PageIndex:this.PageIndex,
                    PageSize:this.PageSize
                }
                SupplierOpUserListGet(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.tableData = JSON.parse(res.data.Result)
                    }
                    if(res.data.Success == 0){
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -998){
                        console.log("请求错误")
                    }
                }).catch(function(e){
                    console.log(e)
                })
            },
            handleSizeChange(val) {         /* 分页用 */
                console.log(`每页 ${val} 条`);
                this.PageSize = val
                this.getData()
            },
            handleCurrentChange(val) {         /* 分页用 */
                console.log(`当前页: ${val}`);
                this.PageIndex = val
                this.getData()
            },
            userList(){     /* 添加关联-用户列表获取 */
                let params = {
                    PageNo:-1,
                    PageSize:-1
                }
                SysUserListGet(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.addRelationship.users = JSON.parse(res.data.Result).ModelList
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
            addCorrespondence(){        /* 供应商与用户对应关系添加 */
                let params = {
                    UserID:this.addRelationship.UserID,
                    SupplierID:this.addRelationship.SupplierID
                }
                SupplierOpUserAdd(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('添加成功')
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
            handleChange(row){
                this.row = row
                this.changeRelationship.UserID = row.UserID
                this.editVisible2 = true
            },
            changeCorrespondence(){             /* 修改供应商与用户的对应关系 */
                let params = {
                    UserID:this.changeRelationship.UserID,
                    SupplierID:this.changeRelationship.SupplierID
                }
                SupplierOpUserUpdate(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('添加成功')
                        this.editVisible2 = false
                        this.getData()
                        this.changeRelationship.SupplierID = ''
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
            deleteCorrespondence(){             /* 删除供应商与用户的对应关系 */
                let params = {
                    UserID:this.row.UserID,
                }
                SupplierOpUserDelete(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('废弃成功')
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
            open(row){
                this.row = row
                this.$confirm('此操作不可逆, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.deleteCorrespondence()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            }
        },
        created(){
            this.getSupplier()
            this.getData()
        },
        mounted(){
            this.userList()
        }
    }
</script>?