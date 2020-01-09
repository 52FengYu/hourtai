<template>
    <div>
        <el-card>
            <el-form ref="form" :model="PayMethods" label-width="100px">
                <el-form-item label="支付方式">
                    <el-select v-model="PayMethods.PayID" clearable placeholder="请选择">
                        <el-option v-for="item in PayMethodsLIst" :key="item.ID" :label="item.PayName" :value="item.ID"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="送货方式">
                    <el-radio v-model="PayMethods.ReceiverType" label="S">自提</el-radio>
                    <el-radio v-model="PayMethods.ReceiverType" label="R">送货上门</el-radio>
                </el-form-item>
                <el-form-item label="收货详细地址" v-if="this.PayMethods.ReceiverType == 'R'">
                    <el-input v-model="PayMethods.ReceiveAddr" id="suggestId" name="address_detail" class="input_style" clearable placeholder="地址"></el-input>
                </el-form-item>
                <div id="allmap" v-show="this.PayMethods.ReceiverType == 'R'"></div>
                <el-form-item label="收货地区编号" v-if="this.PayMethods.ReceiverType == 'R'">
                    <el-input v-model="PayMethods.ReceiveAreaID" ></el-input>
                </el-form-item>
                <el-form-item label="收货人">
                    <el-input v-model="PayMethods.ReceiveMan"></el-input>
                </el-form-item>
                <el-form-item label="运费">
                    <el-input v-model="PayMethods.SendFee"></el-input>
                </el-form-item>
                <el-form-item label="收货人手机号">
                    <el-input v-model="PayMethods.ReceiveMobile"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="back">返回</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import { BasePayAllList,orderDetail,changePayMethod } from "@/api/orderList"
import $ from 'jquery'
import loadBMap from '@/api/LoadBMap'
import qs from 'qs'
export default{
    name:'changeOrder',
    data(){
        return{
            PayMethods:{},
            PayMethodsLIst:[],
            address_detail: null, //详细地址
            userlocation: {lng: "", lat: ""},
            editVisible:false
        }
    },
    methods:{
        getPayMethods(){
            let params = {}
            BasePayAllList(qs.stringify(params)).then((res)=>{
                if(res.data.Success == 1){
                    this.PayMethodsLIst = JSON.parse(res.data.Result)
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
                    ID:decodeURI(location.href).split('?')[1].split('=')[1].split('&')[0],
                }
                orderDetail(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.PayMethods = JSON.parse(res.data.Result)
                        this.PayMethods.ReceiverType = decodeURI(location.href).split('&')[1].split('=')[1]
                        console.log(this.PayMethods.ReceiverType)
                    }
                }).catch(function(e){
                    console.log(e)
                })
            },
        onSubmit(){
            let params = {
                ID:decodeURI(location.href).split('?')[1].split('=')[1].split('&')[0],
                PayID:this.PayMethods.PayID,
                ReceiveAreaID:this.PayMethods.ReceiveAreaID,
                ReceiveAddr:this.PayMethods.ReceiveAddr,
                ReceiveMan:this.PayMethods.ReceiveMan,
                SendFee:this.PayMethods.SendFee,
                Moblie:this.PayMethods.ReceiveMobile,
                ReceiverType:this.PayMethods.ReceiverType,
            }
            changePayMethod(qs.stringify(params)).then((res)=>{
                if(res.data.Success == 1){
                    this.PayMethodsLIst = JSON.parse(res.data.Result)
                    this.$message.success('修改成功')
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
                path:'/orderDetail',
                query:{
                    ID:decodeURI(location.href).split('?')[1].split('=')[1].split('&')[0],
                }
            })
        }
    },
    created(){
        this.getData()
        this.getPayMethods()
    },
    mounted(){
        this.$nextTick(function (){
            loadBMap('DD279b2a90afdf0ae7a3796787a0742e')
                .then(() => {
                    var th = this
                    // 创建Map实例
                    var map = new BMap.Map("allmap");
                    // 初始化地图,设置中心点坐标，
                    var point = new BMap.Point(120.432611,36.173487); // 创建点坐标，汉得公司的经纬度坐标
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
                            console.log(th)
                            $.ajax({
                                url:'http://api.map.baidu.com/geocoder/v2/?ak=nlUNnZNlnwH3NMxfOSFGQ6hpKVZw66EU&location=' + th.userlocation.lat + ',' + th.userlocation.lng + '&output=json&pois=1',
                                dataType: 'jsonp',
                                    callback: 'BMap._rd._cbk43398',
                                    success: function(res) {
                                    console.log(res);
                                    th.PayMethods.ReceiveAreaID = res.result.addressComponent.adcode
                                    var result = res.result,
                                    addressComponent = result.addressComponent,
                                    adcode = addressComponent.adcode
                                    console.log(adcode)
                                    th.PayMethods.ReceiveAreaID = adcode
                                }
                            });
                        })
                    }
                })
            .catch(err => {
                console.log('地图加载失败')
            })
        })
    }
}
</script>  
<style lang="scss" scoped>
    #allmap{
        width: 400px;
        height: 400px;
        font-family: "微软雅黑";
        border:1px solid green;
        margin-left: 10vw
    }
</style>