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
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
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