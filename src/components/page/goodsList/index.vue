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
                        <!-- 主供应商 -->
                    <el-select v-model="MainSupplierID" placeholder="主供应商">
                        <el-option
                        v-for="item in option1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <!-- 供应商 -->
                    <el-select v-model="SupplierID" placeholder="供应商">
                        <el-option
                        v-for="item in option2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <!-- 商品名称 -->
                    <el-input
                        placeholder="商品名称"
                        v-model="productName"
                        clearable
                        style="width:180px"
                    >
                    </el-input>
                    <!-- 商品编码 -->
                    <el-input
                        placeholder="统一编码"
                        v-model="productCode"
                        clearable
                        style="width:200px"
                    >
                    </el-input>
                    <!-- 上下架状态 -->
                    <el-select v-model="value1" placeholder="上下架状态">
                        <el-option
                        v-for="item in stateOptions"
                        :key="item.value1"
                        :label="item.label"
                        :value="item.value1">
                        </el-option>
                    </el-select>
                    <!-- 全部商品类型 -->
                    <el-select v-model="value2" placeholder="全部商品类型">
                        <el-option
                        v-for="item in productType"
                        :key="item.value2"
                        :label="item.label"
                        :value="item.value2">
                        </el-option>
                    </el-select>
                    <!-- 全部审核状态 -->
                    <el-select v-model="value3" placeholder="全部审核状态">
                        <el-option
                        v-for="item in reviewState"
                        :key="item.value3"
                        :label="item.label"
                        :value="item.value3">
                        </el-option>
                    </el-select>
                    <!-- 门店码 -->
                    <el-input
                        placeholder="门店码"
                        v-model="StoreCode"
                        clearable
                        style="width:200px"
                    >
                    </el-input>
                </div>
                <div class="second">
                    <!-- 物流码 -->
                    <el-input
                        placeholder="物流码"
                        v-model="trafficCode"
                        clearable
                        style="width:200px"
                    >
                    </el-input>
                    <!-- 请选择类目 -->
                    <el-cascader :options="productOptions"  clearable v-model="productValue" @change="handleChange" placeholder="请选择类目"></el-cascader>
                    <!-- 搜索 -->
                    <el-button type="primary" @click="getData">搜索</el-button>
                    <!-- 重置 -->
                    <el-button type="primary" @click="clear">重置</el-button>
                    <!-- 导出 -->
                    <el-button type="primary">导出</el-button>
                    <!-- 新增 -->
                    <el-button type="primary"><router-link to="newgoods">新增商品</router-link></el-button>
                </div>
            </div>
            <el-table :data="resData.List" border class="table" ref="multipleTable" v-loading="loading">
                <el-table-column prop="ID" label="商品编号"  width="80" align="center" ></el-table-column>
                <el-table-column label="商品名称" align="center" >
                    <template slot-scope="scope">
                        <a @click="jump(scope.$index, scope.row)">{{scope.row.ProductName}}</a>
                    </template>
                </el-table-column>
                <el-table-column label="商品图片"  width="100" align="center" >
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-HeadImageURL"
                            :src="scope.row.HeadImageURL"
                            :preview-src-list="[scope.row.HeadImageURL]"
                        ></el-image>
                    </template>
                </el-table-column>
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
                <el-table-column prop="MainSupplierName" label="主供应商名" width="140" align="center" ></el-table-column>
                <el-table-column prop="SupplierName" label="供应商名" width="100" align="center" ></el-table-column>
                <el-table-column prop="MainSupplierID" label="主供应商号" width="100" align="center" ></el-table-column>
                <el-table-column prop="SupplierID" label="供应商号"  width="100" align="center" ></el-table-column>
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
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope" >        <!-- 未审核/驳回 -->
                        <el-button type="warning" icon="el-icon-star-off" @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.ProductState != 'O'">审核</el-button>
                        <el-button type="primary" icon="el-icon-star-off" @click="down(scope.$index, scope.row)"  v-if="scope.row.ProductState == 'O' && scope.row.IsSell === 'Y'">下架</el-button>
                        <el-button type="primary" plain icon="el-icon-edit" class="red" @click="productChange(scope.$index, scope.row)"  v-if="scope.row.ProductState == 'O' && scope.row.IsSell === 'Y'">修改</el-button>
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
            <el-dialog title="修改库存" :visible.sync="editVisible" width="40%">
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
            <el-dialog title="修改库存" :visible.sync="editVisible2" width="40%">
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
            <el-dialog title="修改价格" :visible.sync="editVisible3" width="40%">
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
                                type="date"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                placeholder="开始时间"
                                @change="updateDateStart">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="调价结束时间">
                            <el-date-picker
                                v-model="form.changeTimeEnd"
                                type="date"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                placeholder="结束时间"
                                @change="updateDateEnd">
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
import { getProductList,getIDclass,changeProductStock,ProductPriceAdjustment,ProductPriceChange,ProductState,SupplierListGetByLevel,ProductReview } from "@/api/goodsList"
import qs from 'qs';
    export default{
        data() {
            return {
                loading: false,          /* 加载 */
                currentPage4: 1,    /* 分页 */
                option1:[],                 /* 主供应商选择器的备选 */
                option2:[],                 /* 次供应商选择器的备选 */
                PageSize: 10,
                is_search: false,
                editVisible: false,
                editVisible2: false,
                editVisible3: false,
                productName:'',     /* 商品名称输入框 */
                MainSupplierID:'',  /* 主供应商号 */
                SupplierID:'',      /* 供应商号 */
                productCode:'',     /* 统一编码输入框 */
                StoreCode:'',       /* 店内码 */
                trafficCode:'',     /* 物流码 */
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
                value1: '',     /* 上下架状态 */
                value2:'',      /* 全部商品类型 */
                value3:'',      /* 全部审核状态 */
                restaurants: [],        /* 存放审核时的参数 */
                state1: '',
                state2: '',
                productOptions:[],      /* 商品备选  后端返回的数据放在这 */
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
            handleSizeChange(size) {
                this.PageSize = size
                console.log(`每页 ${size} 条`);
                this.getData()
            },
            handleCurrentChange(index) {
                this.currentPage4 = index
                console.log(`当前页: ${index}`);
                this.getData()
            },
            handleSelect(item) {
                console.log(item);
            },
            updateDateStart(val) {
                console.log("val:" + val)
                this.form.changeTimeStart = val + " 00:00:00"
                console.log("this.value1:" + this.value1)
            },
            updateDateEnd(val) {
                console.log("val:" + val)
                this.form.changeTimeEnd = val + " 00:00:00"
                console.log("this.value1:" + this.value1)
            },
            //获取数据
            getData() {
                this.loading = true
               let params = {
                    PageIndex:this.currentPage4,
                    PageSize:this.PageSize,
                    ProductName:this.productName,
                    MainSupplierID:this.MainSupplierID,
                    SupplierID:this.SupplierID,
                    Unicode:this.productCode,               /* 统一编码 */
                    IsSell:this.value1,
                    AuditState:this.value3,
                    IsGroupProduct:this.value2,
                    Fxxcode:this.trafficCode,
                    ShopCode:this.StoreCode,
                    ClassID:this.productValue
                }
                getProductList(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    this.loading = false
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        console.log(JSON.parse(res.data.Result))
                        this.resData = JSON.parse(res.data.Result)
                        this.total = this.resData.TotalCount
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
                console.log(row)
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
                    console.log(res.data.Result)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.$message.success('审核成功')
                        this.editVisible = false
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
            productChange(index, row) {
                this.$router.push({
                    path:'/changeProductDetail',
                    query:{
                        ID: row.ID,
                        MainSupplierID:row.MainSupplierID
                    }
                })
            },
            clear(){
                this.SupplierID="",
                this.MainSupplierID="",
                this.productName="";
                this.productCode="";
                this.unifiedCode="";
                this.StoreCode="";
                this.trafficCode="";
                this.value1="";
                this.value2="";
                this.value3=""
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
            handleChange(value){         /* 商品选择的方法 */
                console.log(value)
            },
            changeStock(){              /* 修改库存 */
                let params = {
                    ProductID:this.form.ID,
                    Stock:this.form.Stock
                }
                changeProductStock(qs.stringify(params)).then((res)=>{
                    console.log(res.data.Result)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.editVisible2 = false;
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.getData()
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
            saveEdit(value, row){         /* 修改库存 */
                this.editVisible2 = true;
                this.form.ProductName = row.ProductName;
                this.form.ID = row.ID;
                this.form.Stock = row.Stock
            },
            PriceEdit(value, row){      /* 调整价格 */
                this.editVisible3 = true;
                console.log(row)
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
                    console.log(res.data.Result)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
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
            up(value, row){
                console.log(row)
                let params = {
                    MainSupplierID:row.MainSupplierID,
                    ID:row.ID,
                    SallType:'UP',
                }
                ProductState(qs.stringify(params)).then((res)=>{
                    console.log(res.data.Result)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.editVisible3 = false;
                        this.getData()
                        this.$message({
                            message: '商品上架成功',
                            type: 'success'
                        });
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
                    console.log(res.data.Result)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.editVisible3 = false;
                        this.getData()
                        this.$message({
                            message: '商品下架成功',
                            type: 'success'
                        });
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
            getMainSupplier(){
                let params = {
                    Level:1
                }
                SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.option1 = JSON.parse(res.data.Result)
                        console.log(this.option1)
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
                    }
                }).catch(function(e){
                    console.log(e)
                    console.log('出错了')
                })
            }
        },
        created(){
            this.productData()
            this.getMainSupplier()
            this.getSupplier()
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