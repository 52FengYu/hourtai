<template>
    <div class="member">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-s-unfold"></i> 栏目管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-card class="box-card">
                    <div class="display-flex">
                        <div class="preview large">
                            <div class="head">
                                <template>
                                    <el-tabs v-model="activeName">
                                        <el-tab-pane label="功能首页" name="first"></el-tab-pane>
                                    </el-tabs>
                                </template>
                            </div>
                            <div class="content">
                                <el-scrollbar>
                                    <div class="block" v-for="(item,k) in this.Features" :key="k" :class="activeClass ==k?'active':''">
                                        {{item.ContentTypeName}}
                                        <div class="block-hover">
                                            <div class="layout"></div> 
                                            <div class="displayFlex">
                                                <el-button type="text" @click="moveUp($event);" :id="item.ID" >上移</el-button>
                                                <el-button type="text" @click="moveDown($event)" :id="item.ID">下移</el-button>
                                                <el-button type="text" @click="edit($event);IsActive(k)" :id="item.ID">编辑</el-button>
                                            </div>
                                        </div>
                                    </div>
                                </el-scrollbar>
                                 <el-dialog title="新增" :visible.sync="editVisible" width="50%">
                                        <el-card class="box-card" :data="gridData">
                                            <div slot="header" class="clearfix">
                                                <span>选择模板类型</span>
                                            </div>
                                            <el-form :inline="true" class="demo-form-inline" ref="form" :model="newPage">       
                                                <el-form-item label="页面类型编号（必填）">
                                                    <el-input v-model="newPage.ContentTypeID"></el-input>
                                                </el-form-item>
                                                <el-form-item label="只对新会员可见（必填）">
                                                    <el-switch v-model="newPage.IsNewMemberSee"></el-switch>
                                                </el-form-item>
                                                <el-form-item label="背景图">
                                                    <el-input v-model="newPage.BackGroundImageURL"></el-input>
                                                </el-form-item>
                                                <el-form-item label="背景颜色">
                                                    <el-input v-model="newPage.BackGroundColor"></el-input>
                                                </el-form-item>
                                                <el-form-item label="页面编号（必填）">
                                                    <el-input v-model="newPage.PageID"></el-input>
                                                </el-form-item>
                                            </el-form>
                                            <span slot="footer" class="dialog-footer">
                                                <el-button @click="editVisible = false">取 消</el-button>
                                                <el-button type="primary" @click="addPageContent">确 定</el-button>
                                            </span>
                                        </el-card>
                                </el-dialog>
                                <el-button slot="reference" @click="editVisible=true">+</el-button>
                            </div>
                        </div>
                        <div class="style-sdit large">
                            <el-card class="box-card">
                                    <div v-for="item in this.content">
                                        <div slot="header" class="clearfix">
                                            <span>填写信息</span>
                                            <el-button style="float: right; padding: 3px 0" type="text" :id="item.ID" @click="deleteInfo($event)">删除</el-button>
                                            <el-button style="float: right; padding: 3px 0" type="text" :id="item.ID" @click="infoMoveDown($event)">下移</el-button>
                                            <el-button style="float: right; padding: 3px 0" type="text" :id="item.ID" @click="infoMoveUp($event)">上移</el-button>
                                        </div>
                                        <div>
                                            <el-form ref="form" label-width="80px">         <!-- 动态 -->
                                                <el-form-item label="banner图">
                                                    <img :src="item.BackgroundImageURL" alt="没有添加banner图">
                                                </el-form-item>
                                                <el-form-item label="活动链接">
                                                    <el-input v-model="item.LinkURL" placeholder="请输入活动链接"></el-input>
                                                </el-form-item>
                                                <el-form-item label="活动名称">
                                                    <el-input v-model="item.Title" placeholder="请输入活动名称"></el-input>
                                                </el-form-item>
                                                <el-form-item label="背景底色">
                                                    <el-input v-model="item.BackgroundColor" placeholder="请填写背景底色"></el-input>
                                                </el-form-item>
                                                <el-form-item label="序号">
                                                    <el-input v-model="item.OrderID" placeholder="请填写序号"></el-input>
                                                </el-form-item>
                                            </el-form>
                                        </div>
                                    </div>
                            </el-card>
                        </div>
                    </div>
            </el-card>
            <div class="button">
                <el-button type="primary" @click="onSubmit">确认提交</el-button>
                <el-button type="primary" @click="">预览</el-button>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .content .el-scrollbar .el-scrollbar__wrap{
        overflow: scroll;
        overflow-x: hidden!important; 
    }
    .el-scrollbar {
        height: 550px!important;
        padding-bottom:10px;
        .el-scrollbar__wrap{
            overflow: hidden!important;
            overflow-y: scroll;
            height: 100%;
        }
    }
    .el-tabs__header {
        position: relative;
        margin: 0 0 15px;
        padding: 0 10px;
        width: 86%;
    }
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }
    .container {
        padding:16px 20px 8px 20px;
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    .el-card__body {
        padding: 16px 20px 8px 20px;
    }
    .el-row{
        margin-top: -24%;
        button{
            width:100%
        }
    }
    .container{
        .el-card__body{
            padding:0!important
        }
        .box-card{
            .display-flex{
                display:flex;
                justify-content: space-between;
                .preview{
                    width: 20vw;
                    .head{

                    }
                    .content{
                        .el-scrollbar{
                            .el-scrollbar__wrap{
                                .el-button{
                                    color:#fff!important;
                                    font-size:2vh!important
                                }
                            }
                        }
                        overflow:hidden;
                        .active{
                            background: rgb(217,217,217)
                        }
                        .block{
                            position:relative;
                            margin-bottom:10px;
                            padding:10px;
                            border:1px solid #ccc;
                            width:302px;
                            height:78px;
                            font-size: 18px;
                            line-height: 72px;
                            .block-hover{
                                display:none;
                            }
                        }
                        .block:hover {
                            .block-hover{
                                position: absolute;
                                top: 0%;
                                left: 0%;
                                padding:0;
                                margin-left:0;
                                // display: block;
                                display:flex;
                                justify-content: center;
                                line-height:500%;
                                width: 100%;
                                height: 100%;
                                background-color: rgba(0, 0, 0, 0.5);
                                color: #fff;
                                .displayFlex{
                                    padding:0;
                                    span{
                                        // display:block;
                                    }
                                } 
                            }
                        }
                    }
                    .el-popover__reference{
                        width:100%
                    }
                }
                .style-sdit{
                    width:70vw;
                    border:0;
                    box-shadow: none;
                    height:68vh;
                    overflow-y: scroll;
                    .el-card,.box-card{
                        box-shadow: none!important;
                        -webkit-box-shadow:none!important;
                    }
                    .is-always-shadow{
                        box-shadow: none!important;
                        -webkit-box-shadow:none!important;
                    }
                    .el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover {
                        -webkit-box-shadow: none ; 
                        box-shadow: none ; 
                    }
                }
                .large{
                    
                }
            }
        }
        .button{
            text-align: center;
            margin:1.5vh 0;
        }
    }
</style>

<script>
import { getItemInfo,move,getItemContentInfo,changeItemContentInfo,moveItemContentInfo,deleteItemContentInfo } from "@/api/columnManagement"
import qs from 'qs';
    export default {
        data() {
            return {
                newPage:{
                    ContentTypeID:'1313',       /* 新增 */
                    IsNewMemberSee:false,
                    BackGroundColor:"",
                    BackGroundImageURL:"",
                    PageID:'',
                    OrderID:'',
                },
                editVisible:false,
                ID:'',                  /* 上一个页面传过来的id */
                Features:'',            /* 功能首页的value */
                content:'',             /* 右侧内容value */
                activeClass: -1,// 0为默认选择第一个，-1为不选择
                form:{
                    activeLink:'',      /* 活动链接 */
                    activeName:"",      /* 活动名称 */
                    background:'',      /* 活动底色 */
                },
            }
        },
        created() {
             this.feature()
             
        },
        computed: {
            
        },
        methods: {
            onSubmit(){
                alert('提交成功')
            },
            feature(){
                let params = {
                    PageID:decodeURI(location.href).split('?')[1].split('=')[1],
                }
                getItemInfo(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.Features = JSON.parse(res.data.Result)
                        console.log(this.Features)
                        this.getData()
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
            moveUp(e){
                let params = {
                    ID:e.currentTarget.id,
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
            moveDown(e){
                let params = {
                    ID:e.currentTarget.id,
                    MoveType:'DOWN' 
                }
                move(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        console.log(JSON.parse(res.data.Result))
                        this.$message('向下移动设置成功');
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
            edit(e){
                let params = {
                    PageContentId:e.currentTarget.id
                }
                console.log(this.Features[0].ContentTypeID)
                getItemContentInfo(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        console.log(JSON.parse(res.data.Result))
                        this.content = JSON.parse(res.data.Result)
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
            getData(){
                let params = {
                    PageContentId:this.Features[0].ID
                }
                console.log(this.Features[0].ContentTypeID)
                getItemContentInfo(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        console.log(JSON.parse(res.data.Result))
                        this.content = JSON.parse(res.data.Result)
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
            IsActive(k) {
                this.activeClass = k;
            },
            infoMoveUp(e){
                console.log(e.currentTarget.id)
                let params = {
                    ID:e.currentTarget.id,
                    MoveType:'UP' 
                }
                moveItemContentInfo(qs.stringify(params)).then((res)=>{
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
            infoMoveDown(e){
                console.log(e.currentTarget.id)
                let params = {
                    ID:e.currentTarget.id,
                    MoveType:'DOWN' 
                }
                moveItemContentInfo(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        console.log(JSON.parse(res.data.Result))
                        this.$message('向下移动设置成功');
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
            deleteInfo(e){
                console.log(e.currentTarget.id)
                let params = {
                    ID:e.currentTarget.id,
                }
                deleteItemContentInfo(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        console.log(JSON.parse(res.data.Result))
                        this.$message('删除成功');
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
            addPageContent(){
                console.log(e.currentTarget.id)
                let params = {
                    ContentTypeID:this.newPage.ContentTypeID,
                    IsNewMemberSee:this.newPage.IsNewMemberSee,
                    BackGroundColor:this.newPage.BackGroundColor,
                    BackGroundImageURL:this.newPage.BackGroundImageURL,
                    PageID:this.newPage.PageID,
                }
                deleteItemContentInfo(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        console.log(JSON.parse(res.data.Result))
                        this.$message('删除成功');
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
            }
        }
    }
</script>  