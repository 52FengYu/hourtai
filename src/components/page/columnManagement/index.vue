<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-s-unfold"></i> 栏目管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" >
                <el-form-item label="主供应商号">
                    <el-select v-model="formInline.MainSupplierID" placeholder="主供应商" filterable clearable  @change="getSupplierList">
                        <el-option
                        v-for="item in option1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="供应商号">
                    <el-select v-model="formInline.SupplierID" placeholder="供应商" clearable filterable @change="reset">
                        <el-option
                        v-for="item in option2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="页面类型">
                    <el-select v-model="formInline.PageTypeID" placeholder="请选择类型" clearable @change="reset">
                        <el-option
                            v-for="item in formInline.options"
                            :key="item.ID"
                            :label="item.PageTypeName"
                            :value="item.ID"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="页面编号">
                    <el-input v-model="formInline.ID" placeholder="非必填" @change="reset" clearable ></el-input>
                </el-form-item>
                <el-form-item label="页面名称">
                    <el-input v-model="formInline.PageName" placeholder="非必填" @change="reset" clearable ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getData">搜索</el-button>
                    <el-button type="primary" @click="clear">重置</el-button>
                    <el-button type="primary" @click="AddPage">添加</el-button>
                </el-form-item>
            </el-form>
            <el-table 
                :data="resData.ModelList" 
                border 
                style="width: 100%"
                class="table"
                header-cell-class-name="table-header"
                highlight-current-row
            >
                <el-table-column prop="ID" label="ID" align="center"></el-table-column>
                <el-table-column prop="PageName" label="页面名称" align="center"></el-table-column>
                <el-table-column prop="MainSupplierID" label="主供应商号" align="center"></el-table-column>
                <el-table-column prop="SupplierID" label="供应商号" align="center"></el-table-column>
                <el-table-column prop="PageTypeID" label="所属类型" align="center"></el-table-column>
                <el-table-column prop="BackgroundColor" label="背景色" align="center"></el-table-column>
                <el-table-column prop="CreateManID" label="创建人" align="center"></el-table-column>
                <el-table-column prop="CreateTime" label="创建时间" align="center">
                    <template slot-scope="scope">
                        {{scope.row.CreateTime.substring(0,scope.row.CreateTime.length-4)}}
                    </template>
                </el-table-column>
                <el-table-column prop="LastUpdateManID" label="修改人" align="center"></el-table-column>
                <el-table-column prop="LastUpdateTime" label="修改时间" align="center"></el-table-column>
                <el-table-column label="操作" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" plain @click="handleEdit(scope.$index,scope.row)">修改</el-button>
                        <el-button type="primary" icon="el-icon-s-tools" @click="changeColu(scope.$index,scope.row);goPage()">修改页面</el-button>
                        <el-button type="danger" @click="open(scope.row)">废弃</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="PageIndex"
                :page-size= this.PageSize
                layout="total, prev, pager, next"
                :total= this.total
                style="text-align:right">
            </el-pagination>
        </div>
         <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%" :close-on-click-modal="false">
            <el-form ref="form" :model="form" label-width="70px">
                <!-- <el-form-item label="ID">
                    <el-input v-model="this.forms.ID" :disabled="true"></el-input>
                </el-form-item> -->
                <el-form-item label="页面名称">
                    <el-input v-model="form.pageName"></el-input>
                </el-form-item>
                <el-form-item label="背景颜色">
                    <el-input v-model="form.backgroundColor"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeItemInfo">确 定</el-button>
            </span>
        </el-dialog>
         <!-- 新增页面弹出框 -->
        <el-dialog title="新建" :visible.sync="editVisible2" width="45%" :close-on-click-modal="false">
            <el-form ref="form" :model="addPage" label-width="120px" :inline="true">
                <el-form-item label="页面名称" required>
                    <el-input v-model="addPage.PageName"></el-input>
                </el-form-item>
                <el-form-item label="页面类型编号" required>
                    <el-select v-model="addPage.PageTypeID" placeholder="请选择类型" clearable>
                        <el-option
                            v-for="item in formInline.options"
                            :key="item.ID"
                            :label="item.PageTypeName"
                            :value="item.ID"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <template v-if="!this.formInline.SupplierID">
                    <el-form-item label="主供应商号">
                        <el-select v-model="addPage.MainSupplierID" placeholder="主供应商" clearable filterable @change="getSupplier">
                            <el-option
                            v-for="item in option1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="供应商号">
                        <el-select v-model="addPage.SupplierID" placeholder="供应商" clearable filterable>
                            <el-option
                            v-for="item in option2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </template>
                <el-form-item label="背景颜色">
                    <el-input v-model="addPage.BackguoundColor"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>    
<script>
import {getPageList,getAddItemType,changeItemInfo,move,addPage,PageDelete} from "@/api/columnManagement"
import { SupplierListGetByLevel } from "@/api/goodsList"
import qs from 'qs';
    export default{
        name:'columnManagementList',
        data(){
            return{
                PageIndex:1,
                list:[],
                formInline:{        /* el-form */
                    type:'全部',        /* 类型 */
                    ID:'',              /* 页面编号 */
                    options:[],        /* 备选项 */
                    MainSupplierID:"",      /* 主供应商号 */
                    SupplierID:"",          /* 供应商号 */
                    PageTypeID:'',          /* 页面类型编号 */
                    PageName:'',            /* 页面名称 */
                },  
                resData:'',   
                editVisible: false,
                editVisible2: false,
                form:{
                    backgroundColor:'',
                    pageName:"",
                },
                changeOk:false,
                idx:-1,
                forms:{},
                addPage:{
                    PageName:'',        /* 新增页面-页面名称 */
                    PageTypeID:'',      /* 新增页面-页面类型编号 */
                    BackguoundColor:'',      /* 新增页面-页面颜色 */
                    MainSupplierID:'',          /* 主供应商号 */
                    SupplierID:'',              /* 供应商号 */
                },
                total:"",            /* 总页数 */
                currentPage1: 1,
                PageTypeID:'',                 /* 修改栏目用的id */
                ID:'',
                option1:[],
                option2:[],
                PageIndex:1,
                PageSize:10,
                row:{
                    ID:'',              /* 删除页面时用来存放当前的ID */
                }
            }
        },
        methods:{
            reset(){
                this.PageIndex = 1,
                this.PageSize = 10 
            },
            getPageType(){      /* 下拉菜单 */
                let params = {
                    PageIndex:1,
                }
                getAddItemType(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.formInline.options = JSON.parse(res.data.Result)
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
            clear(){
                this.formInline.ID=""
            },
            getData(){
                let params = {
                    PageIndex:this.PageIndex,
                    PageSize:this.PageSize,
                    ID:this.formInline.ID,
                    MainSupplierID:this.formInline.MainSupplierID,
                    SupplierID:this.formInline.SupplierID,
                    PageTypeID:this.formInline.PageTypeID,
                    PageName:this.formInline.PageName,
                }
                getPageList(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.resData = JSON.parse(res.data.Result)
                        this.total = this.resData.TotalCount
                    }
                    if(res.data.Success == 0){
                        this.$message(res.data.Result)
                        this.resData = ''
                        this.total = ''
                    }
                    if(res.data.Success == -998){
                        this.$message(res.data.Result)
                    }
                }).catch(function(e){
                    console.log(e)
                })
            },
            handleEdit(index, row) {
                console.log(row)
                this.idx = index;
                this.forms = row;
                this.editVisible = true;
                this.form.pageName = row.pageName
            },
            changeItemInfo(){       /* 点击确定 修改页面信息 */
                let params = {
                    ID:this.forms.ID,
                    BackgroundColor:this.form.backgroundColor,
                    PageName:this.form.pageName
                }
                changeItemInfo(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message('修改成功');
                        this.editVisible = false
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
            AddPage(){
                this.editVisible2 = true;
            },
            save(){         /* 新增 */
                let params = {
                    PageName:this.addPage.PageName,
                    PageTypeID:this.addPage.PageTypeID,
                    BackguoundColor:this.addPage.BackguoundColor,
                    MainSupplierID: this.formInline.SupplierID ? this.formInline.MainSupplierID : this.addPage.MainSupplierID,
                    SupplierID:this.formInline.SupplierID? this.formInline.SupplierID:this.addPage.SupplierID,
                }
                addPage(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message('数据添加成功');
                        this.editVisible2 = false;
                        this.addPage.PageName = '',
                        this.addPage.PageTypeID = '',
                        this.addPage.BackguoundColor  = '',
                        this.addPage.MainSupplierID = '',
                        this.addPage.SupplierID = ''
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
            handleSizeChange(val) {
                this.PageSize = val
                this.getData()
            },
            handleCurrentChange(val) {
                this.PageIndex = val;
                this.getData()
            },
            changeColu(index, row){       /* 修改栏目 */
                this.PageTypeID = row.PageTypeID;
                this.ID = row.ID
                this.PageName = row.PageName
            },
            goPage(id){
                this.$router.push({
                    path:'/columnManagement',
                    query:{
                        PageTypeID:this.PageTypeID,
                        ID:this.ID,
                        PageName:this.PageName
                    }
                })
            },
            getMainSupplier(){
                let params = {
                    Level:1
                }
                SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.option1 = JSON.parse(res.data.Result)
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
            getSupplier(){
                this.option2 = ''
                this.addPage.SupplierID = '',                   /* 新建 */
                this.formInline.SupplierID = ''                 /* 主页面 */
                let params = {
                    Level:2,
                    MainSupplierID:this.addPage.MainSupplierID 
                }
                SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.option2 = JSON.parse(res.data.Result)
                    }
                    if(res.data.Success == 0){
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -998){
                        this.$message(this.data.Result)
                    }
                }).catch(function(e){
                    console.log(e)
                })
            },
            getSupplierList(){
                this.option2 = ''
                this.formInline.SupplierID = ''                 /* 主页面 */
                let params = {
                    Level:2,
                    MainSupplierID:this.formInline.MainSupplierID 
                }
                SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.option2 = JSON.parse(res.data.Result)
                    }
                    if(res.data.Success == 0){
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -998){
                        this.$message(this.data.Result)
                    }
                }).catch(function(e){
                    console.log(e)
                    console.log('出错了')
                })
            },
            deletePage(){
                let params = {
                    ID:this.row.ID
                }
                PageDelete(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.getData()
                        this.$message.success('该页面已废弃')
                    }
                    if(res.data.Success == 0){
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -998){
                        this.$message(this.data.Result)
                    }
                }).catch(function(e){
                    console.log(e)
                    console.log('出错了')
                })
            },
            open(row) {
                this.row.ID = row.ID
                this.$confirm('此操作将影响页面显示，请务必确认无误, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deletePage()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            }
         },
        mounted(){
            this.getData();
            this.getPageType();
            this.getMainSupplier()
            // this.getSupplier()
        },
    }
</script>  
<style lang="scss" scoped>
    a{
        color:#fff
    }
</style>