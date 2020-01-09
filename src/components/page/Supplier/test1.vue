<template>
    <div>
        <div id="container"></div>
        <div class="button">
            <button @click="back" style="width:100px;height:50px;background:lightblue;color:white;border:0;border-radius:10%;margin-right:10vw">返回</button>
            <button @click="reinit" style="width:100px;height:50px;background:lightpink;color:white;border:0;border-radius:10%;margin-right:10vw">重置</button>
            <button @click="confirm" style="width:100px;height:50px;background:green;color:white;border:0;border-radius:10%">确定</button>
        </div>
        <div id="result">{{this.result}}</div>
    </div>
</template>     
<script>
    import $ from 'jquery'
    export default{
        data(){
            return{
                center:'',
                listener:[],
                polygonList:{},
                counts:0,
                number:1,
                points:[],
                poiList:{},
                result:''
            }
        },
        mounted(){
            this.center = new qq.maps.LatLng('36.10986570062118','120.39779663085938');
            var map = new qq.maps.Map("container",{
              center: this.center,
              zoom : 13,
              draggableCursor: "crosshair", //地图的默认鼠标指针样式
              draggingCursor: "pointer" //拖动地图时的鼠标指针样式
            });
            var point = []
            var count = 0
            var number = 1
            var polygonList = {}
            var th = this
            this.listener = qq.maps.event.addListener(
                map,
              'click',
              function(event) {
                count ++;
                point.push(new qq.maps.LatLng(event.latLng.getLat(), event.latLng.getLng()));
                th.points = point
                var polygonKey = 'polygon' + number;
                th.counts = count
                th.number = number
                if (count >=3) {
                    if(count>3){
                        polygonList[polygonKey].setMap(null);
                    }
                    polygonList[polygonKey] = new qq.maps.Polygon({
                        map:map,
                        path:point,
                        strokeColor: '#000000',
                        strokeWeight: 2,
                        fillColor: qq.maps.Color.fromHex("#FF0000", 0.3),
                        editable: true
                    });
                    th.polygonList = polygonList
                }
          
              }
            );
        },
        methods:{
            reinit(){
                for (var p of Object.keys(this.polygonList)){
                    this.polygonList[p].setMap(null);
                }
                this.counts = 0;
                this.points.length = 0;
            },
            confirm(num,polygon) {
              if(this.counts === 0){
                alert('请点击地图，画出区域');
                return
              }
              num = num ? num : number;
              polygon = polygon ? polygon : this.polygonList['polygon' + this.number];
              var poiKey = 'poi' + num;
              var poi = [];
              for (var p of polygon.getPath().elems){
                poi.push(p.lat + ',' + p.lng);
              }
              this.poiList[poiKey] = poi;
              //console.log('画出区域的坐标数组 ==',JSON.stringify(this.poiList)); //此poi数组为画出区域的坐标数组，与网商微端所需数据格式一致
              sessionStorage.setItem('map',JSON.stringify(poi))
              this.result = poi
            },
            back(){
                //this.$router.go(-1);//返回上一页
                this.$router.push({
                path:'/SupplierFeeList',
                query:{
                    Flag:true
                    }
                })
            },
        },
    }
</script>
<style lang="scss" scoped>
     #container{
            width:90vw;
            height:75vh;
            margin: 0 auto;
        }
        .button{
            text-align: center;
        }
        #reinit,#confirm,#addPolygon{
            display: inline-block;
            margin: 30px 10px;
            padding: 10px 20px;
            font-size: 20px;
            letter-spacing: 3px;
            text-align: center;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            cursor: pointer;
        }
        #reinit{
            background: #f56c6c;
        }
        #confirm{
            background: #67c23a;
        }
        #addPolygon{
            background: #e6a23c;
        }
</style>
