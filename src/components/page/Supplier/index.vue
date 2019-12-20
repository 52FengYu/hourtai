<template>
    <div>
        <el-card>
            <el-form :inline="true" :model="form" class="demo-form-inline" label-width="140px">
                <el-form-item label="主供应商">
                    <el-select v-model="form.MainSupplierID" placeholder="主供应商" clearable filterable @change="getSupplier">
                        <el-option
                        v-for="item in form.option1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="供应商">
                    <el-select v-model="form.ID" placeholder="供应商" clearable filterable @change="reset">
                        <el-option
                        v-for="item in form.option2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="供应商状态">
                    <el-select v-model="form.State" placeholder="供应商状态" clearable @change="reset">
                        <el-option label="新建" value="N"></el-option>
                        <el-option label="审核通过" value="O"></el-option>
                        <el-option label="审核驳回" value="B"></el-option>
                        <el-option label="停用" value="S"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="供应商等级">
                    <el-select v-model="form.Level" placeholder="供应商等级" clearable @change="reset">
                        <el-option label="一级" value="1"></el-option>
                        <el-option label="二级" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="供应商类型">
                    <el-select v-model="form.SupplierType" placeholder="供应商类型" clearable @change="reset">
                        <el-option label="内部门店" value="N"></el-option>
                        <el-option label="外部供应商" value="W"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="配送类型">
                    <el-select v-model="form.StoreType" placeholder="配送类型" clearable @change="reset">
                        <el-option label="纯门店自送" value="Z"></el-option>
                        <el-option label="统配" value="S"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="利群内部门店码">  
                    <el-input v-model="form.SupplierCode" placeholder="利群内部门店码" @change="reset"></el-input>
                </el-form-item>
                <el-form-item label="是否跨境供应商">
                    <el-select v-model="form.IsImport" placeholder="是否跨境供应商" clearable @change="reset">
                        <el-option label="是" value="Y"></el-option>
                        <el-option label="否" value="N"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否在门店列表显示">
                    <el-select v-model="form.IsDisplay" placeholder="是否在门店列表显示" clearable @change="reset">
                        <el-option label="是" value="Y"></el-option>
                        <el-option label="否" value="N"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否必须在线支付">
                    <el-select v-model="form.IsNeedLinkPay" placeholder="是否必须在线支付" clearable @change="reset">
                        <el-option label="是" value="Y"></el-option>
                        <el-option label="否" value="N"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否支持自提">
                    <el-select v-model="form.IsSupportPickUp" placeholder="是否支持自提" clearable @change="reset">
                        <el-option label="是" value="Y"></el-option>
                        <el-option label="否" value="N"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否废弃">
                    <el-select v-model="form.DelFlag" placeholder="是否废弃" clearable @change="reset">
                        <el-option label="是" value="Y"></el-option>
                        <el-option label="否" value="N"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getData">搜索</el-button>
                    <el-button type="primary" @click="addSupplier">添加</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData.SupplierList" border style="width: 100%">
                <el-table-column prop="MainSupplierID" label="主供应商号" align="center"></el-table-column>
                <el-table-column prop="ID" label="供应商ID" align="center"></el-table-column>
                <el-table-column prop="SupplierName" label="供应商名称" align="center"></el-table-column>
                <el-table-column prop="SupplierDisplayName" label="供应商显示名称" align="center"></el-table-column>
                <el-table-column prop="LinkMan" label="联系人" align="center"></el-table-column>
                <el-table-column prop="LinkTel" label="联系方式" align="center"></el-table-column>
                <el-table-column prop="SupplierAddr" label="供应商地址" align="center"></el-table-column>
                <el-table-column prop="AreaName" label="地区名称" align="center"></el-table-column>
                <el-table-column prop="IsDisplay" label="是否在门店列表显示" align="center">
                    <template slot-scope="scope">
                        {{scope.row.IsDisplay === 'Y'? '是': '否'}}
                    </template>
                </el-table-column>
                <el-table-column prop="IsImport" label="是否跨境供应商" align="center">
                    <template slot-scope="scope">
                        {{scope.row.IsImport === 'Y'? '是': '否'}}
                    </template>
                </el-table-column>
                <el-table-column prop="IsMasterLinkPay" label="是否必须在线支付" align="center">
                    <template slot-scope="scope">
                        {{scope.row.IsMasterLinkPay === 'Y'? '是': '否'}}
                    </template>
                </el-table-column>
                <el-table-column prop="IsSupportPickedUp" label="是否支持退款" align="center"></el-table-column>
                <el-table-column prop="SupplierCode" label="利群内部门店号" align="center"></el-table-column>
                <el-table-column prop="SupplierLevel" label="供应商等级" align="center"></el-table-column>
                <el-table-column prop="SupplierState" label="供应商审核状态" align="center">
                    <template slot-scope="scope">
                        {{scope.row.SupplierState === 'N'?'新建':(scope.row.SupplierState === 'O'?'审核通过':(scope.row.SupplierState === 'B'?'驳回':'停用'))}}
                    </template>
                </el-table-column>
                <el-table-column prop="SupplierType" label="供应商类型" align="center">
                    <template slot-scope="scope">
                        {{scope.row.SupplierType === 'N'? '内部门店': '外部供应商'}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-edit" @click="detail(scope.row)">详情</el-button>
                            <el-button type="text" icon="el-icon-edit" @click="Audit(scope.row)" v-if="scope.row.SupplierState != 'O'">审核</el-button>
                        </template>
                    </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="PageIndex"
                :page-size= this.PageSize
                layout="total, sizes, prev, pager, next, jumper"
                align="right"
                :total= tableData.Totalcount>
            </el-pagination>
        </el-card>
        
        <!-- 审核供应商 -->
        <el-dialog title="审核供应商" :visible.sync="editVisible2" width="30%" :close-on-click-modal="false">
            <el-form ref="form" :model="formItem" label-width="80px">
                <el-form-item>
                    <el-radio v-model="formItem.Audit" label="O">通过</el-radio>
                    <el-radio v-model="formItem.Audit" label="B">驳回</el-radio>
                    <el-radio v-model="formItem.Audit" label="S">暂停营业</el-radio>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="AuditChecked">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { SupplierListGet,SupplierAdd,SupplierAudit } from "@/api/SupplierList"
import { SupplierListGetByLevel } from "@/api/goodsList"
import qs from 'qs';
export default{
    data(){
        return{
            form:{
                MainSupplierID:'',          /* 主供应商value */
                option1:[],                 /* 主供应商的option */
                ID:'',                      /* 供应商value */
                option2:[],                 /* 供应商的option */
                State:'',                   /* 供应商状态 */
                Level:'',                   /* 供应商等级 */
                SupplierType:'',            /* 供应商类型 */
                StoreType:'',               /* 配送类型 */
                SupplierCode:'',            /* 利群内部门店码 */
                IsImport:'',                /* 是否跨境供应商 */
                IsDisplay:'',               /* 是否在门店列表显示 */
                IsNeedLinkPay:'',           /* 是否必须在线支付 */
                IsSupportPickUp:'',         /* 是否支持自提 */
                DelFlag:''                  /* 是否废弃 */
            },
            PageIndex:1,
            PageSize:10,
            tableData:[],
            row:[],
            editVisible:false,
            editVisible2:false,
            TokenID:{
                TokenID:sessionStorage.getItem('TokenID'),
            },
            upLoadData:{
                ImageUseType:'Page'           /*  Page，ProductContent，ProductHead */
            },
            addItem:{
                AddrAreaID:'',
                SupplierAddr:'',
                SupplierDisplayName:'',
                SupplierName:'',
                SupplierImageURL:'',
                SupplierNote:'',
                AddrX:'',
                AddrY:'',
                LinkMan:'',
                LinkTel:'',
                MainSupplierID:'',
                option1:[],
                OpenTime:'',
                EndTime:'',
                Remark:'',
                Level:'',
                SupplierType:"",
                StoreType:'',
                SupplierCode:'',
                IsImport:'',
                IsDisplay:'',
                IsNeedLinkPay:'',
                IsSupportPickUp:'',
                DeliveryInfo:'',
                AfterSaleInfo:'',
                DeliveryBeginHours:'',
                DeliveryEndHours:''
            },
            formItem:{
                Audit:''
            }
        }
    },
    methods:{
        reset(){
            this.PageSize = 10,
            this.PageIndex = 1
        },
        getData(){
            let params = {
                ID:this.form.ID,
                MainSupplierID:this.form.MainSupplierID,
                State:this.form.State,
                Level:this.form.Level,
                SupplierType:this.form.SupplierType,
                StoreType:this.form.StoreType,
                SupplierCode:this.form.StoreType,
                IsImport:this.form.StoreType,
                IsDisplay:this.form.StoreType,
                IsNeedLinkPay:this.form.StoreType,
                IsSupportPickUp:this.form.StoreType,
                DelFlag:this.form.StoreType,
                PageIndex:this.PageIndex,
                PageSize:this.PageSize
            }
            SupplierListGet(qs.stringify(params)).then((res)=>{
                if(res.data.Success == 1){
                    console.log("数据请求成功")
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
                    console.log("数据请求成功")
                    this.form.option1 = JSON.parse(res.data.Result)
                    this.addItem.option1 = JSON.parse(res.data.Result)
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
            this.form.ID = ''
            this.form.option2 = ''
            let params = {
                Level:2,
                MainSupplierID:this.form.MainSupplierID
            }
            SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                if(res.data.Success == 1){
                    this.form.option2 = JSON.parse(res.data.Result)
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
        handleAvatarSuccess(res,file){
            this.row.SupplierImageURL = JSON.parse(res.Result)[0]                   /* 启明星原地址 */
        },
        handleSizeChange(val) {
            this.PageSize = val;
            console.log(`每页 ${val} 条`);
            this.getData()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.PageIndex = val;
            this.getData()
        },
        detail(row){
            this.$router.push({
                path:'/supplierDetail',
                query:{
                    ID: row.ID,
                }
            })
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        addSupplier(){
            this.$router.push({path:'/addSupplier'})
        },
        Audit(row){
            this.formItem.Audit = ''
            this.ID = row.ID
            this.editVisible2 = true
        },
        AuditChecked(){
            let params = {
                ID:this.ID,
                Audit:this.formItem.Audit
            }
            SupplierAudit(qs.stringify(params)).then((res)=>{
                if(res.data.Success == 1){
                    this.$message.success('审核成功')
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
    created(){
        this.getMainSupplier()
        this.getData()
    }
}
</script>
<style lang="scss" scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .el-upload--text{
        width:0!important;
        height:0!important
    }
</style>