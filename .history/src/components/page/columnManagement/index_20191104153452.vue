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
                <el-table-column prop="date" label="id" width="300" align="center"></el-table-column>
                <el-table-column prop="name" label="名称" width="300" align="center"></el-table-column>
                <el-table-column prop="address" label="所属类型" width="300" align="center"></el-table-column>
                <el-table-column label="操作" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">修改栏目</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">上移</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">下移</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>    
<script>
    export default{
        data(){
            return{
                formInline:{        /* el-form */
                    type:'',        /* 类型 */
                    options:[        /* 备选项 */
                        {
                            value:'全部',
                            label:'全部'
                        }
                    ],  
                },          
            }
        }
    }
</script>  
<style lang="scss" scoped>

</style>