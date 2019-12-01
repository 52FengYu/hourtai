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
                <span>商品图</span>
                <div>
                    <el-upload
                        action= '/api/Product/ProductHeadImageAdd'
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview1"
                        :on-success="handleAvatarSuccess"
                        :on-error="imgUploadError"
                        accept="image/png, image/jpeg"
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
                <span>商品详情图</span>
                <el-upload
                    action= '/api/Product/ProductContentImageAdd'
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview2"
                    :on-success="handleAvatarSuccess"
                    :on-error="imgUploadError"
                    accept="image/png, image/jpeg"
                    :file-list="fileLists2"
                    :on-progress="upLoadC"
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
                    <el-form  :model="formInline" class="demo-form-inline">
                        <el-form-item label="品牌编号">
                            <el-input v-model="formInline.BrandID" placeholder="品牌编号"></el-input>
                        </el-form-item>
                        <el-form-item label="三级分类编号">
                            <!-- <el-cascader :options="productOptions"  clearable v-model="formInline.ClassID" @change="handleChange" placeholder="请选择类目"></el-cascader> -->
                            <el-cascader :options="productOptions" :show-all-levels="false" @change="cascaderChange" value="formInline.ClassID"></el-cascader>
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
                        <el-form-item label="门店码">
                            <el-input v-model="formInline.ShopCode" placeholder="门店码"></el-input>
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
                },
                 /* 动态添加的数据存放在这里 */
                prop:{
                    propertyName:"",        /* 属性名 */
                    attributeValues:"",     /* 属性值 */
                },
                list:[],        /* 展示参数用 */
                qualit: [{
                    value: '选项1',
                    label: '个'
                    }, {
                    value: '选项2',
                    label: '箱'
                    }, {
                    value: '选项3',
                    label: '袋'
                    }, {
                    value: '选项4',
                    label: '盒'
                    }, {
                    value: '选项5',
                    label: '瓶'
                    },{
                    value: '选项6',
                    label: '只'
                    }, {
                    value: '选项7',
                    label: '件'
                    }, {
                    value: '选项8',
                    label: '条'
                    }, {
                    value: '选项9',
                    label: '块'
                    }, {
                    value: '选项10',
                    label: '副'
                    },{
                    value: '选项11',
                    label: '片'
                    }, {
                    value: '选项12',
                    label: '份'
                    }, {
                    value: '选项13',
                    label: '罐'
                    }, {
                    value: '选项14',
                    label: '桶'
                    }, {
                    value: '选项15',
                    label: '提'
                    },{
                    value: '选项16',
                    label: '组'
                    }, {
                    value: '选项17',
                    label: '支'
                    }, {
                    value: '选项18',
                    label: '包'
                    }, {
                    value: '选项19',
                    label: 'kg'
                    }, {
                    value: '选项20',
                    label: '套'
                    },{
                    value: '选项21',
                    label: '杯'
                    }, {
                    value: '选项22',
                    label: '碗'
                    }, {
                    value: '选项23',
                    label: '粒'
                    }, {
                    value: '选项24',
                    label: '把'
                    }, {
                    value: '选项25',
                    label: '串'
                    },{
                    value: '选项26',
                    label: '打'
                    }, {
                    value: '选项27',
                    label: '克'
                    }, {
                    value: '选项28',
                    label: '斤'
                    }, {
                    value: '选项29',
                    label: '公斤'
                    }, {
                    value: '选项30',
                    label: '千克'
                    },{
                    value: '选项31',
                    label: '颗'
                    }, {
                    value: '选项32',
                    label: '卷'
                    }, {
                    value: '选项33',
                    label: '台'
                    }, {
                    value: '选项34',
                    label: '双'
                    }, {
                    value: '选项35',
                    label: '枚'
                    },{
                    value: '选项36',
                    label: '对'
                    }, {
                    value: '选项37',
                    label: '本'
                    }, {
                    value: '选项38',
                    label: '根'
                    }, {
                    value: '选项39',
                    label: '卡'
                    }, {
                    value: '选项40',
                    label: '筒'
                    },{
                    value: '选项41',
                    label: '张'
                    }, {
                    value: '选项42',
                    label: '辆'
                    }, {
                    value: '选项43',
                    label: '扎'
                    }, {
                    value: '选项44',
                    label: '板'
                    }, {
                    value: '选项45',
                    label: '听'
                    },{
                    value: '选项46',
                    label: '两'
                    }, {
                    value: '选项47',
                    label: '升'
                    }, {
                    value: '选项48',
                    label: '毫升'
                    }, {
                    value: '选项49',
                    label: '捆'
                    }, {
                    value: '选项50',
                    label: '册'
                    },{
                    value: '选项51',
                    label: '艘'
                    }, {
                    value: '选项52',
                    label: '架'
                    }, {
                    value: '选项53',
                    label: '枝'
                    }, {
                    value: '选项54',
                    label: '棵'
                    }, {
                    value: '选项55',
                    label: '株'
                    },{
                    value: '选项56',
                    label: '盘'
                    }, {
                    value: '选项57',
                    label: '盆'
                    }, {
                    value: '选项58',
                    label: '刀'
                    }, {
                    value: '选项59',
                    label: '扇'
                    }, {
                    value: '选项60',
                    label: '合'
                    }, {
                    value: '选项61',
                    label: '束'
                    }
                ],
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
                TokenID:{
                    TokenID:sessionStorage.getItem('TokenID'),
                },
                HeadPictureUrl:'',                  /* 主图url */
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
                
            },
            handle(row,column,event,cell){
                console.log(row.chinese)
                this.brand = row.chinese;
            },
            setCurrent(row) {
                this.$refs.singleTable.setCurrentRow(row);
            },
            handleCurrentChange(val) {
                this.currentRow = val;
            },
            handleRemoveH(file, index) {                 /* 删除主图 */
                console.log(file, index);
            },
            handleRemoveC(file, fileList) {                 /* 删除详情图 */
                console.log(file, fileList);
            },
            handlePictureCardPreview1(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible1 = true;
            },
            handlePictureCardPreview2(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible2 = true;
            },
            handleAvatarSuccess(res, file) {                        //图片上传成功调用的方法
                console.log(JSON.parse(res.Result)[0]);
                this.HeadPictureUrl = JSON.parse(res.Result)[0]
                console.log(file);
            
            },
            imgUploadError(err, file, fileList){                    //图片上传失败调用
                console.log(err)
                this.$message.error('上传图片失败!');
            },
            onSubmit() {
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
                    HeadImage : this.fileLists1,
                    ContentImage : this.fileLists2
                }
                addProduct(qs.stringify(params)).then((res)=>{
                    console.log(res.data.Result)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.$message.success('提交成功')
                        this.clear()
                        this.$router.push({
                            path:'/goodsList',
                        })
                    }
                    if(res.data.Success == 0){
                        console.log("数据请求失败，请重试")
                        console.log(res.data.Result)
                        this.$message(res.data.Result)
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
                let params = {
                    Unicode:this.formInline.uniformCode             /* 003567647 */
                }
                getPicInfo(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        console.log(JSON.parse(res.data.Result))
                        this.result = JSON.parse(res.data.Result)
                        this.fileLists1.push({url: 'http://images.liqunshop.com/' + this.result.HeadImageList})
                        for( var i = 0; i < this.result.ContentImageList.length ; i++){
                            this.fileLists2.push({url: 'http://images.liqunshop.com/' + this.result.ContentImageList[i]})
                        }
                        console.log(this.fileLists1)
                        console.log(this.fileLists2)
                        this.formInline.UniType = this.result.UNITYPE
                    }
                    if(res.data.Success == 0){
                        console.log("数据请求失败，请重试")
                        console.log(res.data.Result)
                        this.$message(res.data.Result)
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
            getSupplier(){
                let params = {
                    Level:2
                }
                SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.option2 = JSON.parse(res.data.Result)
                        console.log(this.option2)
                    }
                    if(res.data.Success == 0){
                        console.log("数据请求失败，请重试")
                        console.log(res.data.Result)
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -999){
                        console.log("用户未登录")
                        console.log(res.data)
                    }
                    if(res.data.Success == -998){
                        console.log("请求错误")
                        this.$message(res.data.Result)
                    }
                }).catch(function(e){
                    console.log(e)
                    console.log('出错了')
                })
            },
            productData(){
                let params = {
                    
                }
                getIDclass(qs.stringify(params)).then((res)=>{
                    console.log(res.data.Result)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.productOptions = JSON.parse(res.data.Result)
                        console.log(this.productOptions)
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
            cascaderChange(value) {
              console.log(value)
              let rang = []
                for(let i = 0 ; i < value.length; i++){
                    if(i == value.length - 1){
                        rang.push(value[i])
                    }
                }
                console.log(rang)
                this.formInline.ClassID = rang[0]
                console.log(this.formInline.ClassID)
            },
            upLoadH(){
                console.log('主图上传')
            },
            upLoadC(){
                console.log('详情图上传')
            },
        },
        created(){
            this.getSupplier()
            this.productData()
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
            /* .info1 .el-form-item:nth-child(2){
                margin-left:6vh
            }
            .info2 .el-form-item:nth-child(2){
                margin-left:6vh
            }
            .info3 .el-form-item:nth-child(2){
                margin-left:6vh;
                display:flex;
                .el-form-item__content{
                    display:flex!important;
                }
            }
            .info4 .el-form-item:nth-child(2){
                margin-left:11vh
            }
            .info8 .el-form-item:nth-child(2){
                margin-left:15vh
            }
            .info3{
                display:flex;
                
            } */
            .el-form-item{
                width:30vw
            }
        }
    }
    
</style>