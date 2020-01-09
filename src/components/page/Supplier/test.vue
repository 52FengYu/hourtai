<template>
  <div id="hello">
    <div id="dbmap">1</div>
    <div id="result">
		<input type="button" value="获取绘制的覆盖物坐标" v-on:click="al"/>
		<input type="button" value="清除所有覆盖物" v-on:click="clearAll()"/>
	</div>
    <el-button type="primary" @click="back()">返回</el-button>
  </div>
</template>
 
<script>
import $ from 'jquery'
import loadBMap from '@/api/LoadBMap' 
export default {
  name: 'dbmap',
  data () {
    return {
      map: null,
      drawingManager: null,
      overlays: [],
      object : []
      }
  },
 
  mounted(){
    this.map = new BMap.Map("dbmap", {
		enableMapClick: false // 禁止底图点击事件
	});
    this.map.centerAndZoom(new BMap.Point(120.415249,36.088384), 17);
	this.map.enableScrollWheelZoom();
	this.map.enableMapClick = false;
    
    var styleOptions = {
        strokeColor:"red",    //边线颜色。
        fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3,       //边线的宽度，以像素为单位。
        strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
        fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid' //边线的样式，solid或dashed。
    }
    //实例化鼠标绘制工具
    this.drawingManager = new BMapLib.DrawingManager(this.map, {
        isOpen: false, //是否开启绘制模式
        enableDrawingTool: true, //是否显示工具栏
        drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
            offset: new BMap.Size(5, 5), //偏离值
            drawingModes : [ // 可见的操作选项
                // BMAP_DRAWING_MARKER,     /* 画点 */
                // BMAP_DRAWING_CIRCLE,     /* 画圆 */
                // BMAP_DRAWING_POLYLINE,     
                BMAP_DRAWING_POLYGON        /* 自定义区域 */
                // BMAP_DRAWING_RECTANGLE   /* 矩形 */
            ]
        },
        circleOptions: styleOptions, //圆的样式
        // polylineOptions: styleOptions, //线的样式
        polygonOptions: styleOptions, //多边形的样式
        // rectangleOptions: styleOptions //矩形的样式
	});
	//添加鼠标绘制工具监听事件，用于获取绘制结果
    this.drawingManager.addEventListener('overlaycomplete', this.overlaycomplete);  
  },
  
  methods: {
    clearAll() {
      this.object = []
      for(var i = 0; i < this.overlays.length; i++){
			this.map.removeOverlay(this.overlays[i]);
		}
          this.overlays.length = 0;   
	},
	overlaycomplete(e) {
    this.overlays = []
		this.overlays.push(e.overlay);
	},
	al() {
		if(this.overlays.length != 0){
			// console.log(this.overlays[0]);
            let obj = this.overlays[0];
            // 获取每个点的信息
			      let points = obj.Qn;
            console.log(points);
            for(var i  = 0;i<points.length; i++){
              this.object.push({lat:points[i].lat-0.006267421,lng:points[i].lng-0.0064341118})
            }
            console.log(this.object)
            sessionStorage.setItem('map',JSON.stringify(this.object))
		}
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
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#dbmap, #hello {
  width: 100%;
  height: 90%;
}
dl,dt,dd,ul,li {
  margin:0;
  padding:0;
  list-style:none;
}
p {
    font-size:12px;
}
dt {
  font-size:14px;
  font-family:"微软雅黑";
  font-weight:bold;
  border-bottom:1px dotted #000;
  padding:5px 0 5px 5px;
  margin:5px 0;
}
dd {
  padding:5px 0 0 5px;
}
li {
  line-height:28px;
}
</style>