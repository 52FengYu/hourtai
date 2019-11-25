<template>
    <div>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="商品主图">
                <!-- <template>
                    <el-image
                        class="table-td-HeadImageURL"
                        :src="HeadImage[0].ImageURL"
                        :preview-src-list="[HeadImage]"
                        action="/api/Product/ProductHeadImageAdd"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreviewH"             
                        :on-remove="handleRemoveH">                                  
                        <i class="el-icon-plus"></i>  -->       <!-- on-preview 点击文件列表中已上传的文件时的钩子 -->  <!-- on-remove	文件列表移除文件时的钩子 -->
                    <!-- ></el-image> -->
                <!-- </template> -->
                <el-upload
                    action="/api/Product/ProductHeadImageAdd"
                    class="table-td-HeadImageURL"
                    :src="HeadImage.ImageURL"
                    :preview-src-list="[HeadImage]"
                    list-type="picture-card"
                    :file-list="fileLists1"
                    :on-preview="handlePictureCardPreviewH"             
                    :on-remove="handleRemoveH"
                    >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisibleH">
                    <img width="100%" :src="dialogImageUrlH" alt="">
                </el-dialog>
            </el-form-item>
             <el-form-item label="商品详情图">
                <!--<template>
                    <el-image
                        class="table-td-ContentImageURL"
                        action="/api/Product/ProductHeadImageAdd"
                        :src="ContentImage.ImageURL"
                        list-type="picture-card"
                        :preview-src-list="[ContentImage]"
                        :on-preview="handlePictureCardPreviewC"             
                        :on-remove="handleRemoveC"
                    ></el-image>
                </template>-->
                <el-upload
                    action="/api/Product/ProductHeadImageAdd"
                    class="table-td-HeadImageURL"
                    :src="ContentImage"
                    :preview-src-list="[ContentImage]"
                    list-type="picture-card"
                    :file-list="fileLists2"
                    :on-preview="handlePictureCardPreviewC"             
                    :on-remove="handleRemoveC"
                    >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisibleC">
                    <img width="100%" :src="dialogImageUrlC" alt="">
                </el-dialog>
            </el-form-item> 
        </el-form>
        基本信息
        <el-form  :model="formInline" class="demo-form-inline" label-width="150px">
            <el-form-item label="品牌编号">
                <el-input v-model="formInline.BrandID" placeholder="品牌编号"></el-input>
            </el-form-item>
            <el-form-item label="三级分类编号">
                <el-input v-model="formInline.ClassID" placeholder="三级分类编号"></el-input>
            </el-form-item>
                <el-form-item label="显示名称">
                <el-input v-model="formInline.DisplayName" placeholder="显示名称"></el-input>
            </el-form-item>
            <el-form-item label="是否允许退货">
                <el-radio v-model="formInline.IsOrderBack" label="Y">是</el-radio>
                <el-radio v-model="formInline.IsOrderBack" label="N">否</el-radio>
            </el-form-item>
            <el-form-item label="是否能搜索">
                <el-radio v-model="formInline.IsSearch" label="Y">是</el-radio>
                <el-radio v-model="formInline.IsSearch" label="N">否</el-radio>
            </el-form-item>
            <el-form-item label="是否显示500g价格">
                <el-radio v-model="formInline.IsShow500gPrice" label="Y">是</el-radio>
                <el-radio v-model="formInline.IsShow500gPrice" label="N">否</el-radio>
            </el-form-item>
            <el-form-item label="是否同步价格">
                <el-radio v-model="formInline.IsSyncPrice" label="Y">是</el-radio>
                <el-radio v-model="formInline.IsSyncPrice" label="N">否</el-radio>
            </el-form-item>
            <el-form-item label="是否称重商品">
                <el-radio v-model="formInline.IsWeighing" label="Y">是</el-radio>
                <el-radio v-model="formInline.IsWeighing" label="N">否</el-radio>
            </el-form-item>
            <el-form-item label="关键字">
                <el-input v-model="formInline.KeyWord" placeholder="关键字"></el-input>
            </el-form-item>
            <el-form-item label="最大购买数量">
                <el-input v-model="formInline.MaxQty" placeholder="最大购买数量"></el-input>
                <i> 0 为不限</i>
            </el-form-item>
            <el-form-item label="最小购买数量">
                <el-input v-model="formInline.MinQty" placeholder="最小购买数量"></el-input>
                <i> 0 为不限</i>
            </el-form-item>
            <el-form-item label="包装含量">
                <el-input v-model="formInline.PackSize" placeholder="包装含量"></el-input>
            </el-form-item>
            <el-form-item label="商品名称">
                <el-input v-model="formInline.ProductName" placeholder="商品名称"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="formInline.Remark" placeholder="备注"></el-input>
            </el-form-item>
            <el-form-item label="税率(%)">
                <el-input v-model="formInline.TaxRate" placeholder="税率"></el-input>
            </el-form-item>
            <el-form-item label="副标题">
                <el-input v-model="formInline.TitalInfo" placeholder="副标题"></el-input>
            </el-form-item>
            <el-form-item label="单位编号">
                <el-input v-model="formInline.UnitID" placeholder="单位编号"></el-input>
            </el-form-item>
            <el-form-item label="重量">
                <el-input v-model="formInline.Weight" placeholder="重量"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button type="primary" @click="clear">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { changeProduct,getProductDetail,delPicture,delDetailMap } from "@/api/goodsList"
import qs from 'qs';    
    export default{
        data(){
            return{
                formInline: {
                    BrandID:'',
                    ClassID:'',
                    DisplayName:'',
                    IsOrderBack:'',
                    IsSearch:'',
                    IsShow500gPrice:'',
                    IsSyncPrice:'',
                    IsWeighing:'',
                    KeyWord:'',
                    MaxQty:'',
                    MinQty:'',
                    PackSize:'',
                    ProductName:'',
                    Remark:'',
                    TaxRate:'',
                    TitalInfo:'',
                    UnitID:'',
                    Weight:'',
                },
                form:{

                },
                tableData:[],               /* 根据url里面的参数获取到的数据放在这里 */
                HeadImage:[],               /* 头图 */
                ContentImage:[],             /* 详情图 */
                dialogImageUrlH: '',
                dialogVisibleH: false,
                dialogImageUrlC: '',
                dialogVisibleC: false,
                fileLists1:[],
                fileLists2:[]
            }
        },methods:{
            getData(){
                let params = {
                    ID:decodeURI(location.href).split('=')[1].split('&')[0],
                    MainSupplierID:decodeURI(location.href).split('&')[1].split('=')[1],
                }
                getProductDetail(qs.stringify(params)).then((res)=>{
                    console.log(res.data.Result)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.tableData = JSON.parse(res.data.Result).Product
                        console.log(this.tableData)
                        this.HeadImage = JSON.parse(res.data.Result).HeadImage
                        console.log(this.HeadImage)
                        this.ContentImage = JSON.parse(res.data.Result).ContentImage
                        console.log(this.ContentImage)
                        for( var i = 0; i < this.HeadImage.length ; i++){
                            this.fileLists1.push({url: 'http://images.liqunshop.com/' + this.HeadImage[i].ImageURL})
                        }
                        console.log(this.fileLists1)
                        if(this.ContentImage != null){
                            for( var i = 0; i < this.ContentImage.length ; i++){
                                this.fileLists2.push({url: 'http://images.liqunshop.com/' + this.ContentImage[i].ImageURL})
                            }
                        }
                        console.log(this.fileLists2)
                        this.formInline.BrandID = this.tableData.BrandID
                        this.formInline.ClassID = this.tableData.ClassID
                        this.formInline.DisplayName = this.tableData.DisplayName
                        this.formInline.IsOrderBack = this.tableData.IsOrderBack
                        this.formInline.IsSearch = this.tableData.IsSearch
                        this.formInline.IsShow500gPrice = this.tableData.IsShow500gPrice
                        this.formInline.IsSyncPrice = this.tableData.IsSyncPrice
                        this.formInline.IsWeighing = this.tableData.IsWeighing
                        this.formInline.KeyWord = this.tableData.KeyWord
                        this.formInline.MaxQty = this.tableData.MaxQty
                        this.formInline.MinQty = this.tableData.MinQty
                        this.formInline.PackSize = this.tableData.PackSize
                        this.formInline.ProductName = this.tableData.ProductName
                        this.formInline.Remark = this.tableData.Remark
                        this.formInline.TaxRate = this.tableData.TaxRate
                        this.formInline.TitalInfo = this.tableData.TitalInfov
                        this.formInline.UnitID = this.tableData.UnitID
                        this.formInline.Weight = this.tableData.Weight
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
            onSubmit(){
                let params = {
                    ID:decodeURI(location.href).split('=')[1].split('&')[0],
                    MainSupplierID:decodeURI(location.href).split('&')[1].split('=')[1],
                    BrandID : this.formInline.BrandID,
                    ClassID : this.formInline.ClassID,
                    DisplayName : this.formInline.DisplayName,
                    IsOrderBack : this.formInline.IsOrderBack,
                    IsSearch : this.formInline.IsSearch,
                    IsShow500gPrice : this.formInline.IsShow500gPrice,
                    IsSyncPrice : this.formInline.IsSyncPrice,
                    IsWeighing : this.formInline.IsWeighing,
                    KeyWord : this.formInline.KeyWord,
                    MaxQty : this.formInline.MaxQty,
                    MinQty : this.formInline.MinQty,
                    PackSize : this.formInline.PackSize,
                    ProductName : this.formInline.ProductName,
                    Remark : this.formInline.Remark,
                    TaxRate : this.formInline.TaxRate,
                    TitalInfo : this.formInline.TitalInfo,
                    UnitID : this.formInline.UnitID,
                    Weight : this.formInline.Weight,
                }
                changeProduct(qs.stringify(params)).then((res)=>{
                    console.log(res.data.Result)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.$message.success('修改成功')
                        this.$router.push({
                            path:'/goodsList',
                        })
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
                this.formInline.BrandID = '',
                this.formInline.ClassID = '',
                this.formInline.DisplayName = '',
                this.formInline.IsOrderBack = '',
                this.formInline.IsSearch = '',
                this.formInline.IsShow500gPrice = '',
                this.formInline.IsSyncPrice = '',
                this.formInline.IsWeighing = '',
                this.formInline.KeyWord = '',
                this.formInline.MaxQty = '',
                this.formInline.MinQty = '',
                this.formInline.PackSize = '',
                this.formInline.ProductName = '',
                this.formInline.Remark = '',
                this.formInline.TaxRate = '',
                this.formInline.TitalInfo = '',
                this.formInline.UnitID = '',
                this.formInline.Weight = ''
            },
            handleRemoveH(file, fileList) {                  /* 移除时调用的钩子，删除图片 */
                console.log(file, fileList);
            },
            handlePictureCardPreviewH(file) {                /* 点击文件列表中已上传的文件时的钩子 */
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleRemoveC(file, fileList) {                  /* 移除时调用的钩子，删除图片 */
                console.log(file, fileList);
            },
            handlePictureCardPreviewC(file) {                /* 点击文件列表中已上传的文件时的钩子 */
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
        },
        created(){
            this.getData()
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