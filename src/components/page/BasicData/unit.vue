<template>
    <div>
        <!-- 顶部的图标 -->
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-cpu"></i> 单位列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="单位编号">
                    <el-input v-model="formInline.ID" placeholder="单位编号" clearable></el-input>
                </el-form-item>
                <el-form-item label="单位名称">
                    <el-input v-model="formInline.UnitName" placeholder="单位名称" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="reset();getData()">搜索</el-button>
                    <el-button type="primary" @click="editVisible = true">添加</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData.ModelList" border>
                <el-table-column prop="ID" label="单位编号" align="center"></el-table-column>
                <el-table-column prop="UnitName" label="单位名称" align="center"></el-table-column>
                <el-table-column prop="Remark" label="备注" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="change(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="PageIndex"
                :page-size= this.PageSize
                layout="total, sizes, prev, pager, next, jumper"
                align="right"
                :total= this.tableData.TotalCount>
            </el-pagination>
        </el-card>
        
        <!-- 添加单位 -->
        <el-dialog title="添加单位" :visible.sync="editVisible" width="40%" :close-on-click-modal="false">
            <el-form ref="form" :model="addUnit" label-width="80px">
                <el-form-item label="单位名称">
                    <el-input v-model="addUnit.UnitName"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="addUnit.Remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUnitName">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改单位 -->
        <el-dialog title="修改单位" :visible.sync="editVisible2" width="40%" :close-on-click-modal="false">
            <el-form ref="form" :model="changeUnit" label-width="80px">
                <el-form-item label="单位名称">
                    <el-input v-model="changeUnit.UnitName"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="changeUnit.Remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="changeUnitName">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>        
<script>
import { BaseUnitListGet,BaseUnitAdd,BaseUnitUpdate } from '@/api/common'
import qs from 'qs'
    export default{
        name:"unit",
        data(){
            return{
                formInline:{            /* 头部的输入框 */
                    ID:'',
                    UnitName:''
                },
                tableData:[],            /* 列表信息 */
                editVisible:false,          /* 添加单位 */
                editVisible2:false,         /* 修改单位 */
                PageIndex:1,
                PageSize:10,
                addUnit:{               /* 添加单位 */
                    UnitName:'',        /* 单位名称 */
                    Remark:''
                },
                changeUnit:{},          /* 修改单位 */
            }
        },
        methods:{
            reset(){
                this.PageIndex = 1,
                this.PageSize = 10
            },
            getData(){
                let params = {
                    ID:this.formInline.ID,
                    UnitName:this.formInline.UnitName,
                    PageIndex:this.PageIndex,
                    PageSize:this.PageSize
                }
                BaseUnitListGet(qs.stringify(params)).then((res)=>{
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
                // console.log(`每页 ${val} 条`);
                this.PageSize = val
                this.getData()
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.PageIndex = val
                this.getData()
            },
            addUnitName(){
                let params = {
                    UnitName:this.addUnit.UnitName,
                    Remark:this.addUnit.Remark
                }
                BaseUnitAdd(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
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
                this.editVisible2 = true
                // console.log(row)
                this.changeUnit = row
            },
            changeUnitName(){
                let params = {
                    ID:this.changeUnit.ID,
                    UnitName:this.changeUnit.UnitName,
                    Remark:this.changeUnit.Remark
                }
                BaseUnitUpdate(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
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
            }
        },
        created(){
            this.getData()
        }
    }
</script>  