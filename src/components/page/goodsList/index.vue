<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-s-goods"></i> 商品列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="head">
                <div class="top">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="主供应商" required>
                            <!-- 主供应商 -->
                            <el-select v-model="formInline.MainSupplierID" placeholder="主供应商" clearable filterable @change="getSupplier">
                                <el-option
                                v-for="item in formInline.option1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="供应商" required>
                            <!-- 供应商 -->
                            <el-select v-model="formInline.SupplierID" placeholder="供应商" clearable filterable @change="reset">
                                <el-option
                                v-for="item in formInline.option2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商品名称">
                            <!-- 商品名称 -->
                            <el-input
                                placeholder="商品名称"
                                v-model="formInline.productName"
                                clearable
                                style="width:180px"
                                 @change="reset"
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item label="商品编码">
                            <!-- 商品编码 -->
                            <el-input
                                placeholder="商品编码"
                                v-model="formInline.ID"
                                clearable
                                style="width:200px"
                                 @change="reset"
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item label="上下架状态">
                            <!-- 上下架状态 -->
                            <el-select v-model="formInline.value1" placeholder="上下架状态" clearable @change="reset">
                                <el-option
                                v-for="item in stateOptions"
                                :key="item.value1"
                                :label="item.label"
                                :value="item.value1">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="全部商品类型">
                            <!-- 全部商品类型 -->
                            <el-select v-model="formInline.value2" placeholder="全部商品类型" clearable @change="reset">
                                <el-option
                                v-for="item in productType"
                                :key="item.value2"
                                :label="item.label"
                                :value="item.value2">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="全部审核状态">
                            <!-- 全部审核状态 -->
                            <el-select v-model="formInline.value3" placeholder="全部审核状态" clearable @change="reset">
                                <el-option
                                v-for="item in reviewState"
                                :key="item.value3"
                                :label="item.label"
                                :value="item.value3">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="统一编码">
                            <!-- 商品编码 -->
                            <el-input
                                placeholder="统一编码"
                                v-model="formInline.productCode"
                                clearable
                                style="width:200px"
                                 @change="reset"
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item label="门店码">
                            <!-- 门店码 -->
                            <el-input
                                placeholder="门店码"
                                v-model="formInline.StoreCode"
                                clearable
                                style="width:200px"
                                 @change="reset"
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item label="物流码">
                            <el-input
                                placeholder="物流码"
                                v-model="formInline.trafficCode"
                                clearable
                                style="width:200px"
                                 @change="reset"
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item label="类目">
                            <el-cascader
                                ref="myCascader"
                                :options="formInline.productOptions"
                                :props="{ checkStrictly: true }"
                                v-model="formInline.productValue"
                                @change="handleChange"
                                clearable>
                            </el-cascader>
                        </el-form-item>
                        <el-form-item>
                        </el-form-item>
                        <el-form-item>
                            <!-- 搜索 -->
                            <el-button type="primary" @click="getData">搜索</el-button>
                            <!-- 重置 -->
                            <el-button type="primary" @click="clear">重置</el-button>
                        </el-form-item>
                        <el-form-item>
                            <!-- 新增 -->
                            <el-button type="primary"><router-link to="newgoods">新增商品</router-link></el-button>
                            <el-button type="primary" @click="exportExcel">导出</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <el-table :data="resData.List" border class="table" ref="multipleTable" v-loading="loading" highlight-current-row>
                <el-table-column prop="ID" label="商品编号"  width="80" align="center" ></el-table-column>
                <el-table-column label="商品名称" align="center" >
                    <template slot-scope="scope">
                        <a @click="jump(scope.$index, scope.row)" style="color:#436EEE">{{scope.row.ProductName}}</a>
                    </template>
                </el-table-column>
                <el-table-column label="商品图片"  width="100" align="center" >
                    <template slot-scope="scope">
                        <el-image      
                            :src="scope.row.HeadImageURL"                  
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="MainSupplierName" label="主供应商名" width="140" align="center" ></el-table-column>
                <el-table-column prop="SupplierName" label="供应商名" width="100" align="center" ></el-table-column>
                <el-table-column prop="MainSupplierID" label="主供应商号" width="100" align="center" ></el-table-column>
                <el-table-column prop="SupplierID" label="供应商号"  width="100" align="center" ></el-table-column>
                <el-table-column prop="UnitName" label="单位" width="60" align="center" ></el-table-column>
                <el-table-column label="库存" width="120" align="center" >
                    <template slot-scope="scope">
                        {{scope.row.Stock}}
                        <el-button type="text" icon="el-icon-edit" circle @click="saveEdit(scope.$index, scope.row)"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="价格"  width="90" align="center" >
                    <template slot-scope="scope">
                        {{scope.row.MemberPrice}}
                        <el-button type="text" icon="el-icon-edit" circle @click="PriceEdit(scope.$index, scope.row)"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="商品状态" width="90" align="center" >
                    <template slot-scope="scope">  
                        {{scope.row.ProductState === 'N' ? '待审核' : (scope.row.ProductState === 'O' ? '审核通过' : '驳回')}}
                    </template>
                </el-table-column>
                <el-table-column label="是否上架" width="90" align="center" >
                    <template slot-scope="scope">
                        {{scope.row.IsSell === 'Y' ? '已上架' : '未上架'}}
                    </template>
                </el-table-column>
                <el-table-column prop="ShopCode" label="门店码"  width="90" align="center" ></el-table-column>
                <el-table-column prop="UniCode" label="统一编码" width="100" align="center" ></el-table-column>
                <el-table-column prop="FxxCode" label="物流码" width="100" align="center" ></el-table-column> 
                <el-table-column label="操作" width="180" align="center" fixed="right">
                    <template slot-scope="scope" >        <!-- 未审核/驳回 -->
                        <el-button type="warning" icon="el-icon-star-off" @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.ProductState != 'O'">审核</el-button>
                        <el-button type="primary" icon="el-icon-star-off" @click="down(scope.$index, scope.row)"  v-if="scope.row.ProductState == 'O' && scope.row.IsSell === 'Y'">下架</el-button>
                        <el-button type="primary" plain icon="el-icon-edit" class="red" @click="productChange(scope.$index, scope.row)">修改</el-button>
                        <el-button type="primary" icon="el-icon-star-off" @click="up(scope.$index, scope.row)"  v-if="scope.row.ProductState == 'O' && scope.row.IsSell === 'N'">上架</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                 <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page= this.currentPage4
                    :page-size = this.PageSize
                    layout="total, sizes, prev, pager, next, jumper"
                    :total= this.total>
                </el-pagination>
            </div>
        </div>    

            <!-- 审核 -->
            <el-dialog title="审核" :visible.sync="editVisible" width="40%" :close-on-click-modal="false">
               <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="审核状态">
                    <el-radio v-model="form.AuditType" label="O">通过</el-radio>
                    <el-radio v-model="form.AuditType" label="B">驳回</el-radio>
                </el-form-item>
                <el-form-item label="审核备注">
                    <el-input v-model="form.AuditRemark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="Save">确 定</el-button>
            </span>
            </el-dialog>

            <!-- 库存编辑弹出框 -->
            <el-dialog title="修改库存" :visible.sync="editVisible2" width="40%" :close-on-click-modal="false">
                <el-form ref="form" :model="form" label-width="50px">
                    <el-form-item label="商品名称">
                        <el-input v-model="form.ProductName" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="商品库存">
                        <el-input v-model="form.Stock"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible2 = false">取 消</el-button>
                    <el-button type="primary" @click="changeStock">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 价格编辑弹出框 -->
            <el-dialog title="修改价格" :visible.sync="editVisible3" width="40%" :close-on-click-modal="false">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="调价商品名称">
                        <el-input v-model="form.ProductName" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格">
                        <el-input v-model="form.price"></el-input>
                    </el-form-item>
                    <el-form-item label="调价类型">
                        <el-radio-group v-model="form.radio">
                            <el-radio :label="1">永久</el-radio>
                            <el-radio :label="2">区间调价</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <template v-if="this.form.radio == 2">
                        <el-form-item label="调价开始时间">
                            <el-date-picker
                                v-model="form.changeTimeStart"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="选择日期时间"
                                >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="调价结束时间">
                            <el-date-picker
                                v-model="form.changeTimeEnd"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="选择日期时间"
                                >
                            </el-date-picker>
                        </el-form-item>
                    </template>
                    <el-form-item label="备注">
                        <el-input v-model="form.reMark"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible3 = false">取 消</el-button>
                    <el-button type="primary" @click="changePrice">确 定</el-button>
                </span>
            </el-dialog>
    </div>
</template>
<script>
import { getProductList,getIDclass,changeProductStock,ProductPriceAdjustment,ProductPriceChange,ProductState,SupplierListGetByLevel,ProductReview,ProductExPort } from "@/api/goodsList"
import qs from 'qs';
    export default{
        name: 'goodsList',
        data:function() {
            return {
                loading: false,          /* 加载 */
                currentPage4: 1,    /* 分页 */
                PageSize: 10,
                is_search: false,
                editVisible: false,
                editVisible2: false,
                editVisible3: false,
                formInline:{
                    productName:'',     /* 商品名称输入框 */
                    MainSupplierID:'',  /* 主供应商号 */
                    SupplierID:'',      /* 供应商号 */
                    ID:'',              /* 商品编码 */
                    productCode:'',     /* 统一编码输入框 */
                    StoreCode:'',       /* 店内码 */
                    trafficCode:'',     /* 物流码 */
                    option1:[],                 /* 主供应商选择器的备选 */
                    option2:[],                 /* 次供应商选择器的备选 */
                    value1: '',     /* 上下架状态 */
                    value2:'',      /* 全部商品类型 */
                    value3:'',      /* 全部审核状态 */
                    productOptions:[],      /* 商品备选  后端返回的数据放在这 */
                },
                stateOptions: [
                    {
                        value1: 'Y',
                        label: '上架',
                    }, 
                    {
                        value1: 'N',
                        label: '下架'
                    }
                ],
                productType:[
                    {
                        value2: 'N',
                        label: '单品',
                    }, 
                    {
                        value2: 'Y',
                        label: '套装'
                    }
                ],
                reviewState:[
                    {
                        value3: 'N',
                        label: '待审核',
                    }, 
                    {
                        value3: 'O',
                        label: '审核通过'
                    },
                    {
                        value3: 'B',
                        label: '审核不通过'
                    }
                ],
                restaurants: [],        /* 存放审核时的参数 */
                state1: '',
                state2: '',
                productValue:'',        /* 商品备选的value */
                resData:[],
                total:'',
                form:{
                    ProductName:'',             /* 商品名称 */
                    ID:'',                      /* 商品编码 */
                    Stock:'',                   /* 商品库存 */
                    reMark:'',                  /* 备注 */
                    radio: 1,                      /* 调价类型 */
                    AuditType:'',                   /* 审核状态 */
                    AuditRemark:'',                 /* 审核备注 */
                    changeTimeStart:'',             /* 调价开始时间 */
                    changeTimeEnd:'',             /* 调价结束时间 */
                    price:'',                       /* 商品价格 */
                },
                productID:'',
            }
        },
        methods: {
            reset(){
                this.currentPage4 = 1,
                this.PageSize = 10
            },
            handleSizeChange(size) {
                this.PageSize = size
                this.getData()
            },
            handleCurrentChange(index) {
                this.currentPage4 = index
                this.getData()
            },
            handleSelect(item) {
                console.log(item);
            },
            updateDateStart(val) {
                this.form.changeTimeStart = val + " 00:00:00"
            },
            updateDateEnd(val) {
                this.form.changeTimeEnd = val + " 00:00:00"
            },
            //获取数据
            getData() {
                this.loading = true
                let params = {
                    PageIndex:this.currentPage4,
                    PageSize:this.PageSize,
                    ProductName:this.formInline.productName,
                    ID:this.formInline.ID.replace(/ /g,''),                      /* 商品编码 */
                    MainSupplierID:this.formInline.MainSupplierID,
                    SupplierID:this.formInline.SupplierID,
                    Unicode:this.formInline.productCode.replace(/ /g,''),               /* 统一编码 */
                    IsSell:this.formInline.value1,
                    AuditState:this.formInline.value3,
                    IsGroupProduct:this.formInline.value2,
                    Fxxcode:this.formInline.trafficCode.replace(/ /g,''),
                    ShopCode:this.formInline.StoreCode.replace(/ /g,''),
                    ClassID:this.formInline.productValue
                }
                getProductList(qs.stringify(params)).then((res)=>{
                    this.loading = false
                    if(res.data.Success == 1){
                        this.resData = JSON.parse(res.data.Result)
                        this.total = this.resData.TotalCount
                        console.log(this.resData)
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
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.id = row.id;
                this.editVisible = true;
                this.restaurants = row
            },
            Save(){
                let params = {
                    MainSupplierID:this.restaurants.MainSupplierID,
                    ID:this.restaurants.ID,
                    AuditType:this.form.AuditType,
                    AuditRemark:this.form.AuditRemark
                }
                ProductReview(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('审核成功')
                        this.editVisible = false
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
            productChange(index, row) {
                this.$router.push({
                    path:'/changeProductDetail',
                    query:{
                        ID: row.ID,
                        MainSupplierID:row.MainSupplierID,
                    }
                })
            },
            clear(){       
                this.formInline.SupplierID="",
                this.formInline.MainSupplierID="",
                this.formInline.productName="";
                this.formInline.productCode="";
                this.formInline.StoreCode="";
                this.formInline.trafficCode="";
                this.formInline.value1="";
                this.formInline.value2="";
                this.formInline.value3=""
                this.formInline.productValue = ''
            },
            productData(){
                if(localStorage.productIdClass == null) {
                    console.log(localStorage.productIdClass)
                    let params = {}
                    getIDclass(qs.stringify(params)).then((res)=>{
                        if(res.data.Success == 1){
                            this.formInline.productOptions = JSON.parse(res.data.Result)
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
                    this.formInline.productOptions = JSON.parse(localStorage['productIdClass'])
                }
            },
            handleChange(value){         /* 商品选择的方法 */
                let rang = []
                for(let i = 0 ; i < value.length; i++){
                    if(i == value.length - 1){
                        rang.push(value[i])
                    }
                }
                this.formInline.productValue = rang[0]
                this.currentPage4 = 1,
                this.PageSize = 10
            },
            changeStock(){              /* 修改库存 */
                let params = {
                    ProductID:this.form.ID,
                    Stock:this.form.Stock
                }
                changeProductStock(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.editVisible2 = false;
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
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
            saveEdit(value, row){         /* 修改库存 */
                this.editVisible2 = true;
                this.form.ProductName = row.ProductName;
                this.form.ID = row.ID;
                this.form.Stock = row.Stock
            },
            PriceEdit(value, row){      /* 调整价格 */
                this.editVisible3 = true;
                this.form.ProductName = row.ProductName;
                this.form.ID = row.ID;
                this.form.price = row.MemberPrice
            },
            changePrice(){              /* 调整价格 */
                let params = {
                    ProductID:this.form.ID,
                    NewPrice:this.form.price,
                    ChangeType:this.form.radio == 1 ? 'Y' : 'Q',
                    BeginTime:this.form.changeTimeStart,
                    EndTime:this.form.changeTimeEnd,
                    Remark:this.form.reMark,
                }
                ProductPriceAdjustment(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.editVisible3 = false;
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.form.ID = '',
                        this.form.price = '',
                        this.form.changeTimeStart = '',
                        this.form.changeTimeEnd = '',
                        this.form.reMark = '',
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
            up(value, row){
                let params = {
                    MainSupplierID:row.MainSupplierID,
                    ID:row.ID,
                    SallType:'UP',
                }
                ProductState(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.editVisible3 = false;
                        this.getData()
                        this.$message({
                            message: '商品上架成功',
                            type: 'success'
                        });
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
            jump(value, row){
                this.productID = row.id;
                this.$router.push({
                    path:'/productDetail',
                    query:{
                        ID: row.ID,
                        MainSupplierID:row.MainSupplierID
                    }
                })
            },
            down(value, row){
                let params = {
                    MainSupplierID:row.MainSupplierID,
                    ID:row.ID,
                    SallType:'DOWN',
                }
                ProductState(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.editVisible3 = false;
                        this.getData()
                        this.$message({
                            message: '商品下架成功',
                            type: 'success'
                        });
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
            getMainSupplier(){
                let params = {
                    Level:1
                }
                SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.formInline.option1 = JSON.parse(res.data.Result)
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
                this.formInline.SupplierID = ''
                this.formInline.option2 = ''
                let params = {
                    Level:2,
                    MainSupplierID:this.formInline.MainSupplierID
                }
                SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.formInline.option2 = JSON.parse(res.data.Result)
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
            exportExcel(){
                let params = {
                    ProductName:this.formInline.productName,
                    // ID:this.formInline.ID.replace(/ /g,''),                      /* 商品编码 */
                    MainSupplierID:this.formInline.MainSupplierID,
                    SupplierID:this.formInline.SupplierID,
                    Unicode:this.formInline.productCode.replace(/ /g,''),               /* 统一编码 */
                    IsSell:this.formInline.value1,
                    AuditState:this.formInline.value3,
                    IsGroupProduct:this.formInline.value2,
                    Fxxcode:this.formInline.trafficCode.replace(/ /g,''),
                    ShopCode:this.formInline.StoreCode.replace(/ /g,''),
                    ClassID:this.formInline.productValue
                }
                ProductExPort(qs.stringify(params)).then((res)=>{
                    var blob = new Blob([res.data]); //application/vnd.openxmlformats-officedocument.wordprocessingml.document这里表示doc类型
                    var contentDisposition = res.headers["content-disposition"]; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
                    var patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
                    var result = patt.exec(contentDisposition);
                    console.log(result)
                    var filename = result[1];
                    if (window.navigator.msSaveOrOpenBlob) {
                        //兼容ie
                        navigator.msSaveBlob(blob, filename);
                    } else {
                        var downloadElement = document.createElement("a");
                        var href = window.URL.createObjectURL(blob); //创建下载的链接
                        var reg = /^["](.*)["]$/g;
                        downloadElement.style.display = "none";
                        downloadElement.href = href;
                        downloadElement.download = decodeURI(filename.replace(reg, "$1")); //下载后文件名
                        document.body.appendChild(downloadElement);
                        downloadElement.click(); //点击下载
                        document.body.removeChild(downloadElement); //下载完成移除元素
                        window.URL.revokeObjectURL(href); //释放掉blob对象
                    }
                }).catch(function(e){
                    console.log(e)
                })
            },
        },
        created(){
            this.productData()
            this.getMainSupplier()
        },

    }
</script>  
<style lang="scss" scoped>
    .head{
        .top{
            display:flex;
            margin-bottom: 10px;
            > * {   
                margin:0 5px;
            }

        }
        .second{
            display:flex;
            margin-bottom: 10px;
            > * {   
                margin:0 5px;
            }
        }
    }
    .el-button--success{
        span{
            a{
                color: #67C23A;
            }
        }
        span:hover{
            a{
                color:#fff
            }
        }
    }
    .el-button--primary{
        span{
            a{
                color: #fff;
            }
        }
    }
</style>