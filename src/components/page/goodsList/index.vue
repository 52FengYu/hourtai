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
                        <!-- 选择店铺名称 -->
                    <!-- <el-row class="demo-autocomplete">
                        <el-col :span="12" style="width:100%">
                            <el-autocomplete
                            class="inline-input"
                            v-model="state1"
                            :fetch-suggestions="querySearch"
                            placeholder="请选择门店"
                            @select="handleSelect"
                            style="width:100%"
                            ></el-autocomplete>
                        </el-col>
                    </el-row> -->
                    <!-- 主供应商号 -->
                    <el-input
                        placeholder="主供应商号"
                        v-model="MainSupplierID"
                        clearable
                        style="width:180px"
                    >
                    </el-input>
                    <!-- 供应商号 -->
                     <el-input
                        placeholder="主供应商号"
                        v-model="SupplierID"
                        clearable
                        style="width:180px"
                    >
                    </el-input>
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
                    <!-- 集团统一码 -->
                   <!--  <el-input
                        placeholder="集团统一码"
                        v-model="unifiedCode"
                        clearable
                        style="width:200px"
                    >
                    </el-input> -->
                    <!-- 店内码 -->
                    <el-input
                        placeholder="店内码"
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
            <el-table :data="resData.List" border class="table" ref="multipleTable">
                <el-table-column prop="ID" label="商品编号"  width="80" align="center" ></el-table-column>
                <el-table-column prop="ProductName" label="商品名称" align="center" ></el-table-column>
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
                <el-table-column prop="Stock" label="库存" width="120" align="center" >
                        <el-button type="text" icon="el-icon-edit" circle></el-button>
                </el-table-column>
                <el-table-column prop="MemberPrice" label="价格"  width="90" align="center" ><el-button type="text" icon="el-icon-edit" circle></el-button></el-table-column>
                <el-table-column prop="MainSupplierName" label="主供应商名" width="140" align="center" ></el-table-column>
                <el-table-column prop="SupplierName" label="供应商名" width="100" align="center" ></el-table-column>
                <el-table-column prop="MainSupplierID" label="主供应商号" width="100" align="center" ></el-table-column>
                <el-table-column prop="SupplierID" label="供应商号"  width="100" align="center" ></el-table-column>
                <el-table-column prop="ProductState" label="商品状态" width="90" align="center" ></el-table-column>
                <el-table-column prop="IsSell" label="是否上架" width="90" align="center" ></el-table-column>
                <el-table-column prop="ShopCode" label="门店码"  width="90" align="center" ></el-table-column>
                <el-table-column prop="UniCode" label="统一编码" width="100" align="center" ></el-table-column>
                <el-table-column prop="FxxCode" label="物流码" width="100" align="center" ></el-table-column> -->
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
            <!-- 编辑弹出框 -->
            <!-- <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
                <el-form ref="form" :model="form" label-width="50px">
                    <el-form-item label="日期">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input v-model="form.address"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
            </el-dialog> -->
            
            <!-- 删除提示框 -->
            <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
                <div class="del-dialog-cnt">删除不可恢复,是否确定删除？</div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="delVisible = false">取 消</el-button>
                    <el-button type="primary" >确 定</el-button>
                </span>
            </el-dialog>
        
    </div>
</template>
<script>
import { getProductList,getIDclass } from "@/api/goodsList"
import qs from 'qs';
    export default{
        data() {
            return {
                currentPage4: 1,    /* 分页 */
                PageSize: 10,
                is_search: false,
                editVisible: false,
                delVisible: false,
                productName:'',     /* 商品名称输入框 */
                MainSupplierID:'',  /* 主供应商号 */
                SupplierID:'',      /* 供应商号 */
                productCode:'',     /* 统一编码输入框 */
                // unifiedCode:'',     /* 集团统一码 */
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
                idx: -1,
                id: -1,
                restaurants: [],
                state1: '',
                state2: '',
                productOptions:[],      /* 商品备选  后端返回的数据放在这 */
                productValue:'',        /* 商品备选的value */
                resData:[],
                total:''
            }
        },
        methods: {
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
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
            //获取数据
            getData() {
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

                }
                getProductList(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
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
                this.idx = index;
                this.id = row.id;
                this.form = {
                    id: row.id,
                    name: row.name,
                    date: row.date,
                    address: row.address
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.id = row.id;
                this.delVisible = true;
            },
            clear(){
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
                    // console.log(res.data.Result)
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
            }
        },
        handleChange(value){         /* 商品选择的方法 */
            console.log(value)
        },
        created(){
            this.productData()
        }
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