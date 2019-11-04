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
                                    <div class="block active">
                                        Banner轮播
                                        <div class="block-hover">
                                            <div class="layout"></div> 
                                            <div class="displayFlex">
                                                <span>下移</span> 
                                                <span>编辑</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="block">
                                        一行三个图（中间大）
                                        <div class="block-hover">
                                            <div class="layout"></div> 
                                            <div class="displayFlex">
                                                <span>上移</span><span>下移</span> <span>编辑</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="block">
                                        一行四个图
                                        <div class="block-hover">
                                            <div class="layout"></div> 
                                            <div class="displayFlex">
                                                <span>上移</span><span>下移</span> <span>编辑</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="block">
                                        门店推荐
                                        <div class="block-hover">
                                            <div class="layout"></div> 
                                            <div class="displayFlex">
                                                <span>上移</span><span>下移</span> <span>编辑</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="block">
                                        一行一个专题
                                        <div class="block-hover">
                                            <div class="layout"></div> 
                                            <div class="displayFlex">
                                                <span>上移</span><span>下移</span> <span>编辑</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="block">
                                        一行一个专题
                                        <div class="block-hover">
                                            <div class="layout"></div> 
                                            <div class="displayFlex">
                                                <span>上移</span><span>下移</span> <span>编辑</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="block">
                                        一行一个专题
                                        <div class="block-hover">
                                            <div class="layout"></div> 
                                            <div class="displayFlex">
                                                <span>上移</span> <span>编辑</span>
                                            </div>
                                        </div>
                                    </div>
                                </el-scrollbar>
                                <el-popover
                                    placement="top"
                                    width="800"
                                    trigger="click">
                                        <el-card class="box-card" :data="gridData">
                                            <div slot="header" class="clearfix">
                                                <span>选择模板类型</span>
                                            </div>
                                            <el-form :inline="true" class="demo-form-inline">       <!-- 动态 -->
                                                <el-form-item>
                                                    <div>
                                                        <p>banner轮播</p>
                                                        <img src="" alt="">
                                                    </div>
                                                </el-form-item>
                                            </el-form>
                                        </el-card>
                                    <el-button slot="reference">+</el-button>
                                    </el-popover>
                            </div>
                        </div>
                        <div class="style-sdit large">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>已选栏目：Banner轮播 &nbsp;&nbsp;   </span>
                                    <el-button style="float: right; padding: 3px 0" type="text">删除栏目</el-button>
                                </div>
                                <el-card>
                                    <div slot="header" class="clearfix">
                                        <span>填写信息</span>
                                        <el-button style="float: right; padding: 3px 0" type="text">删除</el-button>
                                        <el-button style="float: right; padding: 3px 0" type="text">下移</el-button>
                                    </div>
                                    <div>
                                        <el-form ref="form" label-width="80px">         <!-- 动态 -->
                                            <el-form-item label="banner图">
                                                <img src="" alt="">
                                            </el-form-item>
                                            <el-form-item label="活动链接">
                                                <el-input v-model="form.activeLink" placeholder="请输入活动链接"></el-input>
                                            </el-form-item>
                                            <el-form-item label="活动名称">
                                                <el-input v-model="form.activeName" placeholder="请输入活动名称"></el-input>
                                            </el-form-item>
                                            <el-form-item label="背景底色">
                                                <el-input v-model="form.background" placeholder="请填写背景底色"></el-input>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                </el-card>
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
    export default {
        data() {
            return {
                form:{
                    activeLink:'',      /* 活动链接 */
                    activeName:"",      /* 活动名称 */
                    background:'',      /* 活动底色 */
                },
                gridData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                    }]
            }
        },
        created() {
             
        },
        computed: {

        },
        methods: {
            onSubmit(){
                alert('提交成功')
            }
        }
    }
</script>  