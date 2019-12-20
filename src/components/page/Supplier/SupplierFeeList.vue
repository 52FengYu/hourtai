<template>
    <div>
        <el-card>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="供应商号">
                    <el-select v-model="formInline.SupplierID" placeholder="供应商" clearable filterable>
                        <el-option
                            v-for="item in formInline.Suppliers"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="区域号">
                    <el-input v-model="formInline.AreaID" placeholder="区域号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getData">搜索</el-button>
                    <el-button type="primary" @click="editVisible = true">添加</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData.ModelList" border style="width: 100%">
                <el-table-column prop="AreaName" label="地区名称" align="center"></el-table-column>
                <el-table-column prop="SupplierID" label="供应商号" align="center"></el-table-column>
                <el-table-column prop="AreaID" label="地区编号" align="center"></el-table-column>
                <el-table-column prop="SmallAreaXY" label="坐标范围" align="center"></el-table-column>
                <el-table-column prop="OrderMinPrice" label="订单最小免运费金额" align="center"></el-table-column>
                <el-table-column prop="LessMinPriceSendFee" label="不满足最小金额最低收取运费金额" align="center"></el-table-column>
                <el-table-column prop="FreeWeight" label="满足金额免除多少重量运费" align="center"></el-table-column>
                <el-table-column prop="AddWeight" label="每增加重量" align="center"></el-table-column>
                <el-table-column prop="AddSendFee" label="每增加指定重量增加多少运费" align="center"></el-table-column>
                <el-table-column label="操作" align="center" fixed="right" min-width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="change(scope.row)">修改</el-button>
                        <el-button type="danger" plain @click="open(scope.row)">废弃</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 增加供应运费信息 -->
        <el-dialog title="增加供应运费信息" :visible.sync="editVisible" width="60%" :close-on-click-modal="false">
            <el-form ref="form" :model="form" label-width="140px">
                <el-form-item label="供应商" required>
                   <el-select v-model="form.SupplierID" placeholder="供应商" clearable filterable>
                        <el-option
                            v-for="item in form.Suppliers"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="运费类型" required>
                    <el-select v-model="form.SendFeeType" placeholder="请选择" clearable >
                        <el-option label="地图选区" value="SmallArea"></el-option>
                        <el-option label="普通区域运费" value="OtherArea"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地区ID" v-if="form.SendFeeType === 'OtherArea'">
                    <el-cascader
                        size="large"
                        :options="form.options"
                        :props="{ multiple: true }"
                        @change="handleChange"
                        clearable>
                    </el-cascader>
                </el-form-item>
                <el-form-item label="坐标范围" v-if="form.SendFeeType === 'SmallArea'">
                    <el-button type="primary"><router-link to="/test">划定区域</router-link></el-button>
                    <el-button type="primary" @click="getAreaXY">获取数据</el-button>
                    <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"
                        v-model="form.SmallAreaXY">
                    </el-input>
                </el-form-item>
                <el-form-item label="每超出重量增加运费金额" required>
                    <el-input v-model="form.AddSendFee"></el-input>
                </el-form-item>
                <el-form-item label="每超出多少重量" required>
                    <el-input v-model="form.AddWeight"></el-input>
                </el-form-item>
                <el-form-item label="满足金额免除多少重量运费" required>
                    <el-input v-model="form.FreeWeight"></el-input>
                </el-form-item>
                <el-form-item label="订单小于多少金额收取多少运费" required>
                    <el-input v-model="form.LessMinPriceSendFee"></el-input>
                </el-form-item>
                <el-form-item label="订单最小免运费金额" required>
                    <el-input v-model="form.OrderMinPrice"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="addFee">确 定</el-button>
            </span>
        </el-dialog>

         <!-- 修改供应运费信息 -->
        <el-dialog title="修改供应运费信息" :visible.sync="editVisible2" width="60%" :close-on-click-modal="false">
            <el-form ref="form" :model="row" label-width="140px">
                <el-form-item label="供应商" required>
                   <el-select v-model="row.SupplierID" placeholder="供应商" clearable filterable>
                        <el-option
                            v-for="item in form.Suppliers"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地区ID" v-if="row.AreaID != 'AAAAAA'">
                    <el-cascader
                        size="large"
                        :options="form.options"
                        @change="handleChange1"
                        clearable>
                    </el-cascader>
                </el-form-item>
                <el-form-item label="坐标范围" v-else>
                    <el-button type="primary"><router-link to="/test">划定区域</router-link></el-button>
                    <el-button type="primary" @click="getAreaXY">获取数据</el-button>
                    <el-input
                        type="textarea"
                        :rows="3"
                        placeholder="请输入内容"
                        v-model="row.SmallAreaXY">
                    </el-input>
                </el-form-item>
                <el-form-item label="每超出重量增加运费金额" required>
                    <el-input v-model="row.AddSendFee"></el-input>
                </el-form-item>
                <el-form-item label="每超出多少重量" required>
                    <el-input v-model="row.AddWeight"></el-input>
                </el-form-item>
                <el-form-item label="满足金额免除多少重量运费" required>
                    <el-input v-model="row.FreeWeight"></el-input>
                </el-form-item>
                <el-form-item label="订单小于多少金额收取多少运费" required>
                    <el-input v-model="row.LessMinPriceSendFee"></el-input>
                </el-form-item>
                <el-form-item label="订单最小免运费金额" required>
                    <el-input v-model="row.OrderMinPrice"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="changeFee">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { SupplierListGetByLevel } from '@/api/goodsList';
import { SupplierSendFeeListGet,SupplierSendFeeDelete,SupplierSendFeeListAdd,SupplierSendFeeUpdate } from '@/api/SupplierList'
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
import $ from 'jquery'
import loadBMap from '@/api/LoadBMap' 
import qs from 'qs'
    export default{
        name: "ChinaArea",
        data(){
            return{
                formInline:{
                    SupplierID:'',          /* 供应商value */
                    AreaID:'',              /* 区域号 */
                    Suppliers:[]            /* 供应商候选 */
                },
                PageIndex:1,
                PageSize:10,
                tableData:[],
                editVisible:false,           /* 添加 */
                editVisible2:false,           /* 修改 */
                form:{
                    SupplierID:'',          /* 供应商号 */
                    Suppliers:[],           /* 供应商号 候选 */
                    SendFeeType:'',         /* 运费类型 */
                    AreaIDS:[],             /* 地区ID数组 */
                    SmallAreaXY:'',         /* 小圈坐标范围 */
                    AddSendFee:'',          /* 每超出重量增加运费金额 */
                    AddWeight:'',           /* 每超出多少重量 */
                    FreeWeight:"",          /* 满足金额免除多少重量运费 */
                    LessMinPriceSendFee:'',         /* 订单小于多少金额收取多少运费 */
                    OrderMinPrice:"",          /* 订单最小免运费金额 */
                    options: regionData,
                    selectedOptions: [],
                },
                row:[],                         /* 废弃时存放该条信息 */
                AreaXY:''
            }
        },
        methods:{
            getSupplier(){
                let params = {
                    Level:2,
                }
                SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.formInline.Suppliers = JSON.parse(res.data.Result)
                        this.form.Suppliers = JSON.parse(res.data.Result)
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
            getData(){
                let params = {
                    SupplierID:this.formInline.SupplierID,
                    AreaID:this.formInline.AreaID,
                    pageIndex:this.PageIndex,
                    PageSize:this.PageSize
                }
                SupplierSendFeeListGet(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.tableData = JSON.parse(res.data.Result)
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
            handleChange(val) {
                this.form.selectedOptions = []
                for(var i = 0; i < val.length; i++){
                    var end = val[i].slice(-1);
                    this.form.selectedOptions.push(end[0])
                }
                this.form.AreaIDS = JSON.stringify(this.form.selectedOptions)
            },
            handleChange1(val) {
                this.form.selectedOptions = []
                for(var k = 0; k < val.length; k++){
                    if(k = val.length - 1){
                        this.row.AreaID = val[k]
                    }
                }
            },
             open(row) {
                this.row = row
                this.$confirm('此操作不可逆, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.deleteFee()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            deleteFee(){
                let params = {
                    SupplierID:this.row.SupplierID,
                    AreaID:this.row.AreaID
                }
                SupplierSendFeeDelete(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.Success('废弃成功')                        
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
            getAreaXY(){
                this.AreaXY = sessionStorage.getItem('map')
                var str = this.AreaXY
                str=str.replace(/"lng":/g,"").replace(/"lat":/g,"").replace(/{/g,"").replace(/},/g,";").replace(/\[/g,"").replace(/\]/g,"").replace(/\}/,'')
                this.form.SmallAreaXY = str
                this.row.SmallAreaXY = str
            },
            addFee(){              
                let params = {
                    SupplierID:this.form.SupplierID,
                    SendFeeType:this.form.SendFeeType,
                    AreaIDS:this.form.AreaIDS,
                    SmallAreaXY:this.form.SmallAreaXY,
                    AddSendFee:parseFloat(this.form.AddSendFee).toFixed(2),
                    AddWeight:parseFloat(this.form.AddWeight).toFixed(2),
                    FreeWeight:parseFloat(this.form.FreeWeight).toFixed(2),
                    LessMinPriceSendFee:parseFloat(this.form.LessMinPriceSendFee).toFixed(2),
                    OrderMinPrice:parseFloat(this.form.OrderMinPrice).toFixed(2),
                }
                SupplierSendFeeListAdd(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('添加成功')
                        this.form.SupplierID = ''
                        this.form.SendFeeType = ''
                        this.form.selectedOptions = ''
                        this.form.AreaIDS = ''
                        this.form.SmallAreaXY = ''
                        this.form.AddSendFee = ''
                        this.form.AddWeight = ''
                        this.form.FreeWeight = ''
                        this.form.LessMinPriceSendFee = ''
                        this.form.OrderMinPrice = ''
                        this.editVisible = false
                        this.getData()
                    }
                    if(res.data.Success == 0){
                        this.$message(res.data.Result)
                        this.form.SupplierID = ''
                        this.form.SendFeeType = ''
                        this.form.selectedOptions = ''
                        this.form.SmallAreaXY = ''
                        this.form.AddSendFee = ''
                        this.form.AddWeight = ''
                        this.form.FreeWeight = ''
                        this.form.LessMinPriceSendFee = ''
                        this.form.OrderMinPrice = ''
                        this.form.AreaIDS = ''
                    }
                    if(res.data.Success == -998){
                        this.$message(res.data.Result)
                    }
                }).catch(function(e){
                    console.log(e)
                })
            },
            change(row){
                this.row = row
                this.editVisible2 = true
            },
            changeFee(){
                let params = {
                    SupplierID:this.row.SupplierID,
                    AreaID:this.row.AreaID,
                    SmallAreaXY:this.row.SmallAreaXY,
                    AddSendFee:parseFloat(this.row.AddSendFee).toFixed(2),
                    AddWeight:parseFloat(this.row.AddWeight).toFixed(2),
                    FreeWeight:parseFloat(this.row.FreeWeight).toFixed(2),
                    LessMinPriceSendFee:parseFloat(this.row.LessMinPriceSendFee).toFixed(2),
                    OrderMinPrice:parseFloat(this.row.OrderMinPrice).toFixed(2),
                }
                SupplierSendFeeUpdate(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('添加成功')
                        this.editVisible2 = false
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
            }
        },
        mounted(){
            this.getSupplier()
        }
    }
</script>