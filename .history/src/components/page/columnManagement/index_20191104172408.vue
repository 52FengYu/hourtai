<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-s-unfold"></i> 栏目管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="类型">
                    <el-select v-model="formInline.type" placeholder="类型">
                        <el-option
                            v-for="item in formInline.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" >搜索</el-button>
                    <el-button type="primary" >重置</el-button>
                    <el-button type="primary" >修改页面</el-button>
                    <el-button type="primary" >添加</el-button>
                    <el-button type="primary" >编辑栏目</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="id" label="id" width="300" align="center"></el-table-column>
                <el-table-column prop="name" label="名称" width="300" align="center"></el-table-column>
                <el-table-column prop="type" label="所属类型" width="300" align="center"></el-table-column>
                <el-table-column label="操作" align="center" fixed="right" min-width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit">修改</el-button>
                        <el-button type="primary" icon="el-icon-s-tools">修改栏目</el-button>
                        <el-button type="primary" icon="el-icon-caret-top">上移</el-button>
                        <el-button type="primary" icon="el-icon-caret-top">下移</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>    
<script>
import {getPageList} from "@/api/columnManagement"

    export default{
        data(){
            return{
                list:[],
                formInline:{        /* el-form */
                    type:'全部',        /* 类型 */
                    options:[        /* 备选项 */
                        {
                            value:'全部',
                            label:'全部'
                        },
                    ],  
                },  
                tableData:[{
                    id:'123',          /* id */
                    name:"35645",        /* name */
                    type:'9879',        /* type */
                }]      
            }
        },
        methods:{
            getPageList(){
                var that = this;
                this.$axios({
                    method:'POST',
                    url:'https://o2o.liqunshop.com/api/Supplier/SupplierCityListGet'
                }).then(function(response){
                    // this.list =  JSON.stringify(response.data);
                    console.log(JSON.stringify(response.data))
                }),function(error){
                    alert("出错了")
                }

            }
        },
        created(){
            this.getPageList()
        }
    }
</script>  
<style lang="scss" scoped>

</style>