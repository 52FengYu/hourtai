<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-bank-card"></i> 热搜词管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>         
        <div class="container">
            <div class="head">
                <h2>搜索词管理</h2>
            </div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>热搜词获取</span>
                    </div>
                    <el-form-item>
                        <el-select v-model="formInline.MainSupplierID" placeholder="主供应商" clearable filterable >
                            <el-option
                                v-for="item in option1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <el-button type="primary" @click="getData">搜索</el-button>
                    </el-form-item>
                    <el-form-item>
                        <div>
                            <el-input
                                type="textarea"
                                readonly
                                :rows="20"
                                placeholder="请输入多个热搜词，以回车隔行区分，将在首页搜索框位置自动轮播"
                                v-model="formInline.left">
                            </el-input>
                        </div>
                    </el-form-item>
                </el-card>
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>热搜词设置</span>
                    </div>
                    <el-form-item>
                        <el-select v-model="formInline.MainSupplierIDRight" placeholder="主供应商" clearable filterable >
                            <el-option
                                v-for="item in option1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        <el-button type="primary" @click="flag = true">修改</el-button>
                        <el-button type="primary" @click="flag = false">添加</el-button>
                    </el-form-item>
                    <el-form-item>
                        <template v-if="flag">
                            <div>
                                <el-input
                                    type="textarea"
                                    :rows="20"
                                    placeholder="请输入多个热搜词，以回车隔行区分，将在首页搜索框位置自动轮播"
                                    v-model="formInline.change">
                                </el-input>
                            </div>
                            <el-button type="primary" @click="changeHotWord">提交</el-button>
                        </template>
                        <template v-else>
                            <div>
                                <el-input
                                    type="textarea"
                                    readonly
                                    :rows="20"
                                    placeholder="请输入多个热搜词，以回车隔行区分，将在首页搜索框位置自动轮播"
                                    v-model="formInline.add">
                                </el-input>
                            </div>
                            <el-button type="primary" @click="addHotWord">提交</el-button>
                        </template>
                    </el-form-item>
                </el-card>
            </el-form>
        </div>
    </div>
</template>
<script>
import { PageHotSearchGetFromMainSupplierID,PageHotSearchUpdate } from '@/api/columnManagement'
import { SupplierListGetByLevel } from "@/api/goodsList"
import qs from 'qs'
    export default{
        data(){
            return{
                formInline:{
                    left:"",            /* 左侧的输入框 */
                    change:"",           /* 右侧的修改输入框 */
                    add:'',                 /* 右侧的添加输入框 */
                    MainSupplierID:'',      /* 左主供应商 */
                    MainSupplierIDRight:'',     /* 右侧主供应商 */
                },
                option1:[],                 /* 主供应商的候选 */
                flag:true,
            }
        },
        methods:{
            getData(){
                let params = {
                    MainSupplierID:this.formInline.MainSupplierID
                }
                PageHotSearchGetFromMainSupplierID(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.formInline.left = res.data.Result
                        this.formInline.change = res.data.Result
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
            getMainSupplier(){
                let params = {
                    Level:1
                }
                SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.option1 = JSON.parse(res.data.Result)
                    }
                    if(res.data.Success == 0){
                        console.log("数据请求失败，请重试")
                        console.log(res.data.Result)
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
            changeHotWord(){            /* 修改热词 */
                let params = {
                    MainSupplierID:this.formInline.MainSupplierIDRight,
                    HotSearch:this.formInline.change
                }
                PageHotSearchUpdate(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('修改成功')
                        this.getData()
                    }
                    if(res.data.Success == 0){
                        console.log("数据请求失败，请重试")
                        console.log(res.data.Result)
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
            addHotWord(){               /* 添加热词 */
                let params = {
                    MainSupplierID:this.formInline.MainSupplierIDRight,
                    HotSearch:this.formInline.add
                }
                PageHotSearchAdd(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('修改成功')
                        this.getData()
                    }
                    if(res.data.Success == 0){
                        console.log("数据请求失败，请重试")
                        console.log(res.data.Result)
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -998){
                        console.log("请求错误")
                    }
                }).catch(function(e){
                    console.log(e)
                    console.log('出错了')
                })
            }
        },
        created(){
            this.getData()
            this.getMainSupplier()
        }
    }
</script>
<style lang="scss">
    .el-form{
        display:flex;
        .el-card{
            width:40vw;
            margin:0 1vw;
            .el-form-item{
                width:100%;
                .el-form-item__content{
                    width:100%
                }
            }
        }
    }
</style>