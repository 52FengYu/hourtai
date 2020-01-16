<template>
    <div>
        <el-card>
            <h2 style="text-align:center">分享活动明细</h2>
            <br>
            <div style="display:flex;">
                <el-button type="primary" @click="add">添加明细</el-button>
                <el-button type="primary" @click="showCode">点击查看二维码</el-button>
            </div>
            <div v-if="this.url != '' && newFlag == true" style="height:400px;width:500px;position:absolute;z-index:100;border:1px black solid;left:25%;background:rgb(233,233,242);margin:5% auto;text-align:center;padding-top:3%;border-radius:5px"> 
                <b>分享链接：</b>
                <span style="margin-bottom:20px">{{this.url}}</span>
                <p>  &nbsp;  </p>
                <qrcode :url="url" :iconurl="icon" :wid="250" :hei="250" :imgwid="90" :imghei="90" style="background:white;padding:10px"></qrcode>
                <span style="position:absolute;top:0;right:0;font-size:18px" @click="newFlag = false">X  </span>
            </div>
            <el-table :data="tableData.ModelList" border style="width: 100%">
                <el-table-column prop="ID" label="明细编号" align="center"></el-table-column>
                <el-table-column prop="DisplayName" label="商品名称" align="center"></el-table-column>
                <el-table-column prop="ProductID" label="商品编码" align="center"></el-table-column>
                <el-table-column prop="SupplierName" label="主供应商名称" align="center"></el-table-column>
                <el-table-column prop="MainSupplierID" label="主供应商号" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="reset();change(scope.row)">修改</el-button>
                        <el-button type="danger" @click="open(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 添加分享活动明细 -->
        <el-dialog title="添加分享" :visible.sync="editVisible" width="85%" :close-on-click-modal="false" style="margin:0 auto;margin-top: 5vh;width: 85%;margin-bottom: 0px;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <!-- 主供应商 -->
                <el-form-item label="主供应商" required  v-show="this.Flag == true">
                    <el-select v-model="formInline.MainSupplierID" placeholder="主供应商" clearable filterable @change="getSupplier">
                        <el-option
                            v-for="item in formInline.option1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- 供应商 -->
                <el-form-item label="供应商" required v-show="this.Flag == true">
                    <el-select v-model="formInline.SupplierID" placeholder="供应商" clearable filterable>
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
                    >
                    </el-input>
                </el-form-item>
                <el-form-item label="上下架状态">
                    <!-- 上下架状态 -->
                    <el-select v-model="formInline.value1" placeholder="上下架状态" clearable>
                        <el-option
                        v-for="item in stateOptions"
                        :key="item.value1"
                        :label="item.label"
                        :value="item.value1">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="门店码">
                    <!-- 门店码 -->
                    <el-input
                        placeholder="门店码"
                        v-model="formInline.StoreCode"
                        clearable
                        style="width:200px"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item label="统一编码">
                    <!-- 商品编码 -->
                    <el-input
                        placeholder="统一编码"
                        v-model="formInline.productCode"
                        clearable
                        style="width:200px"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item label="物流码">
                    <el-input
                        placeholder="物流码"
                        v-model="formInline.trafficCode"
                        clearable
                        style="width:200px"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="reset();getTableDate()">搜索</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="resData.List" border class="table" ref="multipleTable" v-loading="loading" highlight-current-row style="margin:0 auto;overflow-y:scroll" @selection-change="handleSelectionChange" height="500">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="ID" label="商品编号"  width="80" align="center" ></el-table-column>                                                            
                <el-table-column label="商品名称" align="center" >
                    <template slot-scope="scope">
                        <a @click="jump(scope.$index, scope.row)" style="color:#436EEE">{{scope.row.ProductName}}</a>
                    </template>
                </el-table-column>
                <el-table-column label="商品图片"  width="100" align="center" >
                    <template slot-scope="scope">
                        <el-image :src="scope.row.HeadImageURL"  v-if="scope.row.HeadImageURL.substr(0,4) == 'http'" lazy></el-image>
                        <el-image :src="'http://images.liqunshop.com/' + scope.row.HeadImageURL"  v-if="scope.row.HeadImageURL.substr(0,4) != 'http' && scope.row.HeadImageURL != ''" lazy></el-image>
                        <span v-show="scope.row.HeadImageURL == ''">图片不存在</span>
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
                    </template>
                </el-table-column>
                <el-table-column label="价格"  width="90" align="center" >
                    <template slot-scope="scope">
                        {{scope.row.MemberPrice}}
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
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="PageIndex"
                :page-size="this.PageSize"
                layout="total, sizes, prev, pager, next, jumper"
                align="right"
                :total= this.resData.TotalCount>
            </el-pagination>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit" v-if="this.Flag == true">添加确认</el-button>
                <el-button type="primary" @click="Submit" v-if="this.Flag == false">修改确认</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script >
    import { ProductGrpShareDetailListGetFromProductGrpShareID,SupplierListGetByLevel,getProductList,ProductGrpShareDetailAdd,ProductGrpShareDetailUpdate,ProductGrpShareDetailDelete,ProductGrpShareURLGet } from '@/api/goodsList'
    import qs from 'qs'
    import qrcode from 'vue_qrcodes'
    name:'PortfolioDetails'
    export default{
        data(){
            return{
                tableData:[],
                editVisible:false,          /* 添加分享活动明细 */
                formInline:{
                    MainSupplierID:'',
                    option1:'',
                    SupplierID:'',
                    option2:'',
                    productName:'',
                    ID:'',
                    value1:'',
                    productCode:'',
                    StoreCode:'',
                    trafficCode:'',
                    detailID:'',                /* 明细单号，在修改时用 */
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
                resData:[],
                loading: false,          /* 加载 */
                multipleSelection:[],
                PageSize:10,
                PageIndex:1,
                Flag:false,                 /* 控制主供应商/供应商的显示与隐藏 */
                row:"",                     /* 删除时 明细id存放在这 */
                url:"",
                icon:"",
                newFlag:false,          /* 控制二维码的显示 */
            }
        },
        methods:{
            getData(){
                let params = {
                    ProductGrpShareID:decodeURI(location.href).split('?')[1].split('=')[1],
                }
                ProductGrpShareDetailListGetFromProductGrpShareID(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.tableData = JSON.parse(res.data.Result)
                        console.log(this.tableData)
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
            reset(){
                this.PageIndex = 1
                this.PageSize = 10
            },
            getTableDate(){                 /* 添加明细弹窗 获取商品列表 */
                let params = {
                    ProductName:this.formInline.productName,
                    ID:this.formInline.ID.replace(/ /g,''),                      /* 商品编码 */
                    MainSupplierID:this.formInline.MainSupplierID,
                    SupplierID:this.formInline.SupplierID,
                    Unicode:this.formInline.productCode.replace(/ /g,''),               /* 统一编码 */
                    IsSell:this.formInline.value1,
                    Fxxcode:this.formInline.trafficCode.replace(/ /g,''),
                    ShopCode:this.formInline.StoreCode.replace(/ /g,''),
                    PageIndex:this.PageIndex,
                    PageSize:this.PageSize,
                }
                getProductList(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.resData = JSON.parse(res.data.Result)
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
            handleSelectionChange(val) {                    /* 选框多选 */
                console.log(val)
                this.multipleSelection = []
                for(var i = 0;i < val.length ; i++){
                    this.multipleSelection.push({ID:val[i].ID,MainSupplierID:val[i].MainSupplierID})
                }
                console.log(this.multipleSelection)
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.PageSize = val
                this.getTableDate()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.PageIndex = val
                this.getTableDate()
            },
            onSubmit(){                     /* 添加分享活动明细 */
                let params = {
                    ProductGrpShareID:decodeURI(location.href).split('?')[1].split('=')[1],
                    MainSupplierID:this.formInline.MainSupplierID,
                    ProductID:JSON.stringify(this.multipleSelection)
                }
                ProductGrpShareDetailAdd(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('添加成功')
                        this.editVisible = false
                        this.getData()
                        this.getQrCode()
                        this.formInline.productName = '',
                        this.formInline.ID = '',
                        this.formInline.MainSupplierID = ''
                        this.formInline.SupplierID = ''
                        this.formInline.productCode = ''
                        this.formInline.value1 = ''
                        this.formInline.trafficCode = ''
                        this.formInline.StoreCode = ''
                        this.resData = []
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
            add(){                  /* 添加页面明细 */
                this.editVisible = true
                this.Flag = true
            },
            change(row){               /* 修改页面明细 */
                this.editVisible = true
                this.Flag = false
                this.resData = []
                this.formInline.MainSupplierID = row.MainSupplierID
                this.formInline.detailID = row.ID
                this.getTableDate()
                console.log(row)
            },
            Submit(){                   /* 修改分享活动明细 */
                let params = {
                    ID:this.formInline.detailID,
                    ProductID:JSON.stringify(this.multipleSelection).replace(/\[/g,'').replace(/\]/g,'').replace(/"/g,'')
                }
                ProductGrpShareDetailUpdate(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('修改成功')
                        this.editVisible = false
                        this.getData()
                        this.getQrCode()
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
            open(row) {
                console.log(row)
                this.row = row.ID
                this.$confirm('此操作将删除该明细, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteItem()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            deleteItem(){
                let params = {
                    ID:this.row
                }
                ProductGrpShareDetailDelete(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('删除成功')
                        this.getData()
                        this.getQrCode()
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
            getQrCode(){                    /* 获取二维码 */
                this.icon = ''
                this.url = ''
                let params = {
                    ID:decodeURI(location.href).split('?')[1].split('=')[1],
                }
                ProductGrpShareURLGet(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.icon = JSON.parse(res.data.Result).ImageURL
                        this.url = JSON.parse(res.data.Result).ShareURL
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
            showCode(){
                this.newFlag = true
            }
        },
        created(){
            this.getData()
            this.getMainSupplier()
            this.getSupplier()
            this.getQrCode()
        },
        components:{
            qrcode
        },
    }
</script> 
<style lang="scss">
    .el-dialog{
        margin-top: 5vh!important;
        width: 85%;
        margin-bottom: 0px!important;
    }
</style>