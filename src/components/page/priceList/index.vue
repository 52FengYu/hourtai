<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-open"></i> 价格审核列表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="商品编码">
          <el-input v-model="formInline.code" placeholder="商品编码"></el-input>
        </el-form-item>
        <el-form-item label="全部审核状态">
          <el-select v-model="formInline.region" placeholder="全部审核状态">
            <el-option label="待审核" value="A"></el-option>
            <el-option label="审核通过" value="B"></el-option>
            <el-option label="不通过" value="C"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button type="primary" @click="clear">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="reviewTypes" label="审核类型" width="150"></el-table-column>
                <el-table-column prop="commodityCode" label="商品编码" width="120"></el-table-column>
                <el-table-column prop="beforePrice" label="修改前价格" ></el-table-column>
                <el-table-column prop="afterPrice" label="修改后价格" width="150"></el-table-column>
                <el-table-column prop="name" label="申请人姓名" width="120"></el-table-column>
                <el-table-column prop="start" label="开始时间" ></el-table-column>
                <el-table-column prop="end" label="结束时间" width="150"></el-table-column>
                <el-table-column prop="apply" label="申请时间" width="120"></el-table-column>
                <el-table-column prop="audit" label="审核状态" ></el-table-column>
                <el-table-column label="操作" width="300" align="center">
                    <template slot-scope="scope">
                        <div v-if="tableData.audit != A">           <!-- 这个地方有bug，不论data改成啥  都只显示v-else里面的内容 -->
                            <el-button type="text" icon="el-icon-zoom-in"><router-link to="detail">查看详情</router-link></el-button>
                            <el-button type="success" plain icon="el-icon-delete" class="green">通过</el-button>
                            <el-button type="danger" plain icon="el-icon-error" class="red">不通过</el-button>
                        </div>
                        <div v-else>
                            <el-button type="text" icon="el-icon-zoom-in"><router-link to="detail">查看详情</router-link></el-button>
                        </div>
                    </template>
                </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        code: "",
        region: ""
      },
      form: {
        name: "",
        date: "",
        address: ""
      },
        tableData: [{
            reviewTypes: "35" /* 审核类型 */,
            commodityCode: "2222" /* 商品编码 */,
            beforePrice: "3333" /* 修改前价格 */,
            afterPrice: "44444" /* 修改后价格 */,
            name: "2134" /* 申请人姓名 */,
            start: "1111" /* 开始时间 */,
            end: "555" /* 结束时间 */,
            apply: "666" /* 申请时间 */,
            audit: "B" /* 审核状态 */
            }]
        };
    },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    clear(){
        this.formInline.code = "";
        this.formInline.region = '';
    }
  }
};
</script>  
<style lang="scss">
  .el-button{
        span{
            a{
                color:rgb(99,164,255);
            }
        }
    }
</style>