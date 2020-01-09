<template>
    <div>
        <el-card>
            <template v-if="this.flag === false">
                <el-button type="primary" @click="flag = true">修改</el-button>
                <el-form ref="form" :model="tableData" label-width="200px">
                    <el-form-item label="供应商地区编号">
                        <span>{{tableData.AddrAreaID}}</span>
                    </el-form-item>
                    <el-form-item label="供应商经度">
                        {{tableData.AddrX}}
                    </el-form-item>
                    <el-form-item label="供应纬度">
                        <span>{{tableData.AddrY}}</span>
                    </el-form-item>
                    <el-form-item label="电子发票参数">
                        {{tableData.EInvoiceParam}}
                    </el-form-item>
                    <el-form-item label="营业开始时间">
                        {{tableData.OpenTime}}
                    </el-form-item>
                    <el-form-item label="结束营业时间">
                        <span>{{tableData.EndTime}}</span>
                    </el-form-item>
                    <el-form-item label="供应商编号">
                        {{tableData.ID}}
                    </el-form-item>
                    <el-form-item label="是否在门店列表显示">
                        <span>{{tableData.IsDisplay}}</span>
                    </el-form-item>
                    <el-form-item label="是否跨境供应商">
                        {{tableData.IsImport}}
                    </el-form-item>
                    <el-form-item label="是否必选在线支付">
                        <span>{{tableData.IsMasterLinkPay}}</span>
                    </el-form-item>
                    <el-form-item label="是否支持自提">
                        {{tableData.IsSupportPickedUp}}
                    </el-form-item>
                    <el-form-item label="联系人">
                        <span>{{tableData.LinkMan}}</span>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        {{tableData.LinkTel}}
                    </el-form-item>
                    <el-form-item label="主供应商号">
                        <span>{{tableData.MainSupplierID}}</span>
                    </el-form-item>
                    <el-form-item label="备注">
                        <span>{{tableData.Remark}}</span>
                    </el-form-item>
                    <el-form-item label="配送类别">
                        {{tableData.StoreType === 'Z'?'纯自送':'仓库统配'}}
                    </el-form-item>
                    <el-form-item label="供应商地址">
                        <span>{{tableData.SupplierAddr}}</span>
                    </el-form-item>
                    <el-form-item label="利群内部门店号">
                        {{tableData.SupplierCode}}
                    </el-form-item>
                    <el-form-item label="显示名称">
                        <span>{{tableData.SupplierDisplayName}}</span>
                    </el-form-item>
                    <el-form-item label="供应商图片">
                        <img :src="tableData.SupplierImageURL" alt="图片暂时无法显示" v-if="tableData.SupplierImageURL.substr(0,4) == 'http'">
                        <img :src="'http://images.liqunshop.com/' + tableData.SupplierImageURL" alt="图片暂时无法显示" v-if="tableData.SupplierImageURL.substr(0,4) != 'http' && tableData.SupplierImageURL != ''">
                        <span v-if="tableData.SupplierImageURL == ''"></span>
                    </el-form-item>
                    <el-form-item label="供应商等级">
                        <span>{{tableData.SupplierLevel}}</span>
                    </el-form-item>
                    <el-form-item label="供应商名称">
                        {{tableData.SupplierName}}
                    </el-form-item>
                    <el-form-item label="供应商描述">
                        <span>{{tableData.SupplierNote}}</span>
                    </el-form-item>
                    <el-form-item label="供应商审核状态">
                        {{tableData.SupplierState}}
                    </el-form-item>
                    <el-form-item label="供应商类别">
                        <span>{{tableData.SupplierType === 'N'? '利群内部门店':'外部供应商'}}</span>
                    </el-form-item>
                    <el-form-item label="配送描述">
                        {{tableData.DeliveryInfo}}
                    </el-form-item>
                    <el-form-item label="售后描述">
                        {{tableData.AfterSaleInfo}}
                    </el-form-item>
                    <el-form-item label="指定送货时间最短小时数">
                        {{tableData.DeliveryBeginHours}}
                    </el-form-item>
                    <el-form-item label="指定送货时间最长小时数">
                        {{tableData.DeliveryEndHours}}
                    </el-form-item>
                </el-form>
            </template>
            <template v-if="this.flag === true">
                <el-form ref="form" :model="row" label-width="100px"  :inline="true">
                    <el-form-item label="地区编号">
                        <el-input v-model="row.AddrAreaID" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="供应商地址">
                        <el-input v-model="row.SupplierAddr" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="供应商显示名称">
                        <el-input v-model="row.SupplierDisplayName" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="供应商名称">
                        <el-input v-model="row.SupplierName" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="供应商描述">
                        <el-input v-model="row.SupplierNote" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="经度">
                        <el-input v-model="row.AddrX" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="纬度">
                        <el-input v-model="row.AddrY" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="联系人">
                        <el-input v-model="row.LinkMan" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input v-model="row.LinkTel" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="营业开始时间">
                        <el-time-picker
                            v-model="row.OpenTime"
                            :picker-options="{
                                selectableRange: '00:30:00 - 23:30:00'
                            }"
                            value-format="HH:mm:ss"
                            placeholder="任意时间点">
                        </el-time-picker>
                    </el-form-item>
                    <el-form-item label="营业结束时间">
                        <el-time-picker
                            v-model="row.EndTime"
                            :picker-options="{
                                selectableRange: '00:30:00 - 23:30:00'
                            }"
                            value-format="HH:mm:ss"
                            placeholder="任意时间点">
                        </el-time-picker>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="row.Remark" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="供应商类型">
                        <el-input v-model="row.SupplierType" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="配送类型">
                        <el-input v-model="row.StoreType" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="利群内部门店编码">
                        <el-input v-model="row.SupplierCode" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="是否全球购订单">
                        <el-input v-model="row.IsImport" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="是否在门店列表显示">
                        <el-input v-model="row.IsDisplay" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="是否必须在线支付">
                        <el-input v-model="row.IsNeedLinkPay" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="是否支持自提">
                        <el-input v-model="row.IsSupportPickUp" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="配送信息">
                        <el-input v-model="row.DeliveryInfo" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="售后信息">
                        <el-input v-model="row.AfterSaleInfo" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="指定送货时间最小小时数">
                        <el-input v-model="row.DeliveryBeginHours" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="指定送货时间最大小时数">
                        <el-input v-model="row.DeliveryEndHours" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="供应商图片"><!--  -->
                        <el-upload
                            class="avatar-uploader"
                            action="/adminwebapi/api/Image/UploadImage"
                            :show-file-list="false"
                            :headers="TokenID"
                            accept="image/png, image/jpeg, image/gif, image/jpg, image/bmp"
                            :on-success="handleAvatarSuccess"
                            :data="upLoadData">
                        <img v-if="this.row.SupplierImageURL" :src="this.row.SupplierImageURL" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="flag = false">返回</el-button>
            </template>
        </el-card>
    </div>
</template>
<script>
import { SupplierGetFromID,SupplierUpdate } from '@/api/SupplierList'
import qs from 'qs'
    export default{
        name:'SupplierDetail',
        data(){
            return{
                tableData:[],
                editVisible:false,
                flag:false,
                TokenID:{
                    TokenID:sessionStorage.getItem('TokenID'),
                },
                upLoadData:{
                    ImageUseType:'Page'           /*  Page，ProductContent，ProductHead */
                },
                row:[],                 /* 修改 */
                URLHead:'',             /* 修改供应商时，图片存放在这 */
            }
        },
        methods:{
            getData(){
                let params = {
                    ID:decodeURI(location.href).split('?')[1].split('=')[1]
                }
                SupplierGetFromID(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.tableData = JSON.parse(res.data.Result)
                        this.row = JSON.parse(res.data.Result)
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
                let URLHead = JSON.parse(res.Result)[0]    
                this.URLHead = JSON.parse(res.Result)[0]    
                console.log(JSON.parse(res.Result)[0])
                if(URLHead.substr(0,4) == "http"){
                    this.row.SupplierImageURL =  JSON.parse(res.Result)[0]                   /* 启明星原地址 */
                }else{
                    this.row.SupplierImageURL = 'http://images.liqunshop.com/' + JSON.parse(res.Result)[0]
                }
            },/*  */
            onSubmit(){
                    console.log(this.row.OpenTime)
                    console.log(this.row.EndTime)
                let params = {
                    ID:decodeURI(location.href).split('?')[1].split('=')[1],
                    AddrAreaID:this.row.AddrAreaID,
                    SupplierAddr:this.row.SupplierAddr,
                    SupplierDisplayName:this.row.SupplierDisplayName,
                    SupplierName:this.row.SupplierName,
                    SupplierImageURL:this.URLHead,
                    SupplierNote:this.row.SupplierNote,
                    AddrX:this.row.AddrX,
                    AddrY:this.row.AddrY,
                    LinkMan:this.row.LinkMan,
                    LinkTel:this.row.LinkTel,
                    OpenTime:this.row.OpenTime,
                    EndTime:this.row.EndTime,
                    Remark:this.row.Remark,
                    SupplierType:this.row.SupplierType,
                    StoreType:this.row.StoreType,
                    SupplierCode:this.row.SupplierCode,
                    IsImport:this.row.IsImport,
                    IsDisplay:this.row.IsDisplay,
                    IsNeedLinkPay:this.row.IsNeedLinkPay,
                    IsSupportPickUp:this.row.IsSupportPickUp,
                    DeliveryInfo:this.row.DeliveryInfo,
                    AfterSaleInfo:this.row.AfterSaleInfo,
                    DeliveryBeginHours:this.row.DeliveryBeginHours,
                    DeliveryEndHours:this.row.DeliveryEndHours,
                }
                SupplierUpdate(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('修改成功')
                        this.getData()
                        this.flag = false
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
            this.getData()
        }
    }
</script>  