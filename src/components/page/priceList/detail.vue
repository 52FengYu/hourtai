<template>
    <div class="app-container">
        <el-card class="app-card">
            <p class="title">价格变更记录详情</p>
            <div class="mytable">
            <ul class="mytable-body">
                <li class="mytable__row mytable__row2" v-for="(detail, index) in itemArr" :key="index">
                <div class="mytable__label cell">{{detail.label}}</div>
                <div class="mytable__value cell" v-if="detail.value">
                    {{detail.value}}
                    <span v-if="detail.label === '税率'">%</span>
                </div>
                <div class="mytable__value cell" v-if="detail.image">
                    <img :src="detail.image" alt="" class="img">
                </div>
                </li>
            </ul>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
  name: 'detail',
  data() {
    return {
      loading:true,//加载状态
      item:{},
      itemcode: '',
    }
  },
  computed: {
    itemArr() {
      return [
        {label: '商品编码', value: this.item.itemCode},
        {label: '商品集团统一编码', value: this.item.unicode},
        {label: '计量单位', value: this.item.unitName},
        {label: '一级类目名称', value: this.item.category_name1},
        {label: '二级类目名称', value: this.item.category_name2},
        {label: '三级类目名称', value: this.item.category_name3},
        {label: '税率', value: this.item.taxRate},
        {label: '所属品牌名称', value: this.item.brandNameCh},
        {label: '供应商名称', value: this.item.supplierName},
        {label: '产地', value: this.item.originArea},
        {label: '重量', value: this.item.weight},
        {label: '商品主图', image: this.item.mainIcon},
        {label: '商品名称', value: this.item.itemTitle},
        {label: '商品副标题', value: this.item.subTitle},
      ]
    }
  },
  created() {
    this.itemcode = this.$route.query.id
    this.getDetail();
  },
  methods: {
    getDetail(){
      selectAuditDetailByItemCode({
        itemCode: this.itemcode
      }).then(res => {
        this.item = res.data
      })
    },
  }
}
</script>
<style lang="scss" scoped>
    .title {
        margin: 10px 0 30px 0;
        font-weight: 700;
    }
    .mytable{
        width: 50%;
        line-height: 1.8;
        padding-bottom: 30px;
    }
    .mytable-body{
        padding: 0;
        margin: 0;
        overflow: hidden;
    }
    .mytable__row{
        display: flex;
        padding: 0px;
        margin: 0;
        border: 1px solid #ebeef5;
        border-bottom: none;
        box-sizing: border-box;
        &:last-child{
            border-bottom: 1px solid #ebeef5;
        }
        .mytable__label{
            width: 200px;
            border-right: 1px solid #ebeef5;
            padding: 10px;
        }
        .mytable__value{
            padding: 10px;
            padding-left: 20px;
            flex: 1;
        }
        .img{
            width: 100px;
            height: 100px;
        }
    }
    .mytable__row2{
    width: 100%;
    float: left;
    }
</style>
