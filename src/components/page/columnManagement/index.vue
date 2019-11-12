<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-s-unfold"></i> 栏目管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="类型">
                    <el-select v-model="formInline.ID" placeholder="请选择类型">
                        <el-option
                            v-for="item in formInline.options"
                            :key="item.ID"
                            :label="item.PageTypeName"
                            :value="item.ID"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">搜索</el-button>
                    <el-button type="primary" @click="clear">重置</el-button>
                    <el-button type="primary">添加</el-button>
                </el-form-item>
            </el-form>
            <el-table 
                :data="resData.ModelList" 
                border 
                style="width: 100%"
                class="table"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="ID" label="ID" width="300" align="center"></el-table-column>
                <el-table-column prop="PageName" label="名称" width="300" align="center"></el-table-column>
                <el-table-column prop="PageTypeID" label="所属类型" width="300" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center" fixed="right" min-width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" plain @click="handleEdit(scope.$index,scope.row)">修改</el-button>
                        <el-button type="primary" icon="el-icon-s-tools">修改栏目</el-button>
                        <!-- <el-button type="primary" icon="el-icon-caret-top" plain @click="moveUp(scope.$index,scope.row)">上移</el-button>
                        <el-button type="primary" icon="el-icon-caret-top" @click="moveDown">下移</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
        </div>
         <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="ID">
                    <el-input v-model="this.forms.ID" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="背景颜色">
                    <el-input v-model="form.backgroundColor"></el-input>
                </el-form-item>
                <el-form-item label="页面名称">
                    <el-input v-model="form.pageName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeItemInfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>    
<script>
import {getPageList,getAddItemType,changeItemInfo,move} from "@/api/columnManagement"
import qs from 'qs';
    export default{
        data(){
            return{
                PageIndex:1,
                list:[],
                formInline:{        /* el-form */
                    type:'全部',        /* 类型 */
                    ID:'',              /* ID */
                    options:[],        /* 备选项 */
                },  
                resData:'',   
                editVisible: false,
                form:{
                    backgroundColor:'',
                    pageName:"",
                },
                changeOk:false,
                idx:-1,
                forms:{},
            }
        },
        methods:{
            getPageLists(){          /* 列表获取 */
                let params = {
                    PageIndex:1
                }
                getPageList(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        console.log(JSON.parse(res.data.Result))
                        this.resData = JSON.parse(res.data.Result)
                        
                    }
                    if(res.data.Success == 0){
                        console.log("数据请求失败，请重试")
                        console.log(res.data.Result)
                    }
                    if(res.data.Success == -999){
                        console.log("用户未登录")
                        console.log(res.data)
                    }
                    if(res.data.Success == -998){
                        console.log("请求错误")
                    }
                }).catch(function(e){
                    console.log(e)
                    console.log('出错了')
                })
            },
            getPageType(){      /* 下拉菜单 */
                let params = {
                    PageIndex:1,
                }
                getAddItemType(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        console.log(JSON.parse(res.data.Result))
                        this.formInline.options = JSON.parse(res.data.Result)
                        console.log(this.formInline.options)
                    }
                    if(res.data.Success == 0){
                        console.log("数据请求失败，请重试")
                        console.log(res.data.Result)
                    }
                    if(res.data.Success == -999){
                        console.log("用户未登录")
                        console.log(res.data)
                    }
                    if(res.data.Success == -998){
                        console.log("请求错误")
                    }
                }).catch(function(e){
                    console.log(e)
                    console.log('出错了')
                })
            },
            clear(){
                this.formInline.ID=""
            },
            search(){
                console.log(this.formInline.ID)
                let params = {
                    PageIndex:1,
                    PageTypeID:this.formInline.ID
                }
                getPageList(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        console.log(JSON.parse(res.data.Result))
                        this.resData = JSON.parse(res.data.Result)
                    }
                    if(res.data.Success == 0){
                        console.log("数据请求失败，请重试")
                        console.log(res.data.Result)
                    }
                    if(res.data.Success == -999){
                        console.log("用户未登录")
                        console.log(res.data)
                    }
                    if(res.data.Success == -998){
                        console.log("请求错误")
                    }
                }).catch(function(e){
                    console.log(e)
                    console.log('出错了')
                })
            },
            handleEdit(index, row) {
                this.idx = index;
                this.forms = row;
                console.log(this.idx)
                this.editVisible = true;
            },
            changeItemInfo(){       /* 点击确定 修改页面信息 */
                let params = {
                    ID:this.forms.ID,
                    BackgroundColor:this.form.backgroundColor,
                    PageName:this.form.pageName
                }
                changeItemInfo(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        console.log(JSON.parse(res.data.Result))
                        this.$message('修改成功');
                        this.editVisible = false
                    }
                    if(res.data.Success == 0){
                        console.log(res.data.Result)
                    }
                    if(res.data.Success == -999){
                        console.log("用户未登录")
                        console.log(res.data)
                        this.$message('修改失败');
                    }
                    if(res.data.Success == -998){
                        console.log("请求错误")
                    }
                }).catch(function(e){
                    console.log(e)
                    console.log('出错了')
                })
            },
/*             moveUp(index, row){
                this.forms = row;
                console.log(row.ID)
                let params = {
                    ID:this.forms.ID,
                    MoveType:'UP' 
                }
                move(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        console.log(JSON.parse(res.data.Result))
                        this.$message('向上移动设置成功');
                    }
                    if(res.data.Success == 0){
                        console.log(res.data.Result)
                    }
                    if(res.data.Success == -999){
                        console.log("用户未登录")
                        console.log(res.data)
                        this.$message('修改失败');
                    }
                    if(res.data.Success == -998){
                        console.log("请求错误")
                    }
                }).catch(function(e){
                    console.log(e)
                    console.log('出错了')
                })
            },
            moveDown(index, row){

            }
 */        },
        mounted(){
            this.getPageLists();
            this.getPageType();
        },
    }
</script>  
<style lang="scss" scoped>

</style>