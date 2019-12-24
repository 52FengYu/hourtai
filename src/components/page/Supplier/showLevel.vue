<template>
    <div>
        <el-card>
            <el-form ref="form" :model="form" label-width="80px" :inline="true">
                <el-form-item label="主供应商">
                    <el-select v-model="form.MainSupplierID" placeholder="供应商" clearable filterable>
                        <el-option
                            v-for="item in form.MainSupplierOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getLevelBySupplier">搜索</el-button>
                </el-form-item>
            </el-form>
            <el-tree
                :data = this.BaseClass
                ref="tree"
                show-checkbox
                node-key="value"
                :default-checked-keys = this.formInline
                :props="defaultProps"
                @check-change="getCheckedKeys"
                >
            </el-tree>
            <template v-if="this.formInline.length != 0">
                <el-button type="primary" @click="changeSupplierClass">提交修改</el-button>
            </template>
        </el-card>
    </div>
</template>
<script>
import { SupplierListGetByLevel,getIDclass } from '@/api/goodsList';
import { SupplierClassListGetFromMainSupplierID,SupplierClassUpdate } from '@/api/SupplierList'
import qs from 'qs'
    export default{
        data(){
            return{
                form:{
                    MainSupplierID:'',          /* 主供应商号 */
                    MainSupplierOption:[],          /* 主供应商号备选 */
                },
                formInline:[],              /* 将搜索到的三级分类结果放到这里 */  /* 默认选中用 */
                BaseClass:[],                /* 完整的三级类目 */
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                checkedKeys:[]
            }
        },
        methods:{
            getMainSupplier(){                  /* 获取所有的主供应商 */
                let params = {
                    Level:1,
                }
                SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.form.MainSupplierOption = JSON.parse(res.data.Result)
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
            getLevelBySupplier(){               /* 根据供应商获取三级类目 */
                let params = {
                    MainSupplierID:this.form.MainSupplierID
                }
                SupplierClassListGetFromMainSupplierID(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        var lang = []
                        var arr = []
                        lang = JSON.parse(res.data.Result).ClassIDS
                        arr = Array.prototype.slice.call(lang);
                        this.formInline = Array.prototype.slice.call(arr)
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
            getLevel(){             /* 获取所有的三级类目 */
                if(localStorage.productIdClass == null) {
                    let params = {}
                    getIDclass(qs.stringify(params)).then((res)=>{
                        if(res.data.Success == 1){
                            this.BaseClass = JSON.parse(res.data.Result)
                            localStorage['productIdClass']=res.data.Result;
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
                }else{
                    this.BaseClass = JSON.parse(localStorage['productIdClass'])
                }
            },
            getCheckedKeys() {
                this.checkedKeys = this.$refs.tree.getCheckedKeys()
            },
            changeSupplierClass(){
                let params = {
                    MainSupplierID:this.form.MainSupplierID,
                    ClassIDS:JSON.stringify(this.checkedKeys)
                }
                SupplierClassUpdate(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('提交成功')
                        this.getLevel()
                        this.getLevelBySupplier()
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
            this.getLevel()
        }
    }
</script>
<style lang="scss" scoped>
    .el-card{
        padding-left:10%!important
    }
</style>