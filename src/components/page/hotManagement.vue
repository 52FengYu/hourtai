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
                        <span>搜索框轮播词设置</span>
                    </div>
                    <el-form-item>
                        <div>
                            <el-input
                                type="textarea"
                                :rows="20"
                                placeholder="请输入多个热搜词，以回车隔行区分，将在首页搜索框位置自动轮播"
                                v-model="formInline.left">
                            </el-input>
                        </div>
                        <el-button type="primary" @click="onSubmit">确认提交</el-button>
                    </el-form-item>
                </el-card>
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>大家都在搜热词设置</span>
                    </div>
                    <el-form-item>
                        <div>
                            <el-input
                                type="textarea"
                                :rows="20"
                                placeholder="请输入多个热搜词，以回车隔行区分，将在首页搜索框位置自动轮播"
                                v-model="formInline.right">
                            </el-input>
                        </div>
                        <el-button type="primary" @click="onSubmit">确认提交</el-button>
                    </el-form-item>
                </el-card>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                formInline:{
                    left:"",            /* 左侧的输入框 */
                    right:"",           /* 右侧的输入框 */
                }
            }
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