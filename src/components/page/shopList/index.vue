<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-s-goods"></i> 门店列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <el-card class="box-card">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item>
                        <el-input
                            placeholder="门店列表"
                            v-model="formInline.shopList"
                            clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input
                            placeholder="门店名称"
                            v-model="formInline.shopName"
                            clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="formInline.value1" clearable placeholder="全部门店级别">
                            <el-option
                            v-for="item in formInline.options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="formInline.value2" clearable placeholder="所有类型">
                            <el-option
                            v-for="item in formInline.options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">搜索</el-button>
                        <el-button type="primary" @click="clear">重置</el-button>
                        <el-button type="primary"><router-link to="newStore">门店新增</router-link></el-button>
                    </el-form-item>
                </el-form>
                <el-table :data="formInline.form" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                    <el-table-column prop="storeCode" label="门店编码"  width="80" align=center></el-table-column>
                    <el-table-column prop="name" label="门店名称" width="120" align=center></el-table-column>
                    <el-table-column prop="address" label="门店地址" :formatter="formatter" align=center></el-table-column>
                    <el-table-column prop="storePhone" label="门店电话"  width="150" align=center></el-table-column>
                    <el-table-column prop="storeLevel" label="门店级别" width="120" align=center></el-table-column>
                    <el-table-column prop="storeType" label="门店类型" :formatter="formatter" align=center></el-table-column>
                    <el-table-column prop="head" label="负责人"  width="150" align=center></el-table-column>
                    <el-table-column prop="email" label="邮箱" width="180" align=center></el-table-column>
                    <el-table-column prop="mobile" label="电话" :formatter="formatter" align=center></el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                </el-pagination>
            </el-card>
        </div>
    </div>
</template>    
<script>
    export default{
        data(){
            return{
                currentPage4: 4,        /* 分页用 */
                formInline:{
                    shopList:'',        /* 门店列表 */
                    shopName:'',        /* 门店名称 */
                    options1: [          /* 全部门店级别 */
                        {
                            value: '选项1',
                            label: 'A级'
                        }, 
                        {
                            value: '选项2',
                            label: 'B级'
                        }, 
                        {
                            value: '选项3',
                            label: 'C级'
                        }
                    ],
                    value1: '全部门店级别',
                    options2: [          /* 全部门店级别 */
                        {
                            value: '选项1',
                            label: '商超'
                        }, 
                        {
                            value: '选项2',
                            label: '全球购'
                        }, 
                        {
                            value: '选项3',
                            label: '旅游'
                        }, 
                        {
                            value: '选项4',
                            label: '电器'
                        }, 
                        {
                            value: '选项5',
                            label: '百货'
                        }
                    ],
                    value2: '所有类型',
                    form: [{
                        storeCode: '1',     /* 门店编码 */
                        name: '1',      /* 门店名称 */
                        address: '1',        /* 门店地址 */
                        storePhone:'2',     /* 门店电话 */
                        storeLevel:'3',     /* 门店级别 */
                        storeType:'',       /* 门店类型 */
                        head:'',        /* 负责人 */
                        email:'',       /* 邮箱 */
                        mobile:'',      /* 电话 */
                    }],
                }
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
                this.formInline.shopList = "",
                this.formInline.shopName="",
                this.formInline.value1='',
                this.formInline.value2=''
            }
        }
    }
</script>  
<style lang="scss" scoped>
    .el-pagination{
        float:right
    }
    .el-button{
        span{
            a{
                color:#fff;
            }
        }
    }
</style>