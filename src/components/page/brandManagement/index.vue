<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 品牌管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>         
        <div class="container">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="品牌名称">
                    <el-input v-model="formInline.name" placeholder="请输入品牌名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">搜索</el-button>
                    <el-button type="primary" @click="clear">重置</el-button>
                    <el-button type="primary" ><router-link to="addBrand">新增品牌</router-link></el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" border style="width: 100%"> 
                <el-table-column prop="China" label="品牌中文名" width="200" align="center"></el-table-column> 
                <el-table-column prop="English" label="品牌英文名" width="200" align="center"></el-table-column> 
                <el-table-column prop="ascription" label="归属地" width="200" align="center"></el-table-column> 
                <el-table-column prop="logo" label="品牌logo" width="200" align="center"></el-table-column> 
                <el-table-column fixed="right" label="操作" align="center"> 
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400"
                style="text-align:right">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                currentPage4: 4,        /* 分页用 */
                formInline:{
                    name:"",            /* 品牌名称 */
                },
                tableData:[{
                    China:'3213',           /* 品牌中文名 */
                    English:'354165',         /* 品牌英文名 */
                    ascription:'65496',      /* 归属地 */
                    logo:'224654',            /* 品牌logo */
                },{
                    China:'123',
                    English:'34354354534',
                    ascription:'741',
                    logo:'123',
                },{
                    China:'123',
                    English:'34354354534',
                    ascription:'741',
                    logo:'123',
                }]
            }
        },
        methods:{
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            clear(){
                this.formInline.name=""
            }
        }
    }
</script>
<style lang="scss">
    .content{
        .container{
            .el-form-item{
                .el-form-item__content{
                    .el-button{
                        span{
                            a{
                                color:#fff
                            }
                        }
                    }
                }
            }
        }
    }
</style>