<template>
    <div>
        <el-card>
            <el-form ref="form" :model="addItem" label-width="180px" >
                <el-form-item label="供应商地址">
                    <el-input v-model="addItem.SupplierAddr" clearable  type="text" id="suggestId" name="address_detail" placeholder="地址" class="input_style"></el-input>
                </el-form-item>
                <el-form-item>
                    <div id="allmap"></div>
                </el-form-item>
                <el-form-item label="经度">
                    <el-input v-model="addItem.AddrX" clearable></el-input>
                </el-form-item>
                <el-form-item label="纬度">
                    <el-input v-model="addItem.AddrY" clearable></el-input>
                </el-form-item>
                <el-form-item label="地区编号">
                    <el-input v-model="addItem.AddrAreaID" clearable></el-input>
                </el-form-item>
                <el-form-item label="供应商显示名称">
                    <el-input v-model="addItem.SupplierDisplayName" clearable></el-input>
                </el-form-item>
                <el-form-item label="供应商名称">
                    <el-input v-model="addItem.SupplierName" clearable></el-input>
                </el-form-item>
                <el-form-item label="供应商描述">
                    <el-input v-model="addItem.SupplierNote" clearable></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input v-model="addItem.LinkMan" clearable></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="addItem.LinkTel" clearable></el-input>
                </el-form-item>
                <el-form-item label="主供应商号">
                     <el-select v-model="addItem.MainSupplierID" placeholder="主供应商" clearable filterable >
                        <el-option
                        v-for="item in addItem.option1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="营业开始时间">
                    <el-date-picker
                        v-model="addItem.OpenTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择营业开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="营业结束时间">
                     <el-date-picker
                        v-model="addItem.EndTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择营业开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="addItem.Remark" clearable></el-input>
                </el-form-item>
                <el-form-item label="利群内部门店编码">
                    <el-input v-model="addItem.SupplierCode" clearable></el-input>
                </el-form-item>
                <el-form-item label="配送信息">
                    <el-input v-model="addItem.DeliveryInfo" clearable></el-input>
                </el-form-item>
                <el-form-item label="供应商等级">
                    <el-select v-model="addItem.Level" placeholder="供应商等级" clearable>
                        <el-option label="一级" value="1"></el-option>
                        <el-option label="二级" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="供应商类型">
                    <el-select v-model="addItem.SupplierType" placeholder="供应商类型" clearable>
                        <el-option label="内部门店" value="N"></el-option>
                        <el-option label="外部供应商" value="W"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="配送类型">
                    <el-select v-model="addItem.StoreType" placeholder="配送类型" clearable>
                        <el-option label="纯门店自送" value="Z"></el-option>
                        <el-option label="统配" value="S"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否全球购订单">
                    <el-radio v-model="addItem.IsImport" label="Y">是</el-radio>
                    <el-radio v-model="addItem.IsImport" label="N">否</el-radio>
                </el-form-item>
                <el-form-item label="是否在门店列表显示">
                    <el-radio v-model="addItem.IsDisplay" label="Y">是</el-radio>
                    <el-radio v-model="addItem.IsDisplay" label="N">否</el-radio>
                </el-form-item>
                <el-form-item label="是否必须在线支付">
                    <el-radio v-model="addItem.IsNeedLinkPay" label="Y">是</el-radio>
                    <el-radio v-model="addItem.IsNeedLinkPay" label="N">否</el-radio>
                </el-form-item>
                <el-form-item label="是否支持自提">
                    <el-radio v-model="addItem.IsSupportPickUp" label="Y">是</el-radio>
                    <el-radio v-model="addItem.IsSupportPickUp" label="N">否</el-radio>
                </el-form-item>
                <el-form-item label="售后信息">
                    <el-input v-model="addItem.AfterSaleInfo" clearable></el-input>
                </el-form-item>
                <el-form-item label="指定送货时间最小小时数">
                    <el-input v-model="addItem.DeliveryBeginHours" clearable></el-input>
                </el-form-item>
                <el-form-item label="指定送货时间最大小时数">
                    <el-input v-model="addItem.DeliveryEndHours" clearable></el-input>
                </el-form-item>
                <el-form-item label="供应商图片">
                    <el-upload
                            class="avatar-uploader"
                            action="/adminwebapi/api/Image/UploadImage"
                            :show-file-list="false"
                            :headers="TokenID"
                            :on-success="handleAvatarSuccess"
                            :data="upLoadData">
                        <img v-if="this.addItem.SupplierImageURL" :src="this.addItem.SupplierImageURL" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-button type="primary" @click="back">取消</el-button>
                <el-button type="primary" @click="onSubmit">确定</el-button>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import { SupplierListGetByLevel } from "@/api/goodsList"
import { SupplierAdd } from '@/api/SupplierList'
import $ from 'jquery'
// import loadBMap from '@/api/LoadBMap' 
import qs from 'qs'
    export default{
        data(){
            return{
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
                address_detail: null, //详细地址
                userlocation: {lng: "", lat: ""},
                upLoadData:{
                    ImageUseType:'Page'           /*  Page，ProductContent，ProductHead */
                },
                TokenID:{
                    TokenID:sessionStorage.getItem('TokenID'),
                },
            }
        },
        methods:{
            getMainSupplier(){
                let params = {
                    Level:1
                }
                SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
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
            handleAvatarSuccess(res,file){
                this.addItem.SupplierImageURL =  'http://images.liqunshop.com/' + JSON.parse(res.Result)[0]                   /* 启明星原地址 */
            },
            onSubmit(){
                let params = {
                    AddrAreaID: this.addItem.AddrAreaID,
                     SupplierAddr: this.addItem.SupplierAddr,
                    SupplierDisplayName: this.addItem.SupplierDisplayName,
                    SupplierName: this.addItem.SupplierName,
                    SupplierImageURL: this.addItem.SupplierImageURL,
                    SupplierNote: this.addItem.SupplierNote,
                    AddrX: this.addItem.AddrX,
                    AddrY: this.addItem.AddrY,
                    LinkMan: this.addItem.LinkMan,
                    LinkTel: this.addItem.LinkTel,
                    MainSupplierID: this.addItem.MainSupplierID,
                    OpenTime: this.addItem.OpenTime,
                    EndTime: this.addItem.EndTime,
                    Remark: this.addItem.Remark,
                    Level: this.addItem.Level,
                    SupplierType: this.addItem.SupplierType,
                    StoreType: this.addItem.StoreType,
                    SupplierCode: this.addItem.SupplierCode,
                    IsImport: this.addItem.IsImport,
                    IsDisplay: this.addItem.IsDisplay,
                    IsNeedLinkPay: this.addItem.IsNeedLinkPay,
                    IsSupportPickUp: this.addItem.IsSupportPickUp,
                    DeliveryInfo: this.addItem.DeliveryInfo,
                    AfterSaleInfo: this.addItem.AfterSaleInfo,
                    DeliveryBeginHours: this.addItem.DeliveryBeginHours,
                    DeliveryEndHours: this.addItem.DeliveryEndHours
                }
                SupplierAdd(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('提交成功')
                        this.addItem = {}
                        this.back()
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
            back(){
                this.$router.push({
                    path:'/Supplier'
                })
            }
        },
        created(){
            this.getMainSupplier()
        },
        mounted(){
            this.$nextTick(function () {
                loadBMap('DD279b2a90afdf0ae7a3796787a0742e')
                    .then(() => {
                        var th = this
                        // 创建Map实例
                        var map = new BMap.Map("allmap");
                        // 初始化地图,设置中心点坐标，
                        var point = new BMap.Point(121.160724,31.173277); // 创建点坐标，汉得公司的经纬度坐标
                        map.centerAndZoom(point, 15);
                        map.enableScrollWheelZoom();
                        var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
                                {
                                    "input": "suggestId",
                                    "location": map
                                })
                        var myValue
                        ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
                            var _value = e.item.value;
                            myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
                            this.address_detail = myValue
                            setPlace();
                        });
                        function setPlace() {
                            map.clearOverlays();    //清除地图上所有覆盖物
                            function myFun() {
                                th.userlocation = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                                map.centerAndZoom(th.userlocation, 18);
                                map.addOverlay(new BMap.Marker(th.userlocation));    //添加标注
                            }

                            var local = new BMap.LocalSearch(map, { //智能搜索
                                onSearchComplete: myFun
                            });
                            local.search(myValue);

                            //测试输出坐标（指的是输入框最后确定地点的经纬度）
                            map.addEventListener("click",function(e){
                                    //经度
                                    th.addItem.AddrX = th.userlocation.lng-0.0064341118       /* 0.0064341118‬ */   /* 0.008774687519 */            /* 百度的定位经纬度 - 偏移量 = 腾讯定位经纬度 */
                                    th.addItem.AddrY = th.userlocation.lat-0.006267421         /* 0.006267421‬ */       /* 0.00374531687912 */
                                    console.log(th.addItem.AddrX)
                                    console.log(th.addItem.AddrY)
                                    console.log(th)
                                    $.ajax({
                                        url:'http://api.map.baidu.com/geocoder/v2/?ak=nlUNnZNlnwH3NMxfOSFGQ6hpKVZw66EU&location=' + th.addItem.AddrY + ',' + th.addItem.AddrX + '&output=json&pois=1',
                                        dataType: 'jsonp',
                                            callback: 'BMap._rd._cbk43398',
                                            success: function(res) {
                                            console.log(res);
                                            var result = res.result,
                                            addressComponent = result.addressComponent,
                                            adcode = addressComponent.adcode
                                            console.log(adcode)
                                            th.addItem.AddrAreaID = adcode
                                        }
                                    });
                                    
                            })
                        }
                })
            })
            .catch(err => {
                console.log('地图加载失败')
            })
       }
    }
</script>  
<style lang="scss" scoped>
    .el-input{
        width: 20vw;
    }
    #allmap{
        width: 400px;
        height: 400px;
        font-family: "微软雅黑";
        border:1px solid green;
    }
</style>
