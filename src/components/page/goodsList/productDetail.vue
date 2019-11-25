<template>
    <div>
        <el-form ref="form"  :model="products" label-width="120px">
            <el-form-item label="商品图">
                <template>
                    <el-image
                        class="table-td-HeadImageURL"
                        :src="products.HeadImage[0].ImageURL"
                        :preview-src-list="[products.HeadImage[0].ImageURL]"
                    ></el-image>
                </template>
            </el-form-item>
            <!-- <el-form-item label="商品详情图">
                <template>
                    <el-image
                        class="table-td-HeadImageURL"
                        :src="product.ContentImage[0].ImageURL"
                        :preview-src-list="[product.ContentImage[0].ImageURL]"
                    ></el-image>
                </template>
            </el-form-item> -->
        </el-form>
        <el-form ref="form" :inline="true"  class="demo-form-inline" :model="products" label-width="180px">
            <h4>基本信息</h4>
            <el-form-item label="商品名称">
                <span>{{this.products.Product.DisplayName}}</span>
            </el-form-item>
            <el-form-item label="商品编码">
                <span>{{this.products.Product.ID}}</span>
            </el-form-item>
            <el-form-item label="审核备注">
                <span >{{this.products.Product.AuditRemark}}</span>
            </el-form-item>
            <el-form-item label="品牌编码">
                <span >{{this.products.Product.BrandID}}</span>
            </el-form-item>
            <el-form-item label="品牌名称">
                <span >{{this.products.Product.BrandName}}</span>
            </el-form-item>
            <el-form-item label="三级分类ID">
                <span >{{this.products.Product.ClassID}}</span>
            </el-form-item>
            <el-form-item label="三级分类名称">
                <span >{{this.products.Product.ClassName}}</span>
            </el-form-item>
            <el-form-item label="二级分类ID">
                <span >{{this.products.Product.TwoClassLevelID}}</span>
            </el-form-item>
            <el-form-item label="二级分类名称">
                <span >{{this.products.Product.TwoClassLevelName}}</span>
            </el-form-item>
            <el-form-item label="一级分类ID">
                <span >{{this.products.Product.FirstClassLevelID}}</span>
            </el-form-item>
            <el-form-item label="一级分类名称">
                <span >{{this.products.Product.FirstClassLeverName}}</span>
            </el-form-item>
            <el-form-item label="是否废弃">
                <span >{{this.products.Product.DelFlag === 'N'  ? '否' : '是'}}</span>
            </el-form-item>
            <el-form-item label="物流码">
                <span >{{this.products.LQInfo.FxxCode}}</span>
            </el-form-item>
            <el-form-item label="门店码">
                <span >{{this.products.LQInfo.ShopCode}}</span>
            </el-form-item>
            <el-form-item label="统一编码">
                <span >{{this.products.LQInfo.UniCode}}</span>
            </el-form-item>
            <el-form-item label="统一分类">
                <span >{{this.products.LQInfo.UniTypeCode}}</span>
            </el-form-item>

            <el-form-item label="是否是组合商品">
                <span >{{this.products.Product.IsGroupProduct == 'N' ? '否' : '是'}}</span>
            </el-form-item>
            <el-form-item label="是否是利群内部商品">
                <span >{{this.products.Product.IsLiqun == 'N' ? '否' : '是'}}</span>
            </el-form-item>
            <el-form-item label="是否允许退货">
                <span >{{this.products.Product.IsOrderBack == 'N' ? '否' : '是'}}</span>
            </el-form-item>
            <el-form-item label="是否允许搜索">
                <span >{{this.products.Product.IsSearch == 'N' ? '否' : '是'}}</span>
            </el-form-item>
            <el-form-item label="是否在架销售">
                <span >{{this.products.Product.IsSell == 'N' ? '否' : '是'}}</span>
            </el-form-item>

            <el-form-item label="是否显示500g价格">
                <span >{{this.products.Product.IsShow500gPrice == 'N' ? '否' : '是'}}</span>
            </el-form-item>
            <el-form-item label="是否同步价格">
                <span >{{this.products.Product.IsSyncPrice == 'N' ? '否' : '是'}}</span>
            </el-form-item>
            <el-form-item label="是否称重商品">
                <span >{{this.products.Product.IsWeighing == 'N' ? '否' : '是'}}</span>
            </el-form-item>
            <el-form-item label="关键字">
                <span >{{this.products.Product.KeyWord}}</span>
            </el-form-item>
            <el-form-item label="主供应商号">
                <span >{{this.products.Product.MainSupplierID}}</span>
            </el-form-item>
        </el-form>
        根据门店码获取商品信息
        <el-table :data="ByshopCode" border style="width: 100%" class="first">
            <el-table-column label="门店码">
                <template>  
                    <el-input placeholder="请输入内容" v-model="products" clearable></el-input>
                    <el-button type="primary">搜索</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="FNAME" label="商品名称"></el-table-column>
            <el-table-column prop="UNIT" label="单位" ></el-table-column>
            <el-table-column prop="ORIGIN" label="产地"></el-table-column>
            <el-table-column prop="UNICODE" label="统一编码"></el-table-column>
            <el-table-column prop="UNITYPE" label="统一分类" ></el-table-column>
            <el-table-column prop="UNIBRAND" label="统一品牌"></el-table-column>
            <el-table-column prop="TAXRATE" label="税率"></el-table-column>
            <el-table-column prop="SNPRC" label="售价"></el-table-column>
            <el-table-column prop="Fxxcodes" label="物流码列表" ></el-table-column>
            <el-table-column prop="Barcodes" label="条码列表"></el-table-column>
        </el-table>
        商品详情
            <el-table :data="tableData" border style="width:100%">
                <el-table-column prop="ProductName" label="商品名称" width="180"></el-table-column>
                <el-table-column prop="TitleInfo" label="副标题" width="180"></el-table-column>
                <el-table-column prop="MaxQty" label="最大购买数量" width="180"> </el-table-column>
                <el-table-column prop="MemberPrice" label="商品价格"></el-table-column>
                <el-table-column prop="MinQty" label="最小购买数量" width="180"></el-table-column>
                <el-table-column prop="OrderCount" label="下单量" width="180"> </el-table-column>
                <el-table-column prop="PackSize" label="包装含量"></el-table-column>
                <el-table-column prop="ProductState" label="商品审核状态" width="180"></el-table-column>
                <el-table-column prop="SupplierID" label="二级供应商号" width="180"> </el-table-column>
                <el-table-column prop="TaxRate" label="税率"></el-table-column>
                <el-table-column prop="UnitID" label="单位编号" width="180"></el-table-column>
                <el-table-column prop="UnitName" label="单位名称" width="180"> </el-table-column>
                <el-table-column prop="Weight" label="重量"></el-table-column>
            </el-table>
    </div>
</template>
<script>
import { getProductDetail,getProductInfo } from '@/api/goodsList';
import qs from 'qs';
    export default{
        data(){
            return{
                products:[],             /* 商品信息都放在这里 */
                tableData:[],
                shopCode:"",
                ByshopCode:[]               /* 通过门店码获取到的商品信息 */
            }
        },
        methods:{
            getData(){
                let params = {
                    ID:decodeURI(location.href).split('=')[1].split('&')[0],
                    MainSupplierID:decodeURI(location.href).split('&')[1].split('=')[1],
                }
                getProductDetail(qs.stringify(params)).then((res)=>{
                    console.log(res.data.Result)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.products = JSON.parse(res.data.Result)
                        this.shopCode = this.products.LQInfo.ShopCode
                        console.log(this.products)
                        console.log(this.shopCode)
                        var tableData = []
                        for (let i in this.products) {
                            tableData.push(this.products[i]); //属性
                        }
                        this.tableData = tableData
                        console.log(tableData);
                        this.getDetailByShopCode()
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
            getDetailByShopCode(){
                let params = {
                    ShopCode:this.products.LQInfo.ShopCode
                }
                getProductInfo(qs.stringify(params)).then((res)=>{
                    console.log(res.data.Result)
                    this.$message(res.data.Result)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        console.log(JSON.parse(res.data.Result))
                        this.ByshopCode = JSON.parse(res.data.Result)
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
            }
        },
        created(){
            this.getData()
        }
    }
</script>
<style lang="scss" scoped>
    .el-form{
        width:100%;
        .el-form-item{
            width:45%
        }
    }
    .first{
        margin-bottom: 2vh!important
    }
</style>