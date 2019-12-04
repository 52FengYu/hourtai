<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-s-grid"></i> 新增门店</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-form ref="form" :model="form">
                <el-form-item label="负责人">
                    <el-input v-model="form.head"></el-input>
                </el-form-item>
                <el-form-item label="负责人邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="负责人电话">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="门店编码">
                    <el-input v-model="form.storeCode"></el-input>
                </el-form-item>
                <el-form-item label="门店名称">
                    <el-input v-model="form.storeName"></el-input>
                </el-form-item>
                <el-form-item label="门店状态" prop="storeOpeningStatus">
                    <el-radio-group v-model="form.storeOpeningStatus">
                    <el-radio label="开放"></el-radio>
                    <el-radio label="关闭"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否统配" prop="forward">
                    <el-radio-group v-model="form.forward">
                    <el-radio label="是"></el-radio>
                    <el-radio label="否"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="门店级别" prop="storeLevel">
                    <el-select v-model="form.storeLevel" placeholder="门店级别">
                        <el-option label="A级" value="A"></el-option>
                        <el-option label="B级" value="B"></el-option>
                        <el-option label="C级" value="C"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="门店类目体系" prop="storeCategorySystem">
                    <el-select v-model="form.storeCategorySystem" placeholder="门店级别">
                        <el-option label="门店体系" value="A"></el-option>
                        <el-option label="跨境购体系" value="B"></el-option>
                        <el-option label="旅游服务" value="C"></el-option>
                        <el-option label="电器体系" value="D"></el-option>
                        <el-option label="百货体系" value="E"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="门店类型" prop="storeType">
                    <el-select v-model="form.storeType" placeholder="门店类型">
                        <el-option label="商超" value="A"></el-option>
                        <el-option label="全球购" value="B"></el-option>
                        <el-option label="旅游" value="C"></el-option>
                        <el-option label="电器" value="D"></el-option>
                        <el-option label="百货" value="E"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="门店地址" prop="storeAddress">
                    <el-cascader
                        v-model="form.addressValue"
                        :options="address"
                        @change="handleChange">
                    </el-cascader>  
                    <el-input
                        v-model="form.addressValue"
                        clearable>
                    </el-input>
                    <el-button type="primary">获取经纬度</el-button>
                </el-form-item>
                <el-form-item label="门店经纬度">
                    <span>13541</span>
                </el-form-item>
                <el-form-item label="极速配送范围设置">
                    <el-input
                        type="textarea"
                        v-model="form.textarea"
                        :rows="4"
                        :disabled="true"
                        >
                    </el-input>
                     <el-button type="primary">地图选点</el-button>
                </el-form-item>
                <el-form-item label="订单配送顺延时间">
                    <el-input
                        placeholder="请填写一个大于0的整数"
                        v-model="form.orderDeliveryTime"
                        clearable>
                    </el-input>分钟
                </el-form-item>
                <el-form-item label="配送时间间隔">
                    <el-input
                        placeholder="请输入一个大于0的整数"
                        v-model="form.deliveryTimeInterval"
                        clearable>
                    </el-input>分钟
                </el-form-item>
                <el-form-item label="可配送范围设置">
                    <el-input
                        type="textarea"
                        v-model="form.textarea2"
                        :rows="4"
                        :disabled="true"
                        >
                    </el-input>
                     <el-button type="primary">地图选点</el-button>
                </el-form-item>
                <el-form-item label="订单配送顺延时间">
                    <el-input
                        placeholder="请填写一个大于0的整数"
                        v-model="form.orderDeliveryTime2"
                        clearable>
                    </el-input>分钟
                </el-form-item>
                <el-form-item label="配送时间间隔">
                    <el-input
                        placeholder="请输入一个大于0的整数"
                        v-model="form.deliveryTimeInterval2"
                        clearable>
                    </el-input>分钟
                </el-form-item>
                <el-form-item label="线下营业时间">
                     <el-time-select
                        placeholder="起始时间"
                        v-model="form.startTime"
                        :picker-options="{
                        start: '00:30',
                        end: '23:30'
                        }">
                    </el-time-select>
                    &nbsp;&nbsp;-&nbsp;&nbsp;
                    <el-time-select
                        placeholder="结束时间"
                        v-model="form.endTime"
                        :picker-options="{
                        start: '00:30',
                        end: '23:30',
                        minTime: form.startTime
                        }">
                    </el-time-select>
                </el-form-item>
                <el-form-item label="门店电话">
                    <el-input
                        placeholder="门店电话"
                        v-model="form.storePhone"
                        clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="支付方式">
                    <el-checkbox-group v-model="form.paymentMethod">
                        <el-checkbox label="在线"></el-checkbox>
                        <el-checkbox label="货到付款（金卡）"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>    
                <el-form-item label="配送方式">
                    <el-checkbox-group v-model="form.distribution">
                        <el-checkbox label="送货上门"></el-checkbox>
                        <el-checkbox label="门店自提"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>    
                <el-form-item label="自提地址">
                    <el-input v-model="form.address" placeholder="仅填写门店内具体位置（如：1楼服务台）"></el-input>
                </el-form-item>
                <el-form-item label="起止配送时间">
                     <el-time-select
                        placeholder="起始时间"
                        v-model="form.startTime2"
                        :picker-options="{
                        start: '08:30',
                        step: '00:15',
                        end: '23:30'
                        }">
                    </el-time-select>
                    &nbsp;&nbsp;-&nbsp;&nbsp;
                    <el-time-select
                        placeholder="结束时间"
                        v-model="form.endTime2"
                        :picker-options="{
                        start: '08:30',
                        step: '00:15',
                        end: '23:30',
                        minTime: form.startTime2
                        }">
                    </el-time-select>
                </el-form-item>
                <el-form-item label="门店图">
                    <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        accept="image/png, image/jpeg"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="form.dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="配送信息">
                    <el-input type="textarea" :rows="4" v-model="form.desc"></el-input>
                </el-form-item>
                 <el-form-item label="运费设置">
                     <div class="judge">
                        当订单金额小于<el-input v-model="form.orderMoney" clearable></el-input>时，收取<el-input v-model="form.money" clearable></el-input>元运费;
                        当订单商品总重量超过<el-input v-model="form.weight" clearable></el-input>公斤(kg)时，每超过<el-input v-model="form.unit" clearable></el-input>公斤(kg)收取<el-input v-model="form.addmoeny" clearable></el-input>元运费
                     </div>
                </el-form-item>
                <el-form-item label="售后信息">
                    <el-input
                        type="textarea"
                        :rows="4"
                        v-model="form.textarea3">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>    
<script>
    export default{
        data(){
            return{
                form:{
                    disabled:'',      /* 极速配送范围设置 */
                    head:'',      /* 负责人 */
                    email:'',       /* 负责人邮箱 */
                    phone:'',       /* 负责人电话 */
                    storeCode:'',       /* 门店编码 */
                    storeName:'',       /* 门店名称 */
                    storeOpeningStatus: '',       /* 门店开放状态 */
                    forward:'',         /* 是否统配 */
                    storeCategorySystem:'',     /* 网点类目体系 */
                    storeType:'',       /* 门店类型 */
                    storeAddress:'',        /* 门店地址 */
                    textarea:'',        /* 极速配送范围设置 */
                    orderDeliveryTime:'',       /* 订单配送顺延时间 */
                    deliveryTimeInterval:'',        /* 配送时间间隔 */
                    textarea2:'',       /* 可配送范围设置 */
                    orderDeliveryTime2:'',       /* 订单配送顺延时间 */
                    deliveryTimeInterval2:'',        /* 配送时间间隔 */
                    startTime: '',      /* 开始时间 */
                    endTime: '',         /* 结束时间 */
                    storePhone:'',         /* 门店电话 */
                    paymentMethod: ['在线','货到付款（金卡）'],       /* 支付方式 */
                    distribution:['送货上门','门店自提'],        /* 配送方式 */
                    address:'',         /* 自提地址 */
                    startTime2: '',     /* 开始配送时间 */
                    endTime2: '',        /* 结束配送时间 */
                    dialogImageUrl: '',     /* 图片上传 */
                    dialogVisible: false,        /* 图片上传 */
                    desc: '',       /* textarea */
                    orderMoney:'',      /* 订单金额小于这个值 */
                    money:'',       /* 小于某值收取的运费 */
                    weight:'',         /* 总重超出这个值 */
                    unit:"",            /* 每单位 */
                    addmoeny:"",        /* 多收取这些 */
                    textarea3:'',       /* 售后信息 */
                },
                addressValue:'',
                address: [{
                    value: '山东省',
                    label: '山东省',
                    children: [{
                        value: '青岛市',
                        label: '青岛市',
                        children: [{
                        value: '李沧区',
                        label: '李沧区'
                        }, {
                        value: '市北区',
                        label: '市北区'
                        }, {
                        value: '市南区',
                        label: '市南区'
                        }, {
                        value: '胶州市',
                        label: '胶州市'
                        }]
                    }, {
                        value: 'daohang',
                        label: '导航',
                        children: [{
                        value: 'cexiangdaohang',
                        label: '侧向导航'
                        }, {
                        value: 'dingbudaohang',
                        label: '顶部导航'
                        }]
                    }]
                    }, {
                    value: 'zujian',
                    label: '组件',
                    children: [{
                        value: 'basic',
                        label: 'Basic',
                        children: [{
                        value: 'layout',
                        label: 'Layout 布局'
                        }, {
                        value: 'color',
                        label: 'Color 色彩'
                        }, {
                        value: 'typography',
                        label: 'Typography 字体'
                        }, {
                        value: 'icon',
                        label: 'Icon 图标'
                        }, {
                        value: 'button',
                        label: 'Button 按钮'
                        }]
                    }, {
                        value: 'form',
                        label: 'Form',
                        children: [{
                        value: 'radio',
                        label: 'Radio 单选框'
                        }, {
                        value: 'checkbox',
                        label: 'Checkbox 多选框'
                        }, {
                        value: 'input',
                        label: 'Input 输入框'
                        }, {
                        value: 'input-number',
                        label: 'InputNumber 计数器'
                        }, {
                        value: 'select',
                        label: 'Select 选择器'
                        }, {
                        value: 'cascader',
                        label: 'Cascader 级联选择器'
                        }, {
                        value: 'switch',
                        label: 'Switch 开关'
                        }, {
                        value: 'slider',
                        label: 'Slider 滑块'
                        }, {
                        value: 'time-picker',
                        label: 'TimePicker 时间选择器'
                        }, {
                        value: 'date-picker',
                        label: 'DatePicker 日期选择器'
                        }, {
                        value: 'datetime-picker',
                        label: 'DateTimePicker 日期时间选择器'
                        }, {
                        value: 'upload',
                        label: 'Upload 上传'
                        }, {
                        value: 'rate',
                        label: 'Rate 评分'
                        }, {
                        value: 'form',
                        label: 'Form 表单'
                        }]
                    }, {
                        value: 'data',
                        label: 'Data',
                        children: [{
                        value: 'table',
                        label: 'Table 表格'
                        }, {
                        value: 'tag',
                        label: 'Tag 标签'
                        }, {
                        value: 'progress',
                        label: 'Progress 进度条'
                        }, {
                        value: 'tree',
                        label: 'Tree 树形控件'
                        }, {
                        value: 'pagination',
                        label: 'Pagination 分页'
                        }, {
                        value: 'badge',
                        label: 'Badge 标记'
                        }]
                    }, {
                        value: 'notice',
                        label: 'Notice',
                        children: [{
                        value: 'alert',
                        label: 'Alert 警告'
                        }, {
                        value: 'loading',
                        label: 'Loading 加载'
                        }, {
                        value: 'message',
                        label: 'Message 消息提示'
                        }, {
                        value: 'message-box',
                        label: 'MessageBox 弹框'
                        }, {
                        value: 'notification',
                        label: 'Notification 通知'
                        }]
                    }, {
                        value: 'navigation',
                        label: 'Navigation',
                        children: [{
                        value: 'menu',
                        label: 'NavMenu 导航菜单'
                        }, {
                        value: 'tabs',
                        label: 'Tabs 标签页'
                        }, {
                        value: 'breadcrumb',
                        label: 'Breadcrumb 面包屑'
                        }, {
                        value: 'dropdown',
                        label: 'Dropdown 下拉菜单'
                        }, {
                        value: 'steps',
                        label: 'Steps 步骤条'
                        }]
                    }, {
                        value: 'others',
                        label: 'Others',
                        children: [{
                        value: 'dialog',
                        label: 'Dialog 对话框'
                        }, {
                        value: 'tooltip',
                        label: 'Tooltip 文字提示'
                        }, {
                        value: 'popover',
                        label: 'Popover 弹出框'
                        }, {
                        value: 'card',
                        label: 'Card 卡片'
                        }, {
                        value: 'carousel',
                        label: 'Carousel 走马灯'
                        }, {
                        value: 'collapse',
                        label: 'Collapse 折叠面板'
                        }]
                    }]
                    }, {
                    value: 'ziyuan',
                    label: '资源',
                    children: [{
                        value: 'axure',
                        label: 'Axure Components'
                    }, {
                        value: 'sketch',
                        label: 'Sketch Templates'
                    }, {
                        value: 'jiaohu',
                        label: '组件交互文档'
                    }]
                }]
            }
        },
        methods:{
            handleChange(value) {
                console.log(value);
            }
        }
    }
</script>  
<style lang="scss" scoped>
    .container{
        .el-form{
            .el-form-item{
                label{
                    margin-right:10vw
                }
                .el-input{
                    width:15vw;
                    // margin-left:2%;
                }
                .el-button{
                    margin-left: 2%;
                }
                .el-textarea{
                    width:30vw
                }
                .judge{
                    margin-left:10vw;
                    .el-input{
                        width:5vw;
                        padding:0;
                        margin:0
                    }
                }
            }
        }
    }
</style>