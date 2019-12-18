<template>
    <div>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="商品主图">
                <el-upload
                    action="/adminwebapi/api/Image/UploadImage"
                    class="table-td-HeadImageURL"
                    accept="image/png, image/jpeg, image/gif, image/jpg, image/bmp"
                    :src="HeadImage.ImageURL"
                    :preview-src-list="[HeadImage]"
                    list-type="picture-card"
                    :file-list="fileLists1"
                    :on-preview="handlePictureCardPreviewH" 
                    :on-success="HeadImageSuccess"            
                    :on-remove="handleRemoveH"
                    :headers="TokenID"
                    :data="upLoadData"
                    :limit="1"
                    >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisibleH">
                    <img width="100%" :src="dialogImageUrlH" alt="">
                </el-dialog>
            </el-form-item>
             <el-form-item label="商品详情图">
                <el-upload
                    action="/adminwebapi/api/Image/UploadImage"
                    class="table-td-HeadImageURL"
                    accept="image/png, image/jpeg, image/gif, image/jpg, image/bmp"
                    :src="ContentImage"
                    :preview-src-list="[ContentImage]"
                    list-type="picture-card"
                    :file-list="fileLists2"
                    :on-preview="handlePictureCardPreviewC"             
                    :on-success="ContentImageSuccess" 
                    :on-remove="handleRemoveC"
                    :headers="TokenID"
                    :data="upLoadContentData"
                    >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisibleC">
                    <img width="100%" :src="dialogImageUrlC" alt="">
                </el-dialog>
            </el-form-item> 
        </el-form>
        基本信息
        <el-form  :model="tableData" class="demo-form-inline" label-width="150px">
            <el-form-item label="品牌名">
                <el-select v-model="tableData.BrandID" filterable  clearable placeholder="请选择">
                    <el-option
                        v-for="item in brands"
                        :key="item.ID"
                        :label="item.BrandName"
                        :value="item.ID">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分类名">
                <el-input v-model="tableData.ClassID" placeholder="分类名"></el-input>
            </el-form-item>
                <el-form-item label="显示名称">
                <el-input v-model="tableData.DisplayName" placeholder="显示名称"></el-input>
            </el-form-item>
            <el-form-item label="是否允许退货">
                <el-radio v-model="tableData.IsOrderBack" label="Y">是</el-radio>
                <el-radio v-model="tableData.IsOrderBack" label="N">否</el-radio>
            </el-form-item>
            <el-form-item label="是否能搜索">
                <el-radio v-model="tableData.IsSearch" label="Y">是</el-radio>
                <el-radio v-model="tableData.IsSearch" label="N">否</el-radio>
            </el-form-item>
            <el-form-item label="是否显示500g价格">
                <el-radio v-model="tableData.IsShow500gPrice" label="Y">是</el-radio>
                <el-radio v-model="tableData.IsShow500gPrice" label="N">否</el-radio>
            </el-form-item>
            <el-form-item label="是否同步价格">
                <el-radio v-model="tableData.IsSyncPrice" label="Y">是</el-radio>
                <el-radio v-model="tableData.IsSyncPrice" label="N">否</el-radio>
            </el-form-item>
            <el-form-item label="是否称重商品">
                <el-radio v-model="tableData.IsWeighing" label="Y">是</el-radio>
                <el-radio v-model="tableData.IsWeighing" label="N">否</el-radio>
            </el-form-item>
            <el-form-item label="是否必须自提">
                <el-select v-model="tableData.IsMustSelfReceiver" clearable placeholder="请选择">
                    <el-option label="是" value="Y"></el-option>
                    <el-option label="否" value="N"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关键字">
                <el-input v-model="tableData.KeyWord" placeholder="关键字"></el-input>
            </el-form-item>
            <el-form-item label="最大购买数量">
                <el-input v-model="tableData.MaxQty" placeholder="最大购买数量"></el-input>
                <i> 0 为不限</i>
            </el-form-item>
            <el-form-item label="最小购买数量">
                <el-input v-model="tableData.MinQty" placeholder="最小购买数量"></el-input>
                <i> 0 为不限</i>
            </el-form-item>
            <el-form-item label="包装含量">
                <el-input v-model="tableData.PackSize" placeholder="包装含量"></el-input>
            </el-form-item>
            <el-form-item label="商品名称">
                <el-input v-model="tableData.ProductName" placeholder="商品名称"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="tableData.Remark" placeholder="备注"></el-input>
            </el-form-item>
            <el-form-item label="税率(%)">
                <el-input v-model="tableData.TaxRate" placeholder="税率"></el-input>
            </el-form-item>
            <el-form-item label="副标题">
                <el-input v-model="tableData.TitalInfo" placeholder="副标题"></el-input>
            </el-form-item>
            <el-form-item label="单位名称">
                <el-input v-model="tableData.UnitID" placeholder="单位名称"></el-input>
            </el-form-item>
            <el-form-item label="重量">
                <el-input v-model="tableData.Weight" placeholder="重量"></el-input>
            </el-form-item>
        </el-form>
         <el-form  :model="LQInfo" class="demo-form-inline" label-width="150px">
            <el-form-item label="门店码">
                <el-input v-model="LQInfo.ShopCode" placeholder="门店码"></el-input>
                <i> 利群内部商品必填</i>
            </el-form-item>
            <el-form-item label="统一分类">
                <el-input v-model="LQInfo.UniTypeCode" placeholder="统一分类"></el-input>
                <i>利群内部商品必填</i>
            </el-form-item>
            <el-form-item label="统一编码">
                <el-input v-model="LQInfo.UniCode" placeholder="统一编码"></el-input>
            </el-form-item>
            <el-form-item label="物流编码">
                <el-input v-model="LQInfo.FxxCode" placeholder="物流编码"></el-input>
                <i>利群内部供应商存在的时候必填</i>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button type="primary" @click="clear">重置</el-button>
            </el-form-item>
         </el-form>
    </div>
</template>
<script>
import { changeProduct,getProductDetail,delPicture,delDetailMap,addPicture,AddDetailMap } from "@/api/goodsList"
import { BaseBrandListGet } from '@/api/common'
import qs from 'qs';    
    export default{
        data(){
            return{
                form:{

                },
                tableData:[],               /* 商品相关 */
                HeadImage:[],               /* 头图 */
                ContentImage:[],             /* 详情图 */
                dialogImageUrlH: '',
                dialogVisibleH: false,
                dialogImageUrlC: '',
                dialogVisibleC: false,
                fileLists1:[],
                fileLists2:[],
                upLoadData:{
                    ImageUseType:'ProductHead'           /*  Page，ProductContent，ProductHead */
                },
                upLoadContentData:{
                    ImageUseType:'ProductContent'
                },
                TokenID:{
                    TokenID:sessionStorage.getItem('TokenID'),
                },
                HeadPictureUrl:'',                  /* 主图url */
                brands:[],                          /* 品牌名 */
                LQInfo:[]                           /* 利群内部相关 */
            }
        },
        methods:{
            getData(){
                let params = {
                    ID:decodeURI(location.href).split('=')[1].split('&')[0],
                    MainSupplierID:decodeURI(location.href).split('&')[1].split('=')[1],
                }
                getProductDetail(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        // console.log(JSON.parse(res.data.Result))
                        this.LQInfo = JSON.parse(res.data.Result).LQInfo
                        this.tableData = JSON.parse(res.data.Result).Product
                        this.HeadImage = JSON.parse(res.data.Result).HeadImage
                        this.ContentImage = JSON.parse(res.data.Result).ContentImage
                        for( var i = 0; i < this.HeadImage.length ; i++){
                            let URLHead = this.HeadImage[i].ImageURL
                            if(URLHead.substring(0,4) == 'http'){
                                this.fileLists1.push({url:this.HeadImage[i].ImageURL})
                            }else{
                                this.fileLists1.push({url: 'http://images.liqunshop.com/' + this.HeadImage[i].ImageURL})
                            }
                        }
                        if(this.ContentImage != null){
                            for( var i = 0; i < this.ContentImage.length ; i++){
                                let URLHead = this.ContentImage[i].ImageURL
                                if(URLHead.substring(0,4) == 'http'){
                                    this.fileLists2.push({url:this.ContentImage[i].ImageURL})
                                }else{
                                    this.fileLists2.push({url: 'http://images.liqunshop.com/' + this.ContentImage[i].ImageURL})
                                }
                            }
                            for(var i = 0; i < this.ContentImage.length; i ++){
                                for( var k = 0; k < this.fileLists2.length; k++){
                                    if(i == k){
                                        this.fileLists2[k].ID = this.ContentImage[i].ID
                                    }
                                }
                            }
                        }
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
            onSubmit(){
                let params = {
                    ID:decodeURI(location.href).split('=')[1].split('&')[0],
                    MainSupplierID:decodeURI(location.href).split('&')[1].split('=')[1],
                    BrandID : this.tableData.BrandID,
                    ClassID : this.tableData.ClassID,
                    DisplayName : this.tableData.DisplayName,
                    IsOrderBack : this.tableData.IsOrderBack,
                    IsSearch : this.tableData.IsSearch,
                    IsShow500gPrice : this.tableData.IsShow500gPrice,
                    IsSyncPrice : this.tableData.IsSyncPrice,
                    IsWeighing : this.tableData.IsWeighing,
                    KeyWord : this.tableData.KeyWord,
                    MaxQty : this.tableData.MaxQty,
                    MinQty : this.tableData.MinQty,
                    PackSize : this.tableData.PackSize,
                    ProductName : this.tableData.ProductName,
                    Remark : this.tableData.Remark,
                    TaxRate : this.tableData.TaxRate,
                    TitalInfo : this.tableData.TitalInfo,
                    UnitID : this.tableData.UnitID,
                    Weight : this.tableData.Weight,
                    ShopCode:this.LQInfo.ShopCode,
                    UniCode:this.LQInfo.UniCode,               
                    UniType:this.LQInfo.UniTypeCode,
                    Fxxcode:this.LQInfo.FxxCode,
                    IsMustSelfReceiver:this.tableData.IsMustSelfReceiver
                }
                changeProduct(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('修改成功')
                        this.$router.push({
                            path:'/goodsList',
                        })
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
                this.tableData.BrandID = '',
                this.tableData.ClassID = '',
                this.tableData.DisplayName = '',
                this.tableData.IsOrderBack = '',
                this.tableData.IsSearch = '',
                this.tableData.IsShow500gPrice = '',
                this.tableData.IsSyncPrice = '',
                this.tableData.IsWeighing = '',
                this.tableData.KeyWord = '',
                this.tableData.MaxQty = '',
                this.tableData.MinQty = '',
                this.tableData.PackSize = '',
                this.tableData.ProductName = '',
                this.tableData.Remark = '',
                this.tableData.TaxRate = '',
                this.tableData.TitalInfo = '',
                this.tableData.UnitID = '',
                this.tableData.Weight = ''
            },
            handleRemoveH(res,file, fileList) {                  /* 移除主图时调用的钩子，删除图片 */
                let params = {
                    ProductID:decodeURI(location.href).split('?')[1].split('=')[1].split('&')[0],
                    ID:this.HeadImage[0].ID
                }
                delPicture(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('主图删除成功')
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
            handlePictureCardPreviewH(file) {                /* 点击文件列表中已上传的文件时的钩子 */
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleRemoveC(file, fileList) {                  /* 移除详情图时调用的钩子，删除图片 */
                let params = {
                    ProductID:decodeURI(location.href).split('?')[1].split('=')[1].split('&')[0],
                    ID:file.ID
                }
                delDetailMap(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('详情图删除成功')
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
            handlePictureCardPreviewC(file) {                /* 点击文件列表中已上传的文件时的钩子 */
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            HeadImageSuccess(res,file){
                let params = {
                    ProductID:decodeURI(location.href).split('?')[1].split('=')[1].split('&')[0],
                    ImageURL: JSON.parse(res.Result)[0],
                    ImageIndex:1
                }
                addPicture(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('主图添加成功')
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
            ContentImageSuccess(res,file){
                let params = {
                    ProductID:decodeURI(location.href).split('?')[1].split('=')[1].split('&')[0],
                    ImageURL: JSON.parse(res.Result)[0],
                    ImageIndex: this.fileLists2.length
                }
                AddDetailMap(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('上传成功')
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
            getBrand(){
                let params = {
                   PageIndex:-1,
                   PageSize:-1, 
                }
                BaseBrandListGet(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.brands = JSON.parse(res.data.Result).ModelList
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
        },
        created(){
            this.getData()
            this.getBrand()
        }
    }
</script>  
<style lang="scss" scoped>
    .content{
        .el-form{
            .el-form-item{
                .el-form-item__content{
                    .el-input--small{
                        width:30vw!important
                    }
                }
            }
        }
    }
</style>