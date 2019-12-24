<template>
    <div>
        <el-card class="box-card">
            <div class="first">
                <span>搜索</span>
                <div>
                    <el-input
                        placeholder="统一编码"
                        v-model="formInline.uniformCode"
                        clearable
                        style="width:30vh">
                    </el-input>
                    <el-button type="primary" @click="found">查询</el-button>
                </div>
            </div>
            <div class="second">
                <span>商品图</span><!--  -->
                <div>
                    <el-upload
                        action= '/adminwebapi/api/Image/UploadImage'
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview1"
                        :on-success="handleAvatarSuccessH"
                        :on-error="imgUploadError"
                        accept="image/png, image/jpeg, image/gif, image/jpg, image/bmp"
                        :file-list="fileLists1"
                        :multiple = true                    
                        :headers="TokenID"
                        :data="upLoadData"
                        :on-progress="upLoadH"
                        :on-remove="handleRemoveH">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible1">
                        <img width="100%" :src="dialogImageUrl1" alt="">
                    </el-dialog>
                </div>
            </div>
            <div class="three">
                <span>商品详情图</span><!--  -->
                <el-upload
                    action= '/adminwebapi/api/Image/UploadImage'
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview2"
                    :on-success="handleAvatarSuccessC"
                    :on-error="imgUploadError"
                    accept="image/png, image/jpeg, image/gif, image/jpg, image/bmp"
                    :file-list="fileLists2"
                    :on-progress="upLoadC"
                    :headers="TokenID"
                    :data="upData"
                    :on-remove="handleRemoveC">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible2">
                    <img width="100%" :src="dialogImageUrl2" alt="">
                </el-dialog>
            </div>
            <div class="four">
                <span>基础信息</span>
                <div>
                    <el-form :model="formInline" class="demo-form-inline">
                        <el-form-item label="品牌名" class="BrandName">
                            <el-input v-model="formInline.BrandName" class="BrandNameInput" clearable></el-input>
                            <!-- <span>{{formInline.BrandID}}</span> -->
                            <el-button type="primary" @click="getBrand">搜索</el-button><i class="el-icon-check" v-if="this.formInline.BrandID"></i>
                        </el-form-item>
                        <el-form-item label="三级分类名">
                            <el-cascader :options="productOptions" :show-all-levels="false" @change="cascaderChange" value="formInline.ClassID" clearable></el-cascader>
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
                        <el-form-item label="单位名称">
                            <el-select v-model="formInline.UnitID" filterable  clearable placeholder="请选择">
                                <el-option
                                    v-for="item in qualit"
                                    :key="item.ID"
                                    :label="item.UnitName"
                                    :value="item.ID">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="重量">
                            <el-input v-model="formInline.Weight" placeholder="重量"></el-input>
                        </el-form-item>
                        <el-form-item label="供应商号">
                            <el-select v-model="formInline.SupplierID" placeholder="供应商">
                                <el-option
                                    v-for="item in option2"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="是否必须自提">
                            <el-select v-model="formInline.IsMustSelfReceiver" clearable placeholder="请选择">
                                <el-option label="是" value="Y"></el-option>
                                <el-option label="否" value="N"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="门店码">
                            <el-input v-model="formInline.ShopCode" placeholder="门店码"></el-input>
                            <el-button type="primary" plain @click="Inquire">查询</el-button>
                        </el-form-item>
                        <el-form-item label="库存">
                            <el-input v-model="formInline.Stock" placeholder="库存"></el-input>
                        </el-form-item>
                        <el-form-item label="会员价">
                            <el-input v-model="formInline.MemberPrice" placeholder="会员价"></el-input>
                        </el-form-item>
                        <el-form-item label="统一编码">
                            <el-input v-model="formInline.uniformCode" placeholder="统一编码"></el-input>
                        </el-form-item>
                        <el-form-item label="物流码">
                            <el-input v-model="formInline.Fxxcode" placeholder="物流码"></el-input>
                        </el-form-item>
                        <el-form-item label="统一分类">
                            <el-input v-model="formInline.UniType" placeholder="统一分类"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">提交</el-button>
                            <el-button type="primary" @click="clear">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
import { getProductInfo,getProductDetail,getPicInfo,addPicture,AddDetailMap,delPicture,delDetailMap,SupplierListGetByLevel,addProduct,getIDclass } from "@/api/goodsList"
import { BaseBrandListGet,BaseUnitListGet } from '@/api/common'
import qs from 'qs';    
    export default{
        data(){
            return{
                dialogImageUrl1: '',     /* 主图上传 */
                dialogImageUrl2: '',     /* 详图上传 */
                dialogVisible1: false,        /* 主图上传 */
                dialogVisible2: false,        /* 详图上传 */
                fileLists1: [],      /* 主图 */
                fileLists2: [],      /* 详情图 */
                formInline: {
                    BrandID:'',
                    BrandName:'',
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
                    SupplierID:'',
                    Stock:'',
                    MemberPrice:'',
                    Unicode:'',
                    Fxxcode:'',
                    ShopCode:'',
                    UniType:'',
                    IsMustSelfReceiver:"",          /* 是否必须自提 N 否 Y 是 */
                },
                 /* 动态添加的数据存放在这里 */
                prop:{
                    propertyName:"",        /* 属性名 */
                    attributeValues:"",     /* 属性值 */
                },
                list:[],        /* 展示参数用 */
                qualit: [],     /* 单位 */
                value: '',      /* 计量单位 */
                isSingle: false,
                attrList: [],   /* 底部的保存按钮 会将数据存到这里 */
                typeValue:'',   /* 选择类目value */
                options: [],       /* 选择类目 */
                tableData: [],
                currentRow: null,
                result:[],                   /* 根据统一编码获取到的信息 */
                option2:[],
                UniType:'',
                productOptions:[],           /* 全部分类 */
                upLoadData:{
                    ImageUseType:'ProductHead'           /*  Page，ProductContent，ProductHead */
                },
                upData:{
                    ImageUseType:'ProductContent'           /*  Page，ProductContent，ProductHead */
                },
                TokenID:{
                    TokenID:sessionStorage.getItem('TokenID'),
                },
                HeadPictureUrl:'',                  /* 主图url */
                brands:[]
            }
        },
        methods:{
            clear(){
                this.formInline.BrandID = ''
                this.formInline.ClassID = ''
                this.formInline.DisplayName = ''
                this.formInline.IsOrderBack = ''
                this.formInline.IsSearch = ''
                this.formInline.IsShow500gPrice = ''
                this.formInline.IsSyncPrice = ''
                this.formInline.IsWeighing = ''
                this.formInline.KeyWord = ''
                this.formInline.MaxQty = ''
                this.formInline.MinQty = ''
                this.formInline.PackSize = ''
                this.formInline.ProductName = ''
                this.formInline.Remark = ''
                this.formInline.TaxRate = ''
                this.formInline.TitalInfo = ''
                this.formInline.UnitID = ''
                this.formInline.Weight = ''
                this.formInline.SupplierID = ''
                this.formInline.Stock = ''
                this.formInline.MemberPrice = ''
                this.formInline.Unicode = ''
                this.formInline.Fxxcode = ''
                this.formInline.ShopCode = ''
                this.formInline.UniType = ''
                this.fileLists2 = [],
                this.fileLists1 = []
            },
            handle(row,column,event,cell){
                this.brand = row.chinese;
            },
            setCurrent(row) {
                this.$refs.singleTable.setCurrentRow(row);
            },
            handleCurrentChange(val) {
                this.currentRow = val;
            },
            handleRemoveH(file, fileList1) {                 /* 删除主图 */
                console.log(file, fileList1);
                this.fileLists1 = fileList1
                console.log(file)
                console.log(fileList)
            },
            handleRemoveC(file, fileList) {                 /* 删除详情图 */
                console.log(file, fileList);
                console.log(file)
                console.log(fileList)
                this.fileLists2 =  []
                for(var i = 0; i < fileList.length; i++){
                    this.fileLists2.push('http://images.liqunshop.com/' + fileList[i].response.Result.replace(/\[/g,'').replace(/\]/g,'').replace(/\"/g,''))
                    console.log('删除了')
                }
                // this.fileLists2 = fileList
            },
            handlePictureCardPreview1(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible1 = true;
            },
            handlePictureCardPreview2(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible2 = true;
            },
            handleAvatarSuccessH(res, file) {                        //图片上传成功调用的方法
                this.fileLists1.push('http://images.liqunshop.com/' + JSON.parse(res.Result)[0])
            },
            handleAvatarSuccessC(res, file) {                        //图片上传成功调用的方法
                this.fileLists2.push( 'http://images.liqunshop.com/' + JSON.parse(res.Result)[0])
                console.log(this.fileLists2)
            },
            imgUploadError(err, file, fileList){                    //图片上传失败调用
                this.$message.error('上传图片失败!');
            },
            onSubmit() {
                for(var q = 0;q < this.fileLists1.length; q++){
                    delete this.fileLists1[q].uid
                    delete this.fileLists1[q].status
                }
                for(var p = 0;p < this.fileLists2.length; p++){
                    delete this.fileLists2[p].uid
                    delete this.fileLists2[p].status
                }
                let params = {
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
                    SupplierID : this.formInline.SupplierID,
                    Stock : this.formInline.Stock,
                    MemberPrice : this.formInline.MemberPrice,
                    Unicode : this.formInline.Unicode,
                    Fxxcode : this.formInline.Fxxcode,
                    ShopCode : this.formInline.ShopCode,
                    UniType : this.formInline.UniType,
                    IsMustSelfReceiver: this.formInline.IsMustSelfReceiver,
                    HeadImage : JSON.stringify(this.fileLists1),
                    ContentImage : JSON.stringify(this.fileLists2),
                }
                addProduct(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('提交成功')
                        this.clear()
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
            add() {
                let newObj = {
                    propertyName: this.prop.propertyName,
                    attributeValues: this.prop.attributeValues,
                }
                this.list.push(newObj);
                
            },
            del(index){
                this.list.splice(index, 1);
            },
            handleEdit(index, row) {
                this.editVisible = true;
            },
            saveEdit() {
                
                this.editVisible = false;
            },
            found(){    
                this.fileLists1 = []
                this.fileLists2 = []
                let params = {
                    Unicode:this.formInline.uniformCode             /* 003567647 */     /* 100008215 */
                }
                getPicInfo(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.result = JSON.parse(res.data.Result)
                        for( var i = 0; i < this.result.HeadImageList.length ; i++){
                            let URLHead = this.result.HeadImageList[i]
                            if(URLHead.substr(0,4) == 'http'){
                                this.fileLists1.push({url: this.result.HeadImageList})
                            }else{
                                this.fileLists1.push({url: 'http://images.liqunshop.com/' + this.result.HeadImageList})
                            }
                            console.log(this.fileLists1)
                        }
                        for( var i = 0; i < this.result.ContentImageList.length ; i++){
                            let URLHead = this.result.ContentImageList[i]
                            if(URLHead.substr(0,4) == 'http'){
                                this.fileLists2.push({url: this.result.ContentImageList[i]})
                            }else{
                                this.fileLists2.push({url: 'http://images.liqunshop.com/' + this.result.ContentImageList[i]})
                            }
                        }
                        this.formInline.UniType = this.result.UNITYPE
                        this.formInline.KeyWord = this.result.KEYNAME
                        this.formInline.ProductName = this.result.PNAME
                        this.formInline.uniformCode = this.result.UNICODE
                        this.formInline.Fxxcode = this.result.Fxxcodes
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
            unit(){
                let params = {
                    PageIndex:-1,
                    PageSize:-1
                }
                BaseUnitListGet(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.qualit = JSON.parse(res.data.Result).ModelList
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
                let params = {
                    Level:2,
                }
                SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.option2 = JSON.parse(res.data.Result)
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
            productData(){
                if(localStorage.productIdClass == null) {
                    let params = {}
                    getIDclass(qs.stringify(params)).then((res)=>{
                        if(res.data.Success == 1){
                            this.productOptions = JSON.parse(res.data.Result)
                            localStorage['productIdClass']=res.data.Result;
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
                }else{
                    this.productOptions = JSON.parse(localStorage['productIdClass'])
                }
            },
            cascaderChange(value) {
              let rang = []
                for(let i = 0 ; i < value.length; i++){
                    if(i == value.length - 1){
                        rang.push(value[i])
                    }
                }
                this.formInline.ClassID = rang[0]
            },
            upLoadH(){
                console.log('主图上传')
            },
            upLoadC(){
                console.log('详情图上传')
            },
            getBrand(){
                let params = {
                    BrandName:this.formInline.BrandName,
                    PageIndex:-1,
                    PageSize:-1, 
                }
                BaseBrandListGet(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.formInline.BrandID = JSON.parse(res.data.Result).ModelList[0].ID
                        console.log(this.formInline.BrandID)
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
            Inquire(){
                let params = {
                   ShopCode:this.formInline.ShopCode,
                   SupplierID:this.formInline.SupplierID
                }
                getProductInfo(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.formInline.uniformCode = JSON.parse(res.data.Result).UNICODE
                        this.formInline.UniType = JSON.parse(res.data.Result).UNITYPE
                        this.formInline.Fxxcode = JSON.parse(res.data.Result).Fxxcodes
                        this.formInline.UniType = JSON.parse(res.data.Result).UNIBRAND
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
        mounted(){
            this.getSupplier()
            this.productData()
            this.unit()
        }
    }
</script>  
<style lang="scss" scoped>
    .first{ 
        display:flex;
        div{
            margin-left:5vh
        }
    }
    .second{
        display:flex;
        margin-bottom:2vh;
        margin-top:2vh;
        div{
            margin-left: 4vh;
        }
    }
    .three{
        display:flex;
        margin-bottom:2vh;
        margin-top:2vh;
        div{
            margin-left: 5vh;
        }
    }
    .four{
        .el-form{
            margin-left:5vh;
            .el-form-item{
                width:30vw
            }
        }
    }
    .BrandName{
        .BrandNameInput{
            width:30%!important;
        }
    }
</style>