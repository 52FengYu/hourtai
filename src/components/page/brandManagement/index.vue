<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 品牌管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>         
        <div class="container">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="品牌名称">
                    <el-input v-model="formInline.BrandName" placeholder="请输入品牌名称" clearable @change="reset"></el-input>
                </el-form-item>
                <el-form-item label="品牌ID">
                    <el-input v-model="formInline.ID" placeholder="请输入品牌ID" clearable @change="reset"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getData">搜索</el-button>
                    <el-button type="primary" @click="addVisible = true">新增品牌</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData.ModelList" border style="width: 100%"> 
                <el-table-column prop="ID" label="品牌编号" width="200" align="center"></el-table-column> 
                <el-table-column prop="BrandName" label="品牌名称" width="200" align="center"></el-table-column> 
                <el-table-column prop="LiQunCode" label="利群内部系统编号" width="200" align="center"></el-table-column> 
                <el-table-column prop="SearchCoefficient" label="搜索加权系数" width="200" align="center"></el-table-column> 
                <el-table-column prop="Remark" label="备注" width="200" align="center"></el-table-column>
                <el-table-column fixed="right" label="操作" align="center"> 
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-size= this.PageSize
                layout="total, sizes, prev, pager, next, jumper"
                :total= this.tableData.TotalCount
                style="text-align:right">
            </el-pagination>
        </div>

        <!-- 修改品牌 -->
         <el-dialog title="修改品牌" :visible.sync="editVisible" width="40%" :close-on-click-modal="false">
                <el-form ref="form" :model="row" label-width="100px">
                    <el-form-item label="品牌名称">
                        <el-input v-model="row.BrandName"></el-input>
                    </el-form-item>
                    <el-form-item label="利群内部品牌编码">
                        <el-input v-model="row.LiQunCode" ></el-input>
                    </el-form-item>
                    <el-form-item label="搜索加权系数">
                        <el-input v-model="row.SearchCoefficient" ></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="row.Remark" ></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="onSubmit">确 定</el-button>
                </span>
            </el-dialog>
            
            <!-- 添加品牌 -->
            <el-dialog title="添加品牌" :visible.sync="addVisible" width="40%" :close-on-click-modal="false">
                <el-form ref="form" :model="addBand" label-width="100px">
                    <el-form-item label="品牌名称">
                        <el-input v-model="addBand.BrandName"></el-input>
                    </el-form-item>
                    <el-form-item label="利群内部品牌编码">
                        <el-input v-model="addBand.LiQunCode" ></el-input>
                    </el-form-item>
                    <el-form-item label="搜索加权系数">
                        <el-input v-model="addBand.SearchCoefficient" ></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="addBand.Remark" ></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addVisible = false">取 消</el-button>
                    <el-button type="primary" @click="Submit">确 定</el-button>
                </span>
            </el-dialog>
    </div>
</template>
<script>
import { BaseBrandListGet,BaseBrandAdd,BaseBrandUpdate } from '@/api/common'
import qs from 'qs'
    export default{
        name:'brandManagement',
        data(){
            return{
                currentPage4: 1,        /* 分页用 */
                formInline:{
                    BrandName:"",            /* 品牌名称 */
                    ID:'',                     /* 品牌编号 */
                },
                tableData:[],
                PageSize:10,
                row:[],          /* 点击修改时的数据存放 */
                editVisible:false,               /* 修改品牌 */
                addVisible:false,               /* 添加品牌 */
                addBand:{
                    BrandName:'',
                    LiQunCode:'',
                    Remark:'',
                    SearchCoefficient:''
                }
            }
        },
        methods:{
            reset(){
                this.currentPage4 = 1,
                this.PageSize = 10
            },
            handleSizeChange(val) {
                this.PageSize = val
                this.getData()
            },
            handleCurrentChange(val) {
                this.currentPage4 = val
                this.getData()
            },
            clear(){
                this.formInline.BrandName=""
                this.formInline.ID = ''
            },
            getData(){
                let params = {
                    BrandName:this.formInline.BrandName,
                    ID:this.formInline.ID,
                    PageIndex:this.currentPage4,
                    PageSize:this.PageSize
                }
                BaseBrandListGet(qs.stringify(params)).then((res)=>{
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
            handleClick(row){                   /* 编辑 */
                this.row = row
                this.editVisible = true
            },
            onSubmit(){                 /* 修改品牌 */
                let params = {
                    ID:this.row.ID,
                    BrandName:this.row.BrandName,
                    LiQunCode:this.row.LiQunCode,
                    Remark:this.row.Remark,
                    SearchCoefficient:this.row.SearchCoefficient
                }
                BaseBrandUpdate(qs.stringify(params)).then((res)=>{
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
            Submit(){               /* 添加品牌 */
                let params = {
                    BrandName:this.addBand.BrandName,
                    LiQunCode:this.addBand.LiQunCode,
                    Remark:this.addBand.Remark,
                    SearchCoefficient:this.addBand.SearchCoefficient
                }
                BaseBrandAdd(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.addVisible = false
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
<style lang="scss">
    .content{
        .container{
            .el-form-item{
                .el-form-item__content{
                    .el-button{
                        span{
                            a{
                                color:#fff
                            }
                        }
                    }
                }
            }
        }
    }
</style>