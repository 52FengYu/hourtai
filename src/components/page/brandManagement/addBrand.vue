<template>
    <div>
        <el-card>
            <h4>品牌基础信息</h4>
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="*品牌中文名">
                    <el-input v-model="form.china"></el-input>
                </el-form-item>
                <el-form-item label="品牌英文名">
                    <el-input v-model="form.english"></el-input>
                </el-form-item>
                <el-form-item label="归属地">
                    <el-input v-model="form.ascription"></el-input>
                </el-form-item>
                <el-form-item label="品牌LOGO">
                    <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        accept="image/gif, image/jpeg"
                        auto-upload=false>
                        <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="品牌介绍">
                    <el-input
                        type="textarea"
                        :rows="10"
                        placeholder="请输入内容"
                        v-model="form.textarea">
                    </el-input>
                </el-form-item>
                <h4>品牌主页展示</h4>
                <el-form-item label="品牌详情图">
                    <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        accept="image/gif, image/jpeg">
                        <i class="el-icon-plus"
                        ></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="品牌banner">
                    <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        accept="image/gif, image/jpeg">
                        <i class="el-icon-plus"
                        ></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交创建</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
    export default{
        name:'addBrand',
        data(){
            return{
                dialogImageUrl: '',             /* 文件上传 */
                dialogVisible: false,           /* 文件上传 */
                form: {
                    china:'',                   /* 品牌中文名 */
                    english:'',                 /* 品牌英文名 */
                    ascription:'',              /* 归属地 */
                    textarea:'',                /* 描述框 */
                }
            }
        },
        methods:{
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .el-card{
        .el-form{
            .el-form-item{
                .el-form-item__label{
                    width: 10vw!important;
                }
                .el-form-item__content{
                    .el-input{
                        max-width:20vw!important;
                    }
                }
            }
        }
    }
</style>