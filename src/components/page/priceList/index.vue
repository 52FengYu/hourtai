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
        <el-form-item label="主供应商号">
          <el-select v-model="formInline.MainSupplierID" placeholder="主供应商"  clearable filterable @change="getSupplier">
              <el-option
                  v-for="item in formInline.option1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
              </el-select>
        </el-form-item>
        <el-form-item label="供应商号">
          <el-select v-model="formInline.SupplierID" placeholder="供应商" clearable filterable @change="reset">
              <el-option
                  v-for="item in formInline.option2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
              </el-select>
        </el-form-item>
        <el-form-item label="全部审核状态">
          <el-select v-model="formInline.region" placeholder="全部审核状态" @change="reset" clearable>
            <el-option label="新建" value="N"></el-option>
            <el-option label="审核通过" value="O"></el-option>
            <el-option label="停止" value="S"></el-option>
            <el-option label="驳回" value="B"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
            <el-date-picker
              v-model="formInline.timeStart"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
               @change="reset">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
            <el-date-picker
              v-model="formInline.timeEnd"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
               @change="reset">
            </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getData">搜索</el-button>
          <el-button type="primary" @click="clear">重置</el-button>
          <!-- <el-button type="primary" @click="editVisible2 = true">新建</el-button> -->
        </el-form-item>
      </el-form>
      <el-table :data="tableData.ModelList" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="ID" label="调价单号" align="center"></el-table-column>
                <el-table-column prop="ProductID" label="商品编码" align="center"></el-table-column>
                <el-table-column prop="ProductName" label="商品名称" align="center"></el-table-column>

                <el-table-column prop="NewMemberPrice" label="新价格(元)" align="center"></el-table-column>
                <el-table-column prop="OldMemberPrice" label="原价格(元)" align="center"></el-table-column>

                <el-table-column prop="ChangeType" label="调价类型" align="center">
                  <template slot-scope="scope">
                    {{scope.row.ChangeType === 'Y' ? '永久调价' : '区间调价'}}     
                  </template>
                </el-table-column>
                <el-table-column prop="Audit" label="审核状态" align="center">
                  <template slot-scope="scope">
                    {{scope.row.Audit === 'N' ? '新建' : ( scope.row.Audit === 'O' ? '审核通过' : ( scope.row.Audit === 'B' ? '驳回' : '停止'))}}
                  </template>
                </el-table-column>
                <el-table-column prop="BeginTime" label="区间调价执行开始时间" align="center"></el-table-column>
                <el-table-column prop="EndTime" label="区间调价执行结束时间" align="center"></el-table-column>
                <el-table-column prop="Remark" label="备注" align="center"></el-table-column>
                <el-table-column prop="AuditRemark" label="审核备注" align="center"></el-table-column>
                <el-table-column label="是否废弃" align="center">
                  <template slot-scope="scope">
                    {{scope.row.DelFlag === 'Y' ? '是' : '否'}}
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="250px">
                    <template  slot-scope="scope">
                         <el-button type="primary" icon="el-icon-zoom-in" @click="check(scope.row)" v-if="scope.row.Audit == 'N'">审核</el-button>
                         <el-button type="primary" icon="el-icon-zoom-in" @click="edit(scope.row)" v-if="scope.row.Audit == 'N' || scope.row.Audit == 'B'">修改</el-button>
                         <el-button type="danger" v-if="scope.row.Audit == 'O'" @click="stop(scope.row)">停止</el-button>
                         <el-button type="danger" v-if="scope.row.Audit == 'N' || scope.row.Audit == 'B'" @click="discard(scope.row)">废弃</el-button>
                    </template>
                </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage2"
            :page-size = this.PageSize
            layout="sizes, prev, pager, next"
            :total= this.total
            align="right">
          </el-pagination>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog title="调价审核" :visible.sync="editVisible" width="40%" :close-on-click-modal="false">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="审核状态">
                    <el-radio v-model="form.Audit" label="O">通过</el-radio>
                    <el-radio v-model="form.Audit" label="B">不通过</el-radio>
                </el-form-item>
                <el-form-item label="审核备注">
                    <el-input v-model="form.AuditRemark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改弹出框 -->
        <el-dialog title="修改" :visible.sync="editVisible2" width="40%" :close-on-click-modal="false">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="商品名称">
                    <el-input v-model="form.ProductName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="新价格">
                    <el-input v-model="form.NewPrice"></el-input>
                </el-form-item>
                <el-form-item label="调价类型">
                    <el-radio v-model="form.radio" label="1">永久调价</el-radio>
                    <el-radio v-model="form.radio" label="2">区间调价</el-radio>
                </el-form-item>
                <el-form-item>
                  <template v-if="this.form.radio == 2">
                    <el-form-item label="调价开始时间">
                        <el-date-picker
                          v-model="form.changeTimeStart"
                          type="datetime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择日期时间"
                          >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="调价结束时间">
                        <el-date-picker
                          v-model="form.changeTimeEnd"
                          type="datetime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择日期时间"
                          >
                        </el-date-picker>
                    </el-form-item>
                  </template>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.Remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
      </div>
</template>
<script>
import { changePriceList,PriceAdjustmentReview,ProductPriceAdjustment,ProductPriceChange,StopPriceAdjustment,PriceAdjustment,SupplierListGetByLevel } from '@/api/goodsList';
import qs from 'qs'
  export default {
    name:'priceList',
    data() {
      return {
        editVisible:false,
        editVisible2:false,
        total:'',                     /* 总数 */
        PageSize:10,                  /* 分页 页数 */
        currentPage2: 1,              /* 分页 页码 */
        formInline: {
          MainSupplierID:'',          /* 主供应商号 */
          SupplierID:"",              /* 供应商号 */
          region: "",
          timeStart:'',                    /* 时间选择器开始 */
          timeEnd:'',                     /* 时间选择器结束 */
          option1:[],
          option2:[]
        },
        form: {
          AuditRemark: "",               /* 审核备注 */
          radio:'1',
          ProductID:'',
          NewPrice:'',
          changeTimeStart:'',
          changeTimeEnd:'',
          Remark:'',
          Audit:'',
          ProductName:'',
        },
        tableData: [],
        ID:'',
        }
      },
    methods: {
      reset(){
        this.currentPage2 = 1,
        this.PageSize = 10
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      clear(){
          this.formInline.region = '',
          this.formInline.MainSupplierID="",
          this.formInline.SupplierID="",
          this.formInline.timeStart="",
          this.formInline.timeEnd=""
      },
      getData(){
        let params = {
            MainSupplierID : this.formInline.MainSupplierID,
            SupplierID : this.formInline.SupplierID,
            Audit: this.formInline.region,
            CreateBeginTime : this.formInline.timeStart,
            CreateEndTime : this.formInline.timeEnd,
            PageIndex : this.currentPage2,
            PageSize : this.PageSize,
        }
        changePriceList(qs.stringify(params)).then((res)=>{
            if(res.data.Success == 1){
                this.tableData = JSON.parse(res.data.Result)
                this.total = this.tableData.TotalCount
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
      saveEdit(){           /* 调价审核 */
          // console.log(this.form.Audit)
          let params = {
            ID:this.ID,            /* 调价单号 */
            Audit:this.form.Audit,             /* 审核状态 */
            AuditRemark:this.form.AuditRemark,       /* 审核备注 */
        }
        PriceAdjustmentReview(qs.stringify(params)).then((res)=>{
            if(res.data.Success == 1){
              this.editVisible = false
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.getData()
            }
            if(res.data.Success == 0){
                this.$message(res.data.Result)
            }
            if(res.data.Success == -998){
                this.$message(res.data)
            }
        }).catch(function(e){
            console.log(e)
        })
      },
      check(row){
        this.editVisible = true,
        this.ID = row.ID
        this.form.radio = ''
        this.form.AuditRemark = ''
      },
      edit(row){
        this.editVisible2 = true,
        this.form.ProductID = row.ID,
        this.form.ProductName = row.ProductName
      },
      handleSizeChange(size) {
        console.log(`每页 ${size} 条`);
        this.PageSize = size;
        this.getData()
      },
      handleCurrentChange(index) {
        console.log(`当前页: ${index}`);
        this.currentPage2 = index;
        this.getData()
      },
      saveAdd(){          /* 修改 */
        console.log(JSON.stringify(this.form.changeTimeStart))
        console.log(this.form.changeTimeStart)
        console.log(JSON.stringify(this.form.changeTimeEnd))
        console.log(this.form.changeTimeEnd)
        let params = {
            ID:this.form.ProductID,
            NewPrice:this.form.NewPrice,
            ChangeType:this.form.radio == '1' ? 'Y' : 'Q',
            BeginTime:this.form.changeTimeStart,
            EndTime:this.form.changeTimeEnd,
            Remark:this.form.Remark
        }
        ProductPriceChange(qs.stringify(params)).then((res)=>{
            if(res.data.Success == 1){
              this.editVisible = false
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.getData()
                this.editVisible2 = false,
                this.form.ProductID = '',
                this.form.NewPrice = '',
                this.form.radio = '1',
                this.form.changeTimeStart = '',
                this.form.changeTimeEnd = '',
                this.form.Remark = ''
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
      stop1(){
        let params = {
          ID:this.ID
      }
      StopPriceAdjustment(qs.stringify(params)).then((res)=>{
          if(res.data.Success == 1){
              this.$message.success('删除成功');
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
      stop(row) {
        this.ID = row.ID
        this.$confirm('确定要停止吗？', '提示', {
          type: 'warning'
        })
        .then(() => {
            this.stop1()
        })
        .catch(() => {});
      },
      discard1(){
          let params = {
          ID:this.ID
      }
      PriceAdjustment(qs.stringify(params)).then((res)=>{
          if(res.data.Success == 1){
              this.$message.success('废弃成功');
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
      discard(row){                                   /* 点击废弃按钮之后调用这个方法 点击确定之后会调用上面的discard1的方法 */
        this.ID = row.ID
        this.$confirm('确定要废弃吗？', '提示', {
          type: 'warning'
        })
        .then(() => {
            this.discard1()
        })
        .catch(() => {});
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
                this.formInline.SupplierID = '',
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
            }
    },
    created(){
      // this.getData()
      this.getMainSupplier()
    }
  }
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