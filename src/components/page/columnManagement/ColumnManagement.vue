<template>
    <div class="member">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-s-unfold"></i> 栏目管理 / {{this.PageName}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-card class="box-card">
                    <div class="display-flex">
                        <div class="preview large">
                            <div class="head">
                                <template>
                                    <el-tabs>
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
                                                <el-button type="text" @click="deleteItem($event)" :id="item.ID">删除</el-button>
                                                <el-button type="text" @click="change($event)" :id="item.ID">修改</el-button>
                                                <el-button type="text" @click="edit($event)" :id="item.ID">编辑</el-button>
                                            </div>
                                        </div>
                                    </div>
                                </el-scrollbar>

                                <!-- 新增页面内容 -->
                                 <el-dialog title="新增" :visible.sync="editVisible" width="50%" :close-on-click-modal="false">
                                            <div slot="header" class="clearfix">
                                                <span>选择模板类型</span>
                                            </div>
                                            <el-form  class="demo-form-inline" ref="form" :model="newPage">       
                                                <el-form-item label="*页面内容类型编号">
                                                    <el-select v-model="newPage.ContentTypeID" placeholder="请选择类型" clearable>
                                                        <el-option
                                                            v-for="item in options"
                                                            :key="item.ID"
                                                            :label="item.ContentTypeName"
                                                            :value="item.ID"
                                                        >
                                                        </el-option>
                                                    </el-select>
                                                </el-form-item>
                                                <!-- <el-form-item label="*页面编号">
                                                    <el-input v-model="newPage.PageID" :disabled="true"></el-input>
                                                </el-form-item> -->
                                                <el-form-item label="背景颜色">
                                                    <el-input v-model="newPage.BackGroundColor"></el-input>
                                                </el-form-item>
                                                <el-form-item label="序号">
                                                    <el-input v-model="newPage.OrderID"></el-input>
                                                </el-form-item>
                                                <el-form-item label="特殊标签">
                                                    <el-input v-model="newPage.Note"></el-input>
                                                </el-form-item>
                                                <el-form-item label="*只对新会员可见">
                                                    <el-select v-model="newPage.IsNewMemberSee" placeholder="只对新会员可见" clearable >
                                                        <el-option label="是" value="Y"></el-option>
                                                        <el-option label="否" value="N"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                                <el-form-item label="背景图"><!--  -->
                                                    <el-upload
                                                        action= '/adminwebapi/api/Image/UploadImage'
                                                        list-type="picture-card"
                                                        :on-success="handleAvatarSuccess2"
                                                        accept="image/png, image/jpeg, image/gif, image/jpg, image/bmp"
                                                        :limit='1'
                                                        :file-list="fileLists1"
                                                        :on-error="imgUploadError"
                                                        :headers="TokenID"
                                                        :data="upLoadData"
                                                        >
                                                        <i class="el-icon-plus"></i>
                                                    </el-upload>
                                                </el-form-item>
                                            </el-form>
                                            <span slot="footer" class="dialog-footer">
                                                <el-button @click="editVisible = false">取 消</el-button>
                                                <el-button type="primary" @click="addPageContent">确 定</el-button>
                                            </span>
                                </el-dialog>
                                <el-button slot="reference" @click="editVisible=true">+</el-button>
                            </div>
                        </div>
                        <!-- 右侧 -->
                        <div class="style-sdit large">
                            <el-card class="box-card">
                                <div v-for="item in this.content" :key="item.ID">
                                    <div slot="header" class="clearfix">
                                        <span>填写信息</span>
                                        <el-button style="float: right; padding: 3px 0" type="text" :id="item.ID" @click="deleteInfo($event)">删除</el-button>
                                        <el-button style="float: right; padding: 3px 0" type="text" :id="item.ID" @click="infoMoveDown($event)">下移</el-button>
                                        <el-button style="float: right; padding: 3px 0" type="text" :id="item.ID" @click="infoMoveUp($event)">上移</el-button>
                                        <el-button style="float: right; padding: 3px 0" type="text" :id="item.ID" @click="InfoEdit($event)">编辑</el-button>
                                    </div>
                                    <div>
                                        <el-form ref="form" label-width="80px">         <!-- 动态 -->
                                            <el-form-item label="banner图">
                                                <el-image :src="item.BackgroundImageURL" v-if="item.BackgroundImageURL.substr(0,4) == 'http'"></el-image>
                                                <el-image :src="'http://images.liqunshop.com/' + item.BackgroundImageURL" v-if="item.BackgroundImageURL != '' && item.BackgroundImageURL.substr(0,4) != 'http'"></el-image>
                                                <span v-if="item.BackgroundImageURL == null"></span>
                                            </el-form-item>
                                            <el-form-item label="活动链接">
                                                <el-input v-model="item.LinkURL" :disabled="true" placeholder="请输入活动链接"></el-input>
                                            </el-form-item>
                                            <el-form-item label="活动名称">
                                                <el-input v-model="item.Title" :disabled="true" placeholder="请输入活动名称"></el-input>
                                            </el-form-item>
                                            <el-form-item label="背景底色">
                                                <el-input v-model="item.BackgroundColor" :disabled="true" placeholder="请填写背景底色"></el-input>
                                            </el-form-item>
                                            <el-form-item label="序号">
                                                <el-input v-model="item.OrderID" :disabled="true" placeholder="请填写序号"></el-input>
                                            </el-form-item>
                                            <el-form-item label="商品编号">
                                                <el-input v-model="item.ProductID" :disabled="true" placeholder="请填写商品编号"></el-input>
                                            </el-form-item>
                                            <el-form-item label="活动号">
                                                <el-input v-model="item.PromotionID" :disabled="true" placeholder="请填写活动号"></el-input>
                                            </el-form-item>
                                        </el-form>

                                        <!-- 右侧修改弹出框 -->
                                        <el-dialog title="编辑" :visible.sync="editVisible2" width="50%" :close-on-click-modal="false">
                                            <el-form ref="form" :model="InfoForm"  label-width="80px">              <!-- this.InfoForm.BackGroundImageURL -->
                                                <el-form-item label="banner图">     <!--  -->
                                                    <el-upload
                                                        action= '/adminwebapi/api/Image/UploadImage'
                                                        list-type="picture-card"
                                                        :on-success="handleAvatarSuccess"
                                                        :on-error="imgUploadError"
                                                        :on-remove ='ChangeRemovePicture'
                                                        accept="image/png, image/jpeg, image/gif, image/jpg, image/bmp"
                                                        :limit='1'
                                                        :file-list="fileLists2"
                                                        :headers="TokenID"
                                                        :data="upLoadData"
                                                        >
                                                        <i class="el-icon-plus"></i>
                                                    </el-upload>
                                                </el-form-item>
                                                <el-form-item label="背景色">
                                                    <el-input v-model="InfoForm.BackgroundColor" placeholder="请填写背景色"></el-input>
                                                </el-form-item>
                                                <el-form-item label="活动链接">
                                                    <el-input v-model="InfoForm.LinkURL" placeholder="请输入活动链接（非必填）"></el-input>
                                                </el-form-item>
                                                <el-form-item label="标题">
                                                    <el-input v-model="InfoForm.Title" placeholder="请输入标题（非必填）"></el-input>
                                                </el-form-item>
                                                <el-form-item label="商品编码">
                                                    <el-input v-model="InfoForm.ProductID" placeholder="请填写商品编码（非必填）"></el-input>
                                                </el-form-item>
                                                <el-form-item label="活动号">
                                                    <el-input v-model="InfoForm.PromotionID" placeholder="请填写活动号（非必填）"></el-input>
                                                </el-form-item>
                                            </el-form>
                                            <span slot="footer" class="dialog-footer">
                                                <el-button @click="editVisible2 = false">取 消</el-button>
                                                <el-button type="primary" :id="item.ID"  @click="addSave($event)">确 定</el-button>
                                            </span>
                                        </el-dialog>
                                    </div>
                                </div>
                                <div style="margin:0 auto; text-align:center">
                                    <el-button type="primary" plain @click="editVisible3 = true" text-align="center">新增页面明细</el-button>
                                </div>
                            </el-card>
                        </div>
                    </div>
            </el-card>
            <div class="button">
                <el-button type="primary" @click="onSubmit">确认提交</el-button>
                <el-button type="primary" @click="temp">预览</el-button>
                <!-- <el-button type="primary" plain @click="editVisible3 = true">新增页面明细</el-button> -->
            </div>
        </div>

        <!-- 添加页面明细 -->
        <el-dialog title="添加页面明细" :visible.sync="editVisible3" width="50%" :close-on-click-modal="false">
            <el-form ref="form" :model="addPageContentInfo"  label-width="110px">
                <el-form-item label="banner图"><!--  -->
                    <el-upload
                        action= '/adminwebapi/api/Image/UploadImage'
                        list-type="picture-card"
                        :on-success="handleAvatarSuccess3"
                        :on-error="imgUploadError"
                        accept="image/png, image/jpeg, image/gif, image/jpg, image/bmp"
                        :limit='1'
                        :file-list="fileLists3"
                        :headers="TokenID"
                        :data="upLoadData"
                        >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="背景色">
                    <el-input v-model="addPageContentInfo.BackGroundColor" placeholder="请填写背景色"></el-input>
                </el-form-item>
                <el-form-item label="活动链接">
                    <el-input v-model="addPageContentInfo.LinkURL" placeholder="请输入活动链接（非必填）"></el-input>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="addPageContentInfo.Title" placeholder="请输入标题（非必填）"></el-input>
                </el-form-item>
                <el-form-item label="序号">
                    <el-input v-model="addPageContentInfo.OrderID" placeholder="请填写序号"></el-input>
                </el-form-item>
                <!-- <el-form-item label="页面内容编号">
                    <el-select v-model="addPageContentInfo.pageContentID" clearable placeholder="请选择">
                        <el-option
                            v-for="item in Features"
                            :key="item.ID"
                            :label="item.ContentTypeName"
                            :value="item.ID">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="商品编码">
                    <el-input v-model="addPageContentInfo.ProductID" placeholder="请填写商品编码（非必填）"></el-input>
                </el-form-item>
                <el-form-item label="活动号">
                    <el-input v-model="addPageContentInfo.PromotionID" placeholder="请填写活动号（非必填）"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible3 = false">取 消</el-button>
                <el-button type="primary"   @click="PageContentInfo">确 定</el-button>
            </span>
        </el-dialog>
        
        <!-- 修改页面内容 -->
            <el-dialog title="修改" :visible.sync="editVisible4" width="50%" :close-on-click-modal="false">
                    <div slot="header" class="clearfix">
                        <span>选择模板类型</span>
                    </div>
                    <el-form :inline="true" class="demo-form-inline" ref="form" :model="changePage">       
                        <!-- <el-form-item label="*页面内容编号">
                            <el-input v-model="changePage.PageContentCode" :disabled="true"></el-input>
                        </el-form-item> -->
                        <el-form-item label="背景颜色">
                            <el-input v-model="changePage.BackgroundColor"></el-input>
                        </el-form-item>
                        <el-form-item label="特殊标签">
                            <el-input v-model="changePage.Note"></el-input>
                        </el-form-item>
                        <el-form-item label="*只对新会员可见">
                            <el-select v-model="changePage.IsNewMemberSee" placeholder="只对新会员可见" clearable >
                                <el-option label="是" value="Y"></el-option>
                                <el-option label="否" value="N"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="背景图">   <!--  -->
                            <el-upload
                                action= '/adminwebapi/api/Image/UploadImage'
                                list-type="picture-card"
                                :on-success="handleAvatarSuccess4"
                                accept="image/png, image/jpeg, image/gif, image/jpg, image/bmp"
                                :limit='1'
                                :file-list="fileLists4"
                                :headers="TokenID"
                                :data="upLoadData"
                                >
                                <i class="el-icon-plus"></i>
                            </el-upload>
<!--                             <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
 -->                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="editVisible4 = false">取 消</el-button>
                        <el-button type="primary" @click="changePageContent">确 定</el-button>
                    </span>
        </el-dialog>
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
                    .content>.el-button{
                        width:100%
                    }
                    .content{
                        .el-scrollbar{
                            .el-scrollbar__wrap{
                                .el-button{
                                    color:#fff!important;
                                    font-size:1.6vh!important
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
            }
        }
        .button{
            text-align: center;
            margin:1.5vh 0;
        }
    }
    
</style>

<script>
import { getItemInfo,move,getItemContentInfo,changeItemContentInfo,moveItemContentInfo,deleteItemContentInfo,addItemInfo,getPageJS,getAddItemType,addItemContentInfo,getItemType,changeItemContent,deleteItemInfo } from "@/api/columnManagement"
import qs from 'qs';
export default {
    inject:['reload'],
    name:'columnManagement',
        data() {
            return {
                newPage:{
                    // ContentTypeID:'',       /* 新增 */
                    // IsNewMemberSee:false,
                    // BackGroundColor:"",
                    // BackGroundImageURL:"",
                    // PageID:'',
                    // OrderID:'',
                    // Note:''
                },
                addPageContentInfo:{
                    BackGroundImageURL:'',
                    LinkURL:"",
                    Title:'',
                    BackGroundColor:'',
                    PromotionID:'',
                    ProductID:'',
                    OrderID:'',
                    pageContentID:'',
                    Picture:''
                },
                InfoForm:{
                    BackGroundImageURL:'',
                    LinkURL:"",
                    Title:'',
                    BackgroundColor:'',
                    PromotionID:'',
                    ProductID:'',
                    Picture:''
                },
                editVisible:false,
                editVisible2:false,
                editVisible3:false,
                editVisible4:false,        /* 修改页面内容 */
                ID:'',                  /* 上一个页面传过来的id */
                Features:'',            /* 功能首页的value */
                content:'',             /* 右侧内容value */
                activeClass: -1,// 0为默认选择第一个，-1为不选择
                form:{
                    activeLink:'',      /* 活动链接 */
                    activeName:"",      /* 活动名称 */
                    background:'',      /* 活动底色 */
                },
                options:[],
                TokenID:{
                    TokenID:sessionStorage.getItem('TokenID'),
                },
                upLoadData:{
                    ImageUseType:'Page'           /*  Page，ProductContent，ProductHead */
                },
                fileLists4:[],              /* 修改页面信息 */
                fileLists3:[],              /* 增加页面明细 */
                fileLists2:[],
                fileLists1:[],
                changePage:{
                    PageContentCode:'',         /* 修改时的页面内容编号 */
                    BackGroundImageURL:'',
                    BackGroundColor:'',
                    IsNewMemberSee:'',
                    Note:'',
                    Picture:''
                },
                PageContentID:'',
                PageName:'',
                editID:'',
                row:{
                    ID:''
                }
            }
        },
        created() {
             this.feature()
             this.getPageType()
        },
        computed: {
            
        },
        methods: {
            // 预览
            temp(){     
                let params = {
                    PageID:decodeURI(location.href).split('&')[1].split('=')[1],
                    CreateType:'TEMP',
                }
                getPageJS(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        setTimeout(window.open(`https://o2o.liqunshop.com/view/page/Index.html?pageid=${res.data.Result}&PageOpenType=Share&t=${Date.parse(new Date())/1000} `),500)
                    }
                    if(res.data.Success == 0){
                        this.$message('生成页面信息失败');
                    }
                    if(res.data.Success == -998){
                        console.log("请求错误")
                        this.$message('生成失败');
                    }
                }).catch(function(e){
                    console.log(e)
                    console.log('出错了')
                })
            },
            // 刚开始的数据请求
            feature(){
                this.newPage.PageID = decodeURI(location.href).split('&')[1].split('=')[1]
                let params = {
                    PageID:decodeURI(location.href).split('&')[1].split('=')[1],
                }
                getItemInfo(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.Features = JSON.parse(res.data.Result)
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
            // 提交
            onSubmit(){
                let params = {
                    PageID:decodeURI(location.href).split('&')[1].split('=')[1],
                    CreateType:'USED ',
                }
                getPageJS(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        setTimeout(window.open(`https://o2o.liqunshop.com/view/page/Index.html?pageid=${res.data.Result}&PageOpenType=Share&t=${Date.parse(new Date())/1000} `),500)
                    }
                    if(res.data.Success == 0){
                        this.$message('生成页面信息失败');
                    }
                    if(res.data.Success == -998){
                        this.$message('生成页面信息失败');
                    }
                }).catch(function(e){
                    console.log(e)
                })
            },
            // 左边的上移
            moveUp(e){
                let params = {
                    ID:e.currentTarget.id,
                    MoveType:'UP' 
                }
                move(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('向上移动设置成功');
                        this.reload()
                        this.getData()
                        this.feature()
                    }
                    if(res.data.Success == 0){
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -998){
                        this.$message('目前已经是第一个');
                    }
                }).catch(function(e){
                    console.log(e)
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
                        this.$message.success('向下移动设置成功');
                        this.reload()
                        this.getData()
                        this.feature()
                    }
                    if(res.data.Success == 0){
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -998){
                        this.$message('目前已经是最后一个');
                    }
                }).catch(function(e){
                    console.log(e)
                })
            },
            deleteItem(e){                  /* 删除页面内容 */
                let params = {
                    ID:e.currentTarget.id,
                }
                deleteItemInfo(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('删除成功');
                        // this.reload()
                        // this.editVisible = false
                        // this.getData()
                        this.feature()
                        
                    }
                    if(res.data.Success == 0){
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -998){
                        this.$message('目前已经是最后一个');
                    }
                }).catch(function(e){
                    console.log(e)
                })
            },
            edit(e){            /* 左侧编辑 */
                if(e){
                    this.PageContentID = e.target.parentElement.id
                }
                let params = {
                    PageContentId:this.PageContentID
                }
                getItemContentInfo(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.content = JSON.parse(res.data.Result)
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
            change(e){                  /* 点击修改 */
                this.row.ID = e.srcElement.parentElement.attributes.id.value
                this.editVisible4 = true
                this.fileLists4 = []
                console.log(this.row.ID)
                var ID = this.row.ID
                console.log(this.Features)
                var data = this.Features.find(function(e){return e.ID == ID})
                console.log(data)
                this.changePage = data
                if(data.BackgroundImageURL.substr(0,4) == 'http'){
                    this.fileLists4.push({url:data.BackgroundImageURL})
                }else{
                    this.fileLists4.push({url:'http://images.liqunshop.com/' + data.BackgroundImageURL})
                }
                this.changePage.Picture = data.BackgroundImageURL
                console.log(this.row.ID)
            },
            changePageContent(){        /* 修改页面内容  提交 */
                let params = {
                    ID:this.row.ID,
                    BackGroundColor:this.changePage.BackgroundColor,
                    BackGroundImageURL:this.changePage.Picture,
                    IsNewMemberSee:this.changePage.IsNewMemberSee,
                    Note:this.changePage.Note
                }
                changeItemContent(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('修改成功')
                        this.changePage = {}
                        this.fileLists4 = []
                        this.editVisible4 = false
                        this.feature()
                    }
                    if(res.data.Success == 0){
                        this.$message(res.data.Result)
                        this.changePage = {}
                        this.fileLists4 = []
                    }
                    if(res.data.Success == -998){
                        this.$message(res.data.Result)
                    }
                }).catch(function(e){
                    console.log(e)
                })
            },
            getData(){                  /* 根据页面内容编号获取页面内容明细类别 */
                let params = {
                    PageContentId:this.Features[0].ID
                }
                getItemContentInfo(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.content = JSON.parse(res.data.Result)
                        this.newPage.PageID = decodeURI(location.href).split('&')[1].split('=')[1]
                        this.PageName = decodeURI(location.href).split('&')[2].split('=')[1]
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
            IsActive(k) {
                this.activeClass = k;
            },
            infoMoveUp(e){
                let params = {
                    ID:e.currentTarget.id,
                    MoveType:'UP' 
                }
                moveItemContentInfo(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message('向上移动设置成功');
                        this.edit()
                        console.log('上移')
                    }
                    if(res.data.Success == 0){
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -998){
                        this.$message('目前已经是第一个');
                    }
                }).catch(function(e){
                    console.log(e)
                })
            },
            infoMoveDown(e){
                console.log(e.currentTarget.id)
                let params = {
                    ID:e.currentTarget.id,
                    MoveType:'DOWN' 
                }
                moveItemContentInfo(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message('向下移动设置成功');
                        this.edit()
                        console.log('下移')
                    }
                    if(res.data.Success == 0){
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -998){
                        this.$message('目前已经是最后一个');
                    }
                }).catch(function(e){
                    console.log(e)
                })
            },
            deleteInfo(e){                      /* 删除页面明细 */
                let params = {
                    ID:e.currentTarget.id,
                }
                deleteItemContentInfo(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message('删除成功');
                        this.edit()
                        this.getData()
                        console.log('删除')
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
            addPageContent(){
                let params = {
                    ContentTypeID:this.newPage.ContentTypeID,
                    IsNewMemberSee:this.newPage.IsNewMemberSee == true ? "Y" :"N",
                    BackGroundColor:this.newPage.BackGroundColor,
                    BackGroundImageURL:this.newPage.BackGroundImageURL,
                    PageID: decodeURI(location.href).split('&')[1].split('=')[1],
                    OrderID:this.newPage.OrderID,
                    Note:this.newPage.Note
                }
                addItemInfo(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('添加成功');
                        // this.reload()
                        this.editVisible = false
                        // this.getData()
                        this.feature()
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
            InfoEdit(e){                            /* 右侧的编辑 */
                this.editVisible2 = true;
                this.editID = e.currentTarget.id
                var ID = e.currentTarget.id
                this.fileLists2 = []
                console.log(this.editID)
                var data = this.content.find(function(e){return e.ID == ID})
                console.log(data)
                this.InfoForm = data
                if(data.BackgroundImageURL.substr(0,4) == 'http'){
                    this.fileLists2.push({url:data.BackgroundImageURL})
                }else{
                    this.fileLists2.push({url:'http://images.liqunshop.com/' + data.BackgroundImageURL})
                }
                this.InfoForm.BackGroundImageURL = data.BackgroundImageURL
            },
            addSave(e){      /* 右侧弹出框修改 */
                let params = {
                    BackGroundColor:this.InfoForm.BackgroundColor,
                    BackGroundImageURL:this.InfoForm.Picture,           /* 提交的是不加域名 */
                    Title:this.InfoForm.Title,
                    LinkURL:window.encodeURIComponent(this.InfoForm.LinkURL),
                    ID:this.editID,
                    ProductID:this.InfoForm.ProductID,
                    PromotionID:this.InfoForm.PromotionID,
                }/*  */
                changeItemContentInfo(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('添加成功');
                        this.editVisible2 = false
                        this.InfoForm.BackgroundImageURL = ""
                        this.InfoForm.LinkURL = ''
                        this.InfoForm.Title = ''
                        this.InfoForm.BackgroundColor = ''
                        this.edit()
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
            ChangeRemovePicture(){
                this.InfoForm.BackGroundImageURL = '',
                this.fileLists2 = []
            },
            getPageType(){      /* 下拉菜单 */
                let params = {
                    PageTypeID:decodeURI(location.href).split('?')[1].split('=')[1].split('&')[0],
                }
                getItemType(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.options = JSON.parse(res.data.Result)
                    }
                    if(res.data.Success == 0){
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -998){
                        this.$message("请求错误")
                    }
                }).catch(function(e){
                    console.log(e)
                })
            },
            handleAvatarSuccess(res,file){              /* 右侧修改弹出框 */
                this.InfoForm.BackGroundImageURL = 'http://images.liqunshop.com/' + JSON.parse(res.Result)[0]
                this.InfoForm.Picture = JSON.parse(res.Result)[0]
                /* this.getData()
                this.feature() */
            },
            handleAvatarSuccess2(res,file){                 /* 新增页面内容 */
                this.newPage.BackGroundImageURL =  JSON.parse(res.Result)[0]                  
                this.getData()
                this.feature()
            },
            handleAvatarSuccess3(res,file){                 /* 增加页面明细 */
                this.addPageContentInfo.BackGroundImageURL = ''
                this.addPageContentInfo.BackGroundImageURL =  'http://images.liqunshop.com/' + JSON.parse(res.Result)[0]       
                this.addPageContentInfo.Picture = JSON.parse(res.Result)[0]                    
                // this.getData()
                // this.feature()
            },
            handleAvatarSuccess4(res,file){                 /* 修改页面内容 */
                this.changePage.BackGroundImageURL = ''
                this.changePage.BackGroundImageURL =  'http://images.liqunshop.com/' + JSON.parse(res.Result)[0]      
                this.changePage.Picture = JSON.parse(res.Result)[0]               
                this.getData()
                // this.feature()
            },
            // handlePictureCardPrevie4(file) {            /*修改页面信息 */
            //     this.dialogImageUrl = file.url;
            //     this.dialogVisible4 = true;
            // },
            // handlePictureCardPrevie3(file) {
            //     this.dialogImageUrl = file.url;
            //     this.dialogVisible3 = true;
            // },
            // handlePictureCardPrevie2(file) {
            //     this.dialogImageUrl = file.url;
            //     this.dialogVisible2 = true;
            // },
            // handlePictureCardPrevie1(file) {
            //     this.dialogImageUrl = file.url;
            //     this.dialogVisible2 = true;
            // },
            PageContentInfo(){          /* 添加页面明细 */
                let params = {
                    // pageContentID:this.addPageContentInfo.pageContentID,        /* 页面内容ID */   
                    pageContentID:this.PageContentID,                            
                    BackGroundColor:this.addPageContentInfo.BackGroundColor,
                    BackGroundImageURL:this.addPageContentInfo.Picture,     
                    LinkURL:window.encodeURIComponent(this.addPageContentInfo.LinkURL),
                    OrderID:this.addPageContentInfo.OrderID,
                    ProductID:this.addPageContentInfo.ProductID,
                    PromotionID:this.addPageContentInfo.PromotionID,
                    Title:this.addPageContentInfo.Title
                }
                addItemContentInfo(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('添加成功')
                        this.editVisible3 = false
                        this.edit()
                        this.getData()
                        this.addPageContentInfo.pageContentID= ''
                        this.addPageContentInfo.BackGroundColor = '',
                        this.addPageContentInfo.BackGroundImageURL = ''
                        this.addPageContentInfo.LinkURL = ''
                        this.addPageContentInfo.OrderID = ''
                        this.addPageContentInfo.ProductID = ''
                        this.addPageContentInfo.PromotionID = ''
                        this.addPageContentInfo.Title = ''
                        this.fileLists3 = []
                    }
                    if(res.data.Success == 0){
                        this.$message(res.data.Result)
                        this.addPageContentInfo.pageContentID= ''
                        this.addPageContentInfo.BackGroundColor = '',
                        this.addPageContentInfo.BackGroundImageURL = ''
                        this.addPageContentInfo.LinkURL = ''
                        this.addPageContentInfo.OrderID = ''
                        this.addPageContentInfo.ProductID = ''
                        this.addPageContentInfo.PromotionID = ''
                        this.addPageContentInfo.Title = ''
                    }
                    if(res.data.Success == -998){
                        this.$message(res.data.Result)
                    }
                }).catch(function(e){
                    console.log(e)
                })
            },
            imgUploadError(){
                this.$message('图片上传失败，请重试')
            }
        }
    }
</script>  