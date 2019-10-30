<template>
    <div>
        <el-card class="box-card">
            <div class="first">
                <span>套装主图</span>
                <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    accept="image/png, image/jpeg"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible1">
                    <img width="100%" :src="dialogImageUrl1" alt="">
                </el-dialog>
            </div>
            <div class="second">
                <span>套图详情</span>
                <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    accept="image/png, image/jpeg"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible2">
                    <img width="100%" :src="dialogImageUrl2" alt="">
                </el-dialog>
            </div>
            <p>基础信息</p>
            <div class="info" style="display:flex">
                <div class="left">
                    <div>
                        <span>商品名称</span>
                        <el-input
                            placeholder="请输入内容"
                            v-model="name"
                            clearable>
                        </el-input>
                    </div>
                    <div>
                        <span>商品类别</span>
                        <div class="el-input">
                            <el-cascader :options="options" clearable placeholder="请选择类目"></el-cascader>
                        </div>
                    </div>
                    <div>
                        <span>品牌</span>
                        <div class="el-input">
                            <el-button type="success" plain @click="handleEdit">修改品牌</el-button>
                            <span style="display:block;background:rgb(202,226,234);border-radius:5px;min-width:3rem;margin-left:15px">124654</span>
                        </div>
                    </div>
                    <div>
                        <span>重量（kg）</span>
                        <el-input
                            placeholder="请输入内容"
                            v-model="weight"
                            clearable>
                        </el-input>
                    </div>
                    <div>
                        <span>包装含量</span>
                        <el-input
                            placeholder="请输入包装含量"
                            v-model="packingContent"
                            clearable>
                        </el-input>
                    </div>
                    <div>
                        <span>产地</span>
                        <el-input
                            placeholder="产地"
                            v-model="origin"
                            clearable>
                        </el-input>
                    </div>
                    <div>
                        <span>所属门店</span>
                        <span>全球购</span>
                    </div>
                </div>
                <div class="right">
                    <div>
                        <span>计量单位</span>
                        <div class="first">
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in qualit"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div>
                        <span>税率</span>
                        <div class="second">
                            <el-input
                                placeholder="请输入内容"
                                v-model="rate"
                                clearable>
                            </el-input>
                            <span class="span" style="margin-top:1vh;margin-left:1vh">%</span>
                        </div>
                    </div>
                    <div>
                        <span>供应商</span>
                        <div class="three"> 
                            <el-input
                                placeholder="请输入内容"
                                v-model="supplier"
                                clearable>
                            </el-input>
                        </div>
                    </div>
                </div>
            </div>
            <div class="four">
                <h4>展示参数（选填）</h4>
                <div class="content">
                    <el-input
                        placeholder="请输入内容"
                        v-model="left"
                        clearable>
                    </el-input>
                    <el-input
                        placeholder="请输入内容"
                        v-model="right"
                        clearable>
                    </el-input>
                    <el-button type="text">新增参数</el-button>
                </div>
                <div class="attribute">
                    <span>*商品属性</span>
                    <el-checkbox v-model="checked">是否单规格</el-checkbox>
                </div>
            </div>
            <div class="five">
                <!-- 动态input部分 -->
                <div v-for="(item, index) in dynamicItem" :key="index" style="display:flex;width:60vh">
                    <el-input
                        placeholder="请输入属性名"
                        v-model="propertyName"
                        clearable>
                    </el-input>
                    <el-input
                        placeholder="请输入属性值"
                        v-model="attributeValues"
                        clearable>
                    </el-input>
                </div>
                <el-button type="text"  @click="addItem">新增属性</el-button>
                <span>您可以手动添加商品规格</span>
            </div>
            <el-button type="primary">保存</el-button>
            <div class="last">
                <el-table :data="form" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                    <el-table-columnwidth="50" align="center"></el-table-column>
                    <el-table-column prop="commodityType" label="*主图"  width="160" align="center" ></el-table-column>
                    <el-table-column prop="uniformCode" label="*商品名称" width="160" align="center" ></el-table-column>
                    <el-table-column prop="storeCode" label="商品副标题" width="130" align="center" ></el-table-column>
                    <el-table-column prop="trafficCode" label="*销售定价"  width="110" align="center" ></el-table-column>
                    <el-table-column prop="picNamCode" label="商品图片/名称/编码" width="225" align="center" ></el-table-column>
                    <el-table-column prop="UPC" label="UPC" width="70" align="center" ></el-table-column>
                    <el-table-column prop="unit" label=""  width="90" align="center" ></el-table-column>
                    <el-table-column prop="spec" label="" width="90" align="center" ></el-table-column>
                    <el-table-column prop="stores" label="商品库存" width="110" align="center" ></el-table-column>
                    <el-table-column prop="merchants" label="包装含量" width="110" align="center" ></el-table-column>
                    <el-table-column prop="storeType" label="是否整箱"  width="110" align="center" ></el-table-column>
                    <el-table-column prop="inventory" label="起订量" width="100" align="center" ></el-table-column>
                    <el-table-column prop="salesPrice" label="最大限购量" width="100" align="center" ></el-table-column>
                </el-table>
            </div>
            <el-button type="primary" style="margin-top:2vh;margin-left:45%">提交审核</el-button>
        </el-card>
        <!-- 编辑弹出框 -->
        <el-dialog title="选择品牌" :visible.sync="editVisible" width="30%">
            <el-input
                placeholder="请输入内容"
                v-model="brand"
                clearable
                style="width:15vh">
            </el-input>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-table
                ref="singleTable"
                :data="tableData"
                highlight-current-row
                @current-change="handleCurrentChange"
                style="width: 100%">
                <el-table-column
                type="index"
                width="50">
                </el-table-column>
                <el-table-column
                property="date"
                label="品牌中文名"
                width="120">
                </el-table-column>
                <el-table-column
                property="name"
                label="品牌英文名"
                width="120">
                </el-table-column>
                <el-table-column
                property="address"
                label="归属地">
                </el-table-column>
                <el-table-column
                property="address"
                label="品牌logo">
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                dynamicItem: [],        /* 新增属性 */
                dialogImageUrl1:'',
                dialogImageUrl2:'',
                rate:'',        /* 税率 */
                name: '',       /* 商品名称 */
                supplier:'',        /* 供应商 */
                weight:'',      /* 重量 */
                packingContent:'',      /* 包装含量 */
                origin:'',      /* 产地 */
                left:'',        /* 展示参数（选填） 左侧 input */
                right:'',       /* 展示参数（选填） 右侧input */
                checked: false,      /* 是否单规格 */
                handlePictureCardPreview:false,
                editVisible:false,      /* 选择品牌弹窗 */
                brand:'',       /* 选择品牌 */
                qualit: [{
                    value: '选项1',
                    label: '个'
                    }, {
                    value: '选项2',
                    label: '箱'
                    }, {
                    value: '选项3',
                    label: '袋'
                    }, {
                    value: '选项4',
                    label: '盒'
                    }, {
                    value: '选项5',
                    label: '瓶'
                    },{
                    value: '选项6',
                    label: '只'
                    }, {
                    value: '选项7',
                    label: '件'
                    }, {
                    value: '选项8',
                    label: '条'
                    }, {
                    value: '选项9',
                    label: '块'
                    }, {
                    value: '选项10',
                    label: '副'
                    },{
                    value: '选项11',
                    label: '片'
                    }, {
                    value: '选项12',
                    label: '份'
                    }, {
                    value: '选项13',
                    label: '罐'
                    }, {
                    value: '选项14',
                    label: '桶'
                    }, {
                    value: '选项15',
                    label: '提'
                    },{
                    value: '选项16',
                    label: '组'
                    }, {
                    value: '选项17',
                    label: '支'
                    }, {
                    value: '选项18',
                    label: '包'
                    }, {
                    value: '选项19',
                    label: 'kg'
                    }, {
                    value: '选项20',
                    label: '套'
                    },{
                    value: '选项21',
                    label: '杯'
                    }, {
                    value: '选项22',
                    label: '碗'
                    }, {
                    value: '选项23',
                    label: '粒'
                    }, {
                    value: '选项24',
                    label: '把'
                    }, {
                    value: '选项25',
                    label: '串'
                    },{
                    value: '选项26',
                    label: '打'
                    }, {
                    value: '选项27',
                    label: '克'
                    }, {
                    value: '选项28',
                    label: '斤'
                    }, {
                    value: '选项29',
                    label: '公斤'
                    }, {
                    value: '选项30',
                    label: '千克'
                    },{
                    value: '选项31',
                    label: '颗'
                    }, {
                    value: '选项32',
                    label: '卷'
                    }, {
                    value: '选项33',
                    label: '台'
                    }, {
                    value: '选项34',
                    label: '双'
                    }, {
                    value: '选项35',
                    label: '枚'
                    },{
                    value: '选项36',
                    label: '对'
                    }, {
                    value: '选项37',
                    label: '本'
                    }, {
                    value: '选项38',
                    label: '根'
                    }, {
                    value: '选项39',
                    label: '卡'
                    }, {
                    value: '选项40',
                    label: '筒'
                    },{
                    value: '选项41',
                    label: '张'
                    }, {
                    value: '选项42',
                    label: '辆'
                    }, {
                    value: '选项43',
                    label: '扎'
                    }, {
                    value: '选项44',
                    label: '板'
                    }, {
                    value: '选项45',
                    label: '听'
                    },{
                    value: '选项46',
                    label: '两'
                    }, {
                    value: '选项47',
                    label: '升'
                    }, {
                    value: '选项48',
                    label: '毫升'
                    }, {
                    value: '选项49',
                    label: '捆'
                    }, {
                    value: '选项50',
                    label: '册'
                    },{
                    value: '选项51',
                    label: '艘'
                    }, {
                    value: '选项52',
                    label: '架'
                    }, {
                    value: '选项53',
                    label: '枝'
                    }, {
                    value: '选项54',
                    label: '棵'
                    }, {
                    value: '选项55',
                    label: '株'
                    },{
                    value: '选项56',
                    label: '盘'
                    }, {
                    value: '选项57',
                    label: '盆'
                    }, {
                    value: '选项58',
                    label: '刀'
                    }, {
                    value: '选项59',
                    label: '扇'
                    }, {
                    value: '选项60',
                    label: '合'
                    }, {
                    value: '选项61',
                    label: '束'
                    }
                ],
                value: '',
                options: [       /* 选择类目 */
                    {    
                        value: '生鲜美食',
                        label: '生鲜美食',
                        children: [{
                            value: '新鲜水果',
                            label: '新鲜水果',
                            children: [{
                                    value: '苹果/梨',
                                    label: '苹果/梨'
                                }, {
                                    value: '柑橘橙柚',
                                    label: '柑橘橙柚'
                                }, {
                                    value: '瓜果类',
                                    label: '瓜果类'
                                }, {
                                    value: '浆果/仁果',
                                    label: '浆果/仁果'
                                },{
                                    value: '核果/坚果',
                                    label: '核果/坚果'
                                }
                            ]
                        }, {
                            value: '新鲜蔬菜',
                            label: '新鲜蔬菜',
                            children: [
                                {
                                    value: '叶菜类',
                                    label: '叶菜类'
                                }, {
                                    value: '花果类',
                                    label: '花果类'
                                },
                                {
                                    value: '菌菇类',
                                    label: '菌菇类'
                                }, {
                                    value: '根茎类',
                                    label: '根茎类'
                                },
                                {
                                    value: '香辛葱蒜',
                                    label: '香辛葱蒜'
                                }, {
                                    value: '豆制品',
                                    label: '豆制品'
                                }
                            ]
                        },{
                            value: '肉禽蛋品',
                            label: '肉禽蛋品',
                            children: [
                                {
                                    value: '猪肉',
                                    label: '猪肉'
                                }, {
                                    value: '牛肉',
                                    label: '牛肉'
                                },
                                {
                                    value: '羊肉',
                                    label: '羊肉'
                                }, {
                                    value: '鸡鸭禽',
                                    label: '鸡鸭禽'
                                },
                                {
                                    value: '蛋类',
                                    label: '蛋类'
                                }, {
                                    value: '其他肉类',
                                    label: '其他肉类'
                                }
                            ]
                        },{
                            value: '低温速食',
                            label: '低温速食',
                            children: [
                                {
                                    value: '面点',
                                    label: '面点'
                                }, {
                                    value: '现场加工',
                                    label: '现场加工'
                                },
                                {
                                    value: '汤圆',
                                    label: '汤圆'
                                }, {
                                    value: '水饺/馄饨',
                                    label: '水饺/馄饨'
                                },
                                {
                                    value: '奶酪黄油',
                                    label: '奶酪黄油'
                                }, {
                                    value: '火锅丸串',
                                    label: '火锅丸串'
                                },{
                                    value: '冷藏/熟食',
                                    label: '冷藏/熟食'
                                },
                                {
                                    value: '冰淇淋/棒',
                                    label: '冰淇淋/棒'
                                }, {
                                    value: '速冻半成品',
                                    label: '速冻半成品'
                                }
                            ]
                        },{
                            value: '海鲜水产',
                            label: '海鲜水产',
                            children: [
                                {
                                    value: '鱼类',
                                    label: '鱼类'
                                }, {
                                    value: '虾蟹类',
                                    label: '虾蟹类'
                                },
                                {
                                    value: '贝壳类',
                                    label: '贝壳类'
                                }, {
                                    value: '海参/鲍鱼',
                                    label: '海参/鲍鱼'
                                },
                                {
                                    value: '水产干货',
                                    label: '水产干货'
                                }
                            ]
                        }]
                    }
                    , {
                        value: '粮油调味',
                        label: '粮油调味',
                        children: [{
                            value: '粮食',
                            label: '粮食',
                            children: [
                                {
                                    value: '大米',
                                    label: '大米'
                                }, {
                                    value: '面粉',
                                    label: '面粉'
                                }, {
                                    value: '挂面/面条',
                                    label: '挂面/面条'
                                }, {
                                    value: '杂粮',
                                    label: '杂粮'
                                }, {
                                    value: '方便食品',
                                    label: '方便食品'
                                }
                            ]
                        }, {
                            value: '调味品',
                            label: '调味品',
                            children: [
                                {
                                    value: '食用油',
                                    label: '食用油'
                                }, {
                                    value: '酱油',
                                    label: '酱油'
                                }, {
                                    value: '醋',
                                    label: '醋'
                                }, {
                                    value: '料酒',
                                    label: '料酒'
                                }, {
                                    value: '调味汁',
                                    label: '调味汁'
                                }, {
                                    value: '佐料油',
                                    label: '佐料油'
                                }, {
                                    value: '调味料',
                                    label: '调味料'
                                }, {
                                    value: '调料粉',
                                    label: '调料粉'
                                }, {
                                    value: '调味酱',
                                    label: '调味酱'
                                }, {
                                    value: '食用糖',
                                    label: '食用糖'
                                }, {
                                    value: '酱菜',
                                    label: '酱菜'
                                }, {
                                    value: '火锅类调料',
                                    label: '火锅类调料'
                                }, {
                                    value: '南北干货',
                                    label: '南北干货'
                                }, {
                                    value: '罐头食品',
                                    label: '罐头食品'
                                }
                            ]
                        }]
                    },
                    {    
                        value: '零食酒水',
                        label: '零食酒水',
                        children: [{
                            value: '休闲食品',
                            label: '休闲食品',
                            children: [
                                {
                                    value: '坚果炒货',
                                    label: '坚果炒货'
                                }, {
                                    value: '饼干曲奇',
                                    label: '饼干曲奇'
                                }, {
                                    value: '蛋糕点心',
                                    label: '蛋糕点心'
                                }, {
                                    value: '肉干小食',
                                    label: '肉干小食'
                                },{
                                    value: '海产零食',
                                    label: '海产零食'
                                },
                                {
                                    value: '蜜饯果干',
                                    label: '蜜饯果干'
                                }, {
                                    value: '果冻布丁',
                                    label: '果冻布丁'
                                }, {
                                    value: '糖果',
                                    label: '糖果'
                                }, {
                                    value: '巧克力',
                                    label: '巧克力'
                                },{
                                    value: '口香糖',
                                    label: '口香糖'
                                },{
                                    value: '干脆小食',
                                    label: '干脆小食'
                                }, {
                                    value: '膨化食品',
                                    label: '膨化食品'
                                },{
                                    value: '进口食品',
                                    label: '进口食品'
                                }
                            ]
                        }, {
                            value: '中外名酒',
                            label: '中外名酒',
                            children: [
                                {
                                    value: '白酒',
                                    label: '白酒'
                                }, {
                                    value: '葡萄酒',
                                    label: '葡萄酒'
                                },
                                {
                                    value: '啤酒',
                                    label: '啤酒'
                                }, {
                                    value: '鸡尾酒',
                                    label: '鸡尾酒'
                                },
                                {
                                    value: '黄酒',
                                    label: '黄酒'
                                }, {
                                    value: '米酒',
                                    label: '米酒'
                                },{
                                    value: '保健酒',
                                    label: '保健酒'
                                }
                            ]
                        },{
                            value: '饮料',
                            label: '饮料',
                            children: [
                                {
                                    value: '饮用水',
                                    label: '饮用水'
                                }, {
                                    value: '碳酸饮料',
                                    label: '碳酸饮料'
                                },
                                {
                                    value: '功能饮料',
                                    label: '功能饮料'
                                }, {
                                    value: '果蔬汁',
                                    label: '果蔬汁'
                                },
                                {
                                    value: '茶饮料',
                                    label: '茶饮料'
                                }, {
                                    value: '含乳饮料',
                                    label: '含乳饮料'
                                }
                            ]
                        },{
                            value: '奶制品',
                            label: '奶制品',
                            children: [
                                {
                                    value: '酸奶',
                                    label: '酸奶'
                                }, {
                                    value: '牛奶',
                                    label: '牛奶'
                                },
                                {
                                    value: '羊奶',
                                    label: '羊奶'
                                }, {
                                    value: '乳酸饮料',
                                    label: '乳酸饮料'
                                }
                            ]
                        },{
                            value: '冲调',
                            label: '冲调',
                            children: [
                                {
                                    value: '麦片/谷物',
                                    label: '麦片/谷物'
                                }, {
                                    value: '奶粉/豆奶粉',
                                    label: '奶粉/豆奶粉'
                                },
                                {
                                    value: '咖啡及伴侣',
                                    label: '咖啡及伴侣'
                                }, {
                                    value: '茶叶茶包',
                                    label: '茶叶茶包'
                                },
                                {
                                    value: '奶茶/菓珍',
                                    label: '奶茶/菓珍'
                                },
                                {
                                    value: '养生糊/粉',
                                    label: '养生糊/粉'
                                }
                            ]
                        },{
                            value: '营养保健',
                            label: '营养保健',
                            children: [
                                {
                                    value: '传统滋养',
                                    label: '传统滋养'
                                }, {
                                    value: '保健品',
                                    label: '保健品'
                                },
                                {
                                    value: '蜂蜜制品/柚子茶',
                                    label: '蜂蜜制品/柚子茶'
                                }
                            ]
                        }
                        ]
                    },
                    {
                        value: '日用百货',
                        label: '日用百货',
                        children: [{
                            value: '纸品湿巾',
                            label: '纸品湿巾',
                            children: [
                                {
                                    value: '抽纸',
                                    label: '抽纸'
                                }, {
                                    value: '卷纸',
                                    label: '卷纸'
                                }, {
                                    value: '手帕纸',
                                    label: '手帕纸'
                                }, {
                                    value: '湿巾/湿厕纸',
                                    label: '湿巾/湿厕纸'
                                }, {
                                    value: '厨房用纸',
                                    label: '厨房用纸'
                                }
                            ]
                        }, {
                            value: '家庭清洁',
                            label: '家庭清洁',
                            children: [
                                {
                                    value: '洗衣粉',
                                    label: '洗衣粉'
                                }, {
                                    value: '洗衣液',
                                    label: '洗衣液'
                                }, {
                                    value: '洗衣皂',
                                    label: '洗衣皂'
                                }, {
                                    value: '柔顺护理',
                                    label: '柔顺护理'
                                }, {
                                    value: '室内净化',
                                    label: '室内净化'
                                }, {
                                    value: '油污/洗洁精',
                                    label: '油污/洗洁精'
                                }, {
                                    value: '消毒除菌',
                                    label: '消毒除菌'
                                }, {
                                    value: '驱蚊/灭虫',
                                    label: '驱蚊/灭虫'
                                }, {
                                    value: '皮具护理',
                                    label: '皮具护理'
                                }
                            ]
                        },{
                            value: '居家日用',
                            label: '居家日用',
                            children: [
                                {
                                    value: '收纳洗晒',
                                    label: '收纳洗晒'
                                }, {
                                    value: '拖鞋',
                                    label: '拖鞋'
                                }, {
                                    value: '雨具/伞具',
                                    label: '雨具/伞具'
                                }, {
                                    value: '浴室用品',
                                    label: '浴室用品'
                                }, {
                                    value: '清洁用品',
                                    label: '清洁用品'
                                }, {
                                    value: '垃圾桶',
                                    label: '垃圾桶'
                                }, {
                                    value: '保暖防护',
                                    label: '保暖防护'
                                }, {
                                    value: '拖把扫把',
                                    label: '拖把扫把'
                                }, {
                                    value: '简易家具',
                                    label: '简易家具'
                                },{
                                    value: '日用杂货',
                                    label: '日用杂货'
                                }
                            ]
                        },{
                            value: '家纺用品',
                            label: '家纺用品',
                            children: [
                                {
                                    value: '毛巾',
                                    label: '毛巾'
                                }, {
                                    value: '浴巾',
                                    label: '浴巾'
                                }, {
                                    value: '居家枕垫',
                                    label: '居家枕垫'
                                }, {
                                    value: '床上用品套装',
                                    label: '床上用品套装'
                                }, {
                                    value: '枕头/枕芯',
                                    label: '枕头/枕芯'
                                }, {
                                    value: '被子/被芯',
                                    label: '被子/被芯'
                                }, {
                                    value: '枕套/枕巾',
                                    label: '枕套/枕巾'
                                }, {
                                    value: '被单被罩',
                                    label: '被单被罩'
                                }, {
                                    value: '毛巾被/毛毯',
                                    label: '毛巾被/毛毯'
                                },{
                                    value: '凉席/枕席/蚊帐',
                                    label: '凉席/枕席/蚊帐'
                                },{
                                    value: '电热毯',
                                    label: '电热毯'
                                }
                            ]
                        },{
                            value: '厨具用品',
                            label: '厨具用品',
                            children: [
                                {
                                    value: '餐具茶具',
                                    label: '餐具茶具'
                                }, {
                                    value: '刀剪菜板',
                                    label: '刀剪菜板'
                                }, {
                                    value: '水具酒具',
                                    label: '水具酒具'
                                }, {
                                    value: '烹饪锅具',
                                    label: '烹饪锅具'
                                }, {
                                    value: '厨房杂物',
                                    label: '厨房杂物'
                                }
                            ]
                        },{
                            value: '一次性用品',
                            label: '一次性用品',
                            children: [
                                {
                                    value: '日用/清洁',
                                    label: '日用/清洁'
                                }, {
                                    value: '计生用品',
                                    label: '计生用品'
                                }
                            ]
                        },{
                            value: '家用五金',
                            label: '家用五金',
                            children: [
                                {
                                    value: '插座/开关',
                                    label: '插座/开关'
                                }, {
                                    value: '灯饰照明',
                                    label: '灯饰照明'
                                }, {
                                    value: '电池',
                                    label: '电池'
                                }, {
                                    value: '灭蚊灯/拍',
                                    label: '灭蚊灯/拍'
                                }, {
                                    value: '五金配件',
                                    label: '五金配件'
                                }, {
                                    value: '手动工具',
                                    label: '手动工具'
                                }
                            ]
                        },{
                            value: '体育用品',
                            label: '体育用品',
                            children: [
                                {
                                    value: '球类运动',
                                    label: '球类运动'
                                }, {
                                    value: '轮滑系列',
                                    label: '轮滑系列'
                                }, {
                                    value: '健身器材',
                                    label: '健身器材'
                                }
                            ]
                        },{
                            value: '汽车用品',
                            label: '汽车用品',
                            children: [
                                {
                                    value: '保养/清洁',
                                    label: '保养/清洁'
                                }, {
                                    value: '汽车装饰',
                                    label: '汽车装饰'
                                }, {
                                    value: '车载用品',
                                    label: '车载用品'
                                }
                            ]
                        },{
                            value: '宠物园艺',
                            label: '宠物园艺',
                            children: [
                                {
                                    value: '宠物生活',
                                    label: '宠物生活'
                                }, {
                                    value: '园艺绿植',
                                    label: '园艺绿植'
                                }
                            ]
                        }

                        ]
                    },{
                        value: '母婴玩具',
                        label: '母婴玩具',
                        children: [{
                            value: '童装童鞋',
                            label: '童装童鞋',
                            children: [
                                {
                                    value: '套装/礼盒',
                                    label: '套装/礼盒'
                                }, {
                                    value: '帽/袜',
                                    label: '帽/袜'
                                }, {
                                    value: '配饰',
                                    label: '配饰'
                                }, {
                                    value: 'T恤/衬衫/针织衫',
                                    label: 'T恤/衬衫/针织衫'
                                }, {
                                    value: '毛衣',
                                    label: '毛衣'
                                },{
                                    value: '棉服/羽绒服',
                                    label: '棉服/羽绒服'
                                }, {
                                    value: '裙子',
                                    label: '裙子'
                                }, {
                                    value: '裤子',
                                    label: '裤子'
                                }, {
                                    value: '童鞋',
                                    label: '童鞋'
                                }, {
                                    value: '外套',
                                    label: '外套'
                                }, {
                                    value: '内衣裤',
                                    label: '内衣裤'
                                }
                            ]
                        },{
                            value: '喂养用品',
                            label: '喂养用品',
                            children: [
                                {
                                    value: '婴儿奶瓶',
                                    label: '婴儿奶瓶'
                                }, {
                                    value: '奶嘴/安抚奶嘴',
                                    label: '奶嘴/安抚奶嘴'
                                }, {
                                    value: '水壶/水杯',
                                    label: '水壶/水杯'
                                }, {
                                    value: '宝宝餐具',
                                    label: '宝宝餐具'
                                }, {
                                    value: '牙胶/固齿',
                                    label: '牙胶/固齿'
                                }, {
                                    value: '暖奶消毒/料理',
                                    label: '暖奶消毒/料理'
                                }, {
                                    value: '辅助配件',
                                    label: '辅助配件'
                                }
                            ]
                        },{
                            value: '儿童玩具',
                            label: '儿童玩具',
                            children: [
                                {
                                    value: '健身运动',
                                    label: '健身运动'
                                }, {
                                    value: '情景玩具',
                                    label: '情景玩具'
                                }, {
                                    value: '益智玩具',
                                    label: '益智玩具'
                                }, {
                                    value: '毛绒玩具',
                                    label: '毛绒玩具'
                                }, {
                                    value: '音乐玩具',
                                    label: '音乐玩具'
                                }, {
                                    value: '遥控/模型',
                                    label: '遥控/模型'
                                }
                            ]
                        },{
                            value: '营养辅食',
                            label: '营养辅食',
                            children: [
                                {
                                    value: '米粉/菜粉',
                                    label: '米粉/菜粉'
                                }, {
                                    value: '果泥/果汁',
                                    label: '果泥/果汁'
                                }, {
                                    value: '益生菌/初乳',
                                    label: '益生菌/初乳'
                                }, {
                                    value: '清火/开胃',
                                    label: '清火/开胃'
                                }, {
                                    value: '营养面/粥',
                                    label: '营养面/粥'
                                }, {
                                    value: '宝宝零食',
                                    label: '宝宝零食'
                                }
                            ]
                        },{
                            value: '洗护用品',
                            label: '洗护用品',
                            children: [
                                {
                                    value: '牙膏/牙刷',
                                    label: '牙膏/牙刷'
                                }, {
                                    value: '洗发/沐浴',
                                    label: '洗发/沐浴'
                                }, {
                                    value: '日常护理',
                                    label: '日常护理'
                                }, {
                                    value: '宝宝护肤',
                                    label: '宝宝护肤'
                                }, {
                                    value: '礼盒套装',
                                    label: '礼盒套装'
                                },{
                                    value: '驱蚊防虫',
                                    label: '驱蚊防虫'
                                }, {
                                    value: '坐便器',
                                    label: '坐便器'
                                }, {
                                    value: '洗衣液/皂',
                                    label: '洗衣液/皂'
                                }, {
                                    value: '理发器',
                                    label: '理发器'
                                }
                            ]
                        },{
                            value: '妈妈专区',
                            label: '妈妈专区',
                            children: [
                                {
                                    value: '孕期营养',
                                    label: '孕期营养'
                                }, {
                                    value: '孕产护理',
                                    label: '孕产护理'
                                }
                            ]
                        },{
                            value: '尿裤湿巾',
                            label: '尿裤湿巾',
                            children: [
                                {
                                    value: '婴儿湿巾',
                                    label: '婴儿湿巾'
                                }, {
                                    value: '纸尿裤',
                                    label: '纸尿裤'
                                }, {
                                    value: '纸尿片/防尿垫巾',
                                    label: '纸尿片/防尿垫巾'
                                }, {
                                    value: '拉拉裤',
                                    label: '拉拉裤'
                                }, {
                                    value: '成人尿裤',
                                    label: '成人尿裤'
                                }
                            ]
                        },{
                            value: '车床寝具',
                            label: '车床寝具',
                            children: [
                                {
                                    value: '手推车',
                                    label: '手推车'
                                }, {
                                    value: '学步车',
                                    label: '学步车'
                                }, {
                                    value: '三轮车',
                                    label: '三轮车'
                                },{
                                    value: '电动车',
                                    label: '电动车'
                                }, {
                                    value: '扭扭车/滑板车',
                                    label: '扭扭车/滑板车'
                                }, {
                                    value: '自行车',
                                    label: '自行车'
                                },{
                                    value: '婴童床',
                                    label: '婴童床'
                                }, {
                                    value: '餐椅/摇椅',
                                    label: '餐椅/摇椅'
                                }, {
                                    value: '安全座椅',
                                    label: '安全座椅'
                                }
                            ]
                        },{
                            value: '婴儿奶粉',
                            label: '婴儿奶粉',
                            children: [
                                {
                                    value: '4段奶粉',
                                    label: '4段奶粉'
                                }, {
                                    value: '特殊配方奶粉',
                                    label: '特殊配方奶粉'
                                }, {
                                    value: '1段奶粉',
                                    label: '1段奶粉'
                                }, {
                                    value: '2段奶粉',
                                    label: '2段奶粉'
                                }, {
                                    value: '3段奶粉',
                                    label: '3段奶粉'
                                }
                            ]
                        }]
                    },{
                        value: '美妆洗护',
                        label: '美妆洗护',
                        children: [{
                            value: '洗发护发',
                            label: '洗发护发',
                            children: [
                                {
                                    value: '洗发水',
                                    label: '洗发水'
                                }, {
                                    value: '护法素/发膜',
                                    label: '护法素/发膜'
                                }, {
                                    value: '染发烫发',
                                    label: '染发烫发'
                                }, {
                                    value: '头发造型',
                                    label: '头发造型'
                                }, {
                                    value: '洗护套装',
                                    label: '洗护套装'
                                }
                            ]
                        }, {
                            value: '女性护理',
                            label: '女性护理',
                            children: [
                                {
                                    value: '卫生巾',
                                    label: '卫生巾'
                                }, {
                                    value: '卫生护垫',
                                    label: '卫生护垫'
                                }, {
                                    value: '卫生棉条',
                                    label: '卫生棉条'
                                }, {
                                    value: '私处护理',
                                    label: '私处护理'
                                }
                            ]
                        },{
                            value: '香水彩妆',
                            label: '香水彩妆',
                            children: [
                                {
                                    value: '隔离霜/妆前乳',
                                    label: '隔离霜/妆前乳'
                                }, {
                                    value: '气垫BB',
                                    label: '气垫BB'
                                }, {
                                    value: '遮瑕/BB霜',
                                    label: '遮瑕/BB霜'
                                }, {
                                    value: '粉饼/散粉',
                                    label: '粉饼/散粉'
                                }, {
                                    value: '腮红/胭脂',
                                    label: '腮红/胭脂'
                                }, {
                                    value: '睫毛膏',
                                    label: '睫毛膏'
                                }, {
                                    value: '口红/唇彩',
                                    label: '口红/唇彩'
                                }, {
                                    value: '眉笔/眉粉',
                                    label: '眉笔/眉粉'
                                }, {
                                    value: '美容工具/包',
                                    label: '美容工具/包'
                                },{
                                    value: '粉底液/粉底霜',
                                    label: '粉底液/粉底霜'
                                },{
                                    value: '美甲',
                                    label: '美甲'
                                },{
                                    value: '香水',
                                    label: '香水'
                                },{
                                    value: '眼影/眼线',
                                    label: '眼影/眼线'
                                }
                            ]
                        },{
                            value: '口腔护理',
                            label: '口腔护理',
                            children: [
                                {
                                    value: '牙膏',
                                    label: '牙膏'
                                }, {
                                    value: '牙刷',
                                    label: '牙刷'
                                }, {
                                    value: '其他洁牙用品',
                                    label: '其他洁牙用品'
                                }
                            ]
                        },{
                            value: '男士护肤',
                            label: '男士护肤',
                            children: [
                                {
                                    value: '剃须护理',
                                    label: '剃须护理'
                                }
                            ]
                        },{
                            value: '身体护理',
                            label: '身体护理',
                            children: [
                                {
                                    value: '香皂',
                                    label: '香皂'
                                }, {
                                    value: '洗手液',
                                    label: '洗手液'
                                },{
                                    value: '沐浴露',
                                    label: '沐浴露'
                                }, {
                                    value: '止汗走珠',
                                    label: '止汗走珠'
                                },{
                                    value: '脱毛膏/刀',
                                    label: '脱毛膏/刀'
                                }, {
                                    value: '身体保养',
                                    label: '身体保养'
                                }
                            ]
                        },{
                            value: '面部护理',
                            label: '面部护理',
                            children: [
                                {
                                    value: '防晒',
                                    label: '防晒'
                                }, {
                                    value: '爽肤水/化妆水',
                                    label: '爽肤水/化妆水'
                                }, {
                                    value: '乳液/面霜',
                                    label: '乳液/面霜'
                                }, {
                                    value: '精华/肌底液',
                                    label: '精华/肌底液'
                                }, {
                                    value: '洁面',
                                    label: '洁面'
                                }, {
                                    value: '面膜',
                                    label: '面膜'
                                },{
                                    value: '眼霜',
                                    label: '眼霜'
                                }, {
                                    value: '护肤礼盒',
                                    label: '护肤礼盒'
                                }, {
                                    value: '润唇膏',
                                    label: '润唇膏'
                                }, {
                                    value: '卸妆',
                                    label: '卸妆'
                                }, {
                                    value: 'T区护理',
                                    label: 'T区护理'
                                }
                            ]
                        }]
                    },{
                        value: '珠宝礼品',
                        label: '珠宝礼品',
                        children: [{
                            value: '铂金',
                            label: '铂金',
                            children: [
                                {
                                    value: '铂金吊坠/项链',
                                    label: '铂金吊坠/项链'
                                }, {
                                    value: '铂金手镯/手链/脚链',
                                    label: '铂金手镯/手链/脚链'
                                }, {
                                    value: '铂金戒指',
                                    label: '铂金戒指'
                                }, {
                                    value: '铂金耳饰',
                                    label: '铂金耳饰'
                                }, {
                                    value: '摆件',
                                    label: '摆件'
                                },{
                                    value: '套件',
                                    label: '套件'
                                }
                            ]
                        }, {
                            value: '收藏品',
                            label: '收藏品',
                            children: [
                                {
                                    value: '金银收藏',
                                    label: '金银收藏'
                                }
                            ]
                        },{
                            value: '钟/表',
                            label: '钟/表',
                            children: [
                                {
                                    value: '手表',
                                    label: '手表'
                                }, {
                                    value: '挂钟/闹钟',
                                    label: '挂钟/闹钟'
                                }
                            ]
                        },{
                            value: '银饰',
                            label: '银饰',
                            children: [
                                {
                                    value: '银吊坠/项链',
                                    label: '银吊坠/项链'
                                }, {
                                    value: '银手镯/手链/脚链',
                                    label: '银手镯/手链/脚链'
                                }, {
                                    value: '银戒指',
                                    label: '银戒指'
                                }, {
                                    value: '银耳饰',
                                    label: '银耳饰'
                                }, {
                                    value: '摆件',
                                    label: '摆件'
                                }, {
                                    value: '套件',
                                    label: '套件'
                                }, {
                                    value: '宝宝银饰',
                                    label: '宝宝银饰'
                                }, {
                                    value: '银条/银砖/银币',
                                    label: '银条/银砖/银币'
                                }
                            ]
                        },{
                            value: '配饰/礼品',
                            label: '配饰/礼品',
                            children: [
                                {
                                    value: '打火机/烟类用品',
                                    label: '打火机/烟类用品'
                                }, {
                                    value: '相架/相框',
                                    label: '相架/相框'
                                }, {
                                    value: '摆件/钥匙扣',
                                    label: '摆件/钥匙扣'
                                }, {
                                    value: '时尚饰品',
                                    label: '时尚饰品'
                                }
                            ]
                        },{
                            value: '黄金/K金',
                            label: '黄金/K金',
                            children: [
                                {
                                    value: '吊坠/项链',
                                    label: '吊坠/项链'
                                }, {
                                    value: '手镯/手链/脚链',
                                    label: '手镯/手链/脚链'
                                },{
                                    value: '戒指',
                                    label: '戒指'
                                }, {
                                    value: '耳饰',
                                    label: '耳饰'
                                },{
                                    value: '摆件',
                                    label: '摆件'
                                }, {
                                    value: '套件',
                                    label: '套件'
                                },{
                                    value: '宝宝饰品',
                                    label: '宝宝饰品'
                                }, {
                                    value: '金条/金砖/金币',
                                    label: '金条/金砖/金币'
                                }
                            ]
                        },{
                            value: '珠宝饰品',
                            label: '珠宝饰品',
                            children: [
                                {
                                    value: '金银饰品',
                                    label: '金银饰品'
                                }, {
                                    value: '玉石饰品',
                                    label: '玉石饰品'
                                }, {
                                    value: '钻石饰品',
                                    label: '钻石饰品'
                                }, {
                                    value: '水晶饰品',
                                    label: '水晶饰品'
                                }, {
                                    value: '琥珀/玛瑙饰品',
                                    label: '琥珀/玛瑙饰品'
                                }, {
                                    value: '珍珠饰品',
                                    label: '珍珠饰品'
                                }, {
                                    value: '木手串把件',
                                    label: '木手串把件'
                                }
                            ]
                        }]
                    },{
                        value: '服装内衣',
                        label: '服装内衣',
                        children: [{
                            value: '女装',
                            label: '女装',
                            children: [
                                {
                                    value: '羽绒服/棉服',
                                    label: '羽绒服/棉服'
                                }, {
                                    value: '风衣/大衣',
                                    label: '风衣/大衣'
                                }, {
                                    value: '马甲/背心',
                                    label: '马甲/背心'
                                }, {
                                    value: '衬衫',
                                    label: '衬衫'
                                }, {
                                    value: '毛衣',
                                    label: '毛衣'
                                },{
                                    value: '运动装',
                                    label: '运动装'
                                }, {
                                    value: '牛仔裤/休闲裤',
                                    label: '牛仔裤/休闲裤'
                                }, {
                                    value: '裙子',
                                    label: '裙子'
                                }, {
                                    value: 'T恤/针织衫',
                                    label: 'T恤/针织衫'
                                }, {
                                    value: '西装/套装',
                                    label: '西装/套装'
                                }
                            ]
                        }, {
                            value: '内衣',
                            label: '内衣',
                            children: [
                                {
                                    value: '文胸',
                                    label: '文胸'
                                }, {
                                    value: '睡衣/家居服',
                                    label: '睡衣/家居服'
                                }, {
                                    value: '保暖内衣',
                                    label: '保暖内衣'
                                }, {
                                    value: '背心/吊带',
                                    label: '背心/吊带'
                                }, {
                                    value: '塑身美体',
                                    label: '塑身美体'
                                }, {
                                    value: '男袜',
                                    label: '男袜'
                                }, {
                                    value: '女袜',
                                    label: '女袜'
                                }, {
                                    value: '女士内裤',
                                    label: '女士内裤'
                                }, {
                                    value: '男士内裤',
                                    label: '男士内裤'
                                }, {
                                    value: '泳衣/裤',
                                    label: '泳衣/裤'
                                }, {
                                    value: '秋衣/秋裤',
                                    label: '秋衣/秋裤'
                                }
                            ]
                        },{
                            value: '男装',
                            label: '男装',
                            children: [
                                {
                                    value: '棉服/羽绒服',
                                    label: '棉服/羽绒服'
                                }, {
                                    value: '风衣/大衣',
                                    label: '风衣/大衣'
                                }, {
                                    value: '夹克',
                                    label: '夹克'
                                }, {
                                    value: 'T恤/针织衫',
                                    label: 'T恤/针织衫'
                                }, {
                                    value: '牛仔裤/休闲裤',
                                    label: '牛仔裤/休闲裤'
                                }, {
                                    value: '衬衫',
                                    label: '衬衫'
                                }, {
                                    value: '毛衣',
                                    label: '毛衣'
                                }, {
                                    value: '马甲/背心',
                                    label: '马甲/背心'
                                }, {
                                    value: '西装/套装',
                                    label: '西装/套装'
                                },{
                                    value: '运动装',
                                    label: '运动装'
                                }
                            ]
                        },{
                            value: '户外',
                            label: '户外',
                            children: [
                                {
                                    value: '配件/装备',
                                    label: '配件/装备'
                                }
                            ]
                        }

                        ]
                    },{
                        value: '鞋包配饰',
                        label: '鞋包配饰',
                        children: [{
                            value: '男鞋',
                            label: '男鞋',
                            children: [
                                {
                                    value: '正装鞋',
                                    label: '正装鞋'
                                }, {
                                    value: '休闲鞋',
                                    label: '休闲鞋'
                                }, {
                                    value: '凉鞋',
                                    label: '凉鞋'
                                }, {
                                    value: '棉鞋',
                                    label: '棉鞋'
                                }, {
                                    value: '男靴',
                                    label: '男靴'
                                }, {
                                    value: '运动鞋',
                                    label: '运动鞋'
                                }, {
                                    value: '帆布鞋',
                                    label: '帆布鞋'
                                }
                            ]
                        }, {
                            value: '功能箱包',
                            label: '功能箱包',
                            children: [
                                {
                                    value: '电脑包',
                                    label: '电脑包'
                                }, {
                                    value: '拉杆箱/包',
                                    label: '拉杆箱/包'
                                }, {
                                    value: '腰包/胸包',
                                    label: '腰包/胸包'
                                }, {
                                    value: '登山/旅行包',
                                    label: '登山/旅行包'
                                }, {
                                    value: '证件包/卡包',
                                    label: '证件包/卡包'
                                }
                            ]
                        },{
                            value: '女包',
                            label: '女包',
                            children: [
                                {
                                    value: '手提包',
                                    label: '手提包'
                                }, {
                                    value: '单肩包',
                                    label: '单肩包'
                                }, {
                                    value: '双肩包',
                                    label: '双肩包'
                                }, {
                                    value: '钱包/手拿包',
                                    label: '钱包/手拿包'
                                }, {
                                    value: '休闲包',
                                    label: '休闲包'
                                }
                            ]
                        },{
                            value: '配饰',
                            label: '配饰',
                            children: [
                                {
                                    value: '丝巾/围巾',
                                    label: '丝巾/围巾'
                                }, {
                                    value: '帽子',
                                    label: '帽子'
                                }, {
                                    value: '男士腰带',
                                    label: '男士腰带'
                                }, {
                                    value: '女士腰带',
                                    label: '女士腰带'
                                }, {
                                    value: '手套',
                                    label: '手套'
                                }, {
                                    value: '耳罩',
                                    label: '耳罩'
                                }, {
                                    value: '领带',
                                    label: '领带'
                                }, {
                                    value: '太阳镜',
                                    label: '太阳镜'
                                }
                            ]
                        },{
                            value: '女鞋',
                            label: '女鞋',
                            children: [
                                {
                                    value: '凉鞋',
                                    label: '凉鞋'
                                }, {
                                    value: '棉鞋',
                                    label: '棉鞋'
                                }, {
                                    value: '皮鞋',
                                    label: '皮鞋'
                                }, {
                                    value: '休闲鞋',
                                    label: '休闲鞋'
                                }, {
                                    value: '单鞋',
                                    label: '单鞋'
                                },{
                                    value: '雪地靴',
                                    label: '雪地靴'
                                }, {
                                    value: '靴子',
                                    label: '靴子'
                                }, {
                                    value: '运动鞋',
                                    label: '运动鞋'
                                }, {
                                    value: '帆布鞋',
                                    label: '帆布鞋'
                                }
                            ]
                        },{
                            value: '男包',
                            label: '男包',
                            children: [
                                {
                                    value: '手提包',
                                    label: '手提包'
                                }, {
                                    value: '单肩包',
                                    label: '单肩包'
                                },{
                                    value: '双肩包',
                                    label: '双肩包'
                                }, {
                                    value: '钱包/手拿包',
                                    label: '钱包/手拿包'
                                }, {
                                    value: '休闲包',
                                    label: '休闲包'
                                }
                            ]
                        }

                        ]
                    },{
                        value: '手机数码',
                        label: '手机数码',
                        children: [{
                            value: '摄影摄像',
                            label: '摄影摄像',
                            children: [
                                {
                                    value: '数码相机',
                                    label: '数码相机'
                                }, {
                                    value: '单反相机',
                                    label: '单反相机'
                                }, {
                                    value: '摄像机',
                                    label: '摄像机'
                                }, {
                                    value: '摄录配件',
                                    label: '摄录配件'
                                }
                            ]
                        }, {
                            value: '影音娱乐',
                            label: '影音娱乐',
                            children: [
                                {
                                    value: '音箱/音响',
                                    label: '音箱/音响'
                                }, {
                                    value: '收音机',
                                    label: '收音机'
                                }, {
                                    value: '耳机/耳麦',
                                    label: '耳机/耳麦'
                                }, {
                                    value: '麦克风',
                                    label: '麦克风'
                                }
                            ]
                        },{
                            value: '手机通讯',
                            label: '手机通讯',
                            children: [
                                {
                                    value: '智能手机',
                                    label: '智能手机'
                                }, {
                                    value: '老年机',
                                    label: '老年机'
                                }, {
                                    value: '手机配件',
                                    label: '手机配件'
                                }
                            ]
                        },{
                            value: '智能设备',
                            label: '智能设备',
                            children: [
                                {
                                    value: '智能家居',
                                    label: '智能家居'
                                }, {
                                    value: '电子/教育',
                                    label: '电子/教育'
                                }
                            ]
                        }]
                    },{
                        value: '电脑办公',
                        label: '电脑办公',
                        children: [{
                            value: '学生用品',
                            label: '学生用品',
                            children: [
                                {
                                    value: '练习本/簿',
                                    label: '练习本/簿'
                                }, {
                                    value: '书写工具',
                                    label: '书写工具'
                                }, {
                                    value: '书包文具',
                                    label: '书包文具'
                                }, {
                                    value: '画具画材',
                                    label: '画具画材'
                                }, {
                                    value: '剪裁/粘贴',
                                    label: '剪裁/粘贴'
                                }, {
                                    value: '学生其他用品',
                                    label: '学生其他用品'
                                }
                            ]
                        }, {
                            value: '网络/游戏',
                            label: '网络/游戏',
                            children: [
                                {
                                    value: '网络产品',
                                    label: '网络产品'
                                }, {
                                    value: '游戏设配',
                                    label: '游戏设配'
                                }
                            ]
                        },{
                            value: '电脑整机',
                            label: '电脑整机',
                            children: [
                                {
                                    value: '台式机',
                                    label: '台式机'
                                }, {
                                    value: '笔记本',
                                    label: '笔记本'
                                }, {
                                    value: '平板电脑',
                                    label: '平板电脑'
                                }
                            ]
                        },{
                            value: '办公用品',
                            label: '办公用品',
                            children: [
                                {
                                    value: '办公设备',
                                    label: '办公设备'
                                }, {
                                    value: '办公耗材',
                                    label: '办公耗材'
                                }, {
                                    value: '办公文具',
                                    label: '办公文具'
                                }
                            ]
                        },{
                            value: '电脑配件',
                            label: '电脑配件',
                            children: [
                                {
                                    value: '装机配件',
                                    label: '装机配件'
                                }, {
                                    value: '外设产品',
                                    label: '外设产品'
                                }
                            ]
                        }]
                    },{
                        value: '家用电器',
                        label: '家用电器',
                        children: [{
                            value: '厨房小电',
                            label: '厨房小电',
                            children: [
                                {
                                    value: '电水壶/热水瓶',
                                    label: '电水壶/热水瓶'
                                }, {
                                    value: '豆浆机',
                                    label: '豆浆机'
                                }, {
                                    value: '料理机',
                                    label: '料理机'
                                }, {
                                    value: '榨汁机/原汁机',
                                    label: '榨汁机/原汁机'
                                }, {
                                    value: '电饼铛',
                                    label: '电饼铛'
                                },{
                                    value: '微波炉',
                                    label: '微波炉'
                                }, {
                                    value: '电烤箱',
                                    label: '电烤箱'
                                }, {
                                    value: '电压力锅',
                                    label: '电压力锅'
                                }, {
                                    value: '电饭煲',
                                    label: '电饭煲'
                                }, {
                                    value: '电磁炉',
                                    label: '电磁炉'
                                },{
                                    value: '面包机/多士炉',
                                    label: '面包机/多士炉'
                                }, {
                                    value: '煮蛋器/酸奶机',
                                    label: '煮蛋器/酸奶机'
                                }, {
                                    value: '电火锅/蒸锅',
                                    label: '电火锅/蒸锅'
                                }, {
                                    value: '咖啡机/壶',
                                    label: '咖啡机/壶'
                                }, {
                                    value: '其他小电',
                                    label: '其他小电'
                                }
                            ]
                        }, {
                            value: '大家电',
                            label: '大家电',
                            children: [
                                {
                                    value: '电视',
                                    label: '电视'
                                }, {
                                    value: '空调',
                                    label: '空调'
                                }, {
                                    value: '洗衣机',
                                    label: '洗衣机'
                                }, {
                                    value: '冰箱',
                                    label: '冰箱'
                                }, {
                                    value: '冷柜/冰吧',
                                    label: '冷柜/冰吧'
                                }, {
                                    value: '影音播放器',
                                    label: '影音播放器'
                                }
                            ]
                        },{
                            value: '生活电器',
                            label: '生活电器',
                            children: [
                                {
                                    value: '吸尘器',
                                    label: '吸尘器'
                                }, {
                                    value: '饮水机',
                                    label: '饮水机'
                                }, {
                                    value: '净水设备',
                                    label: '净水设备'
                                }, {
                                    value: '空调扇',
                                    label: '空调扇'
                                }, {
                                    value: '电风扇',
                                    label: '电风扇'
                                }, {
                                    value: '取暖器',
                                    label: '取暖器'
                                }, {
                                    value: '加湿器',
                                    label: '加湿器'
                                }, {
                                    value: '除湿机',
                                    label: '除湿机'
                                }, {
                                    value: '挂烫机/电熨斗',
                                    label: '挂烫机/电熨斗'
                                },{
                                    value: '净化器',
                                    label: '净化器'
                                },{
                                    value: '毛球修剪器',
                                    label: '毛球修剪器'
                                }
                            ]
                        },{
                            value: '厨卫大电',
                            label: '厨卫大电',
                            children: [
                                {
                                    value: '油烟机',
                                    label: '油烟机'
                                }, {
                                    value: '打火灶',
                                    label: '打火灶'
                                }, {
                                    value: '烟灶套餐',
                                    label: '烟灶套餐'
                                }, {
                                    value: '消毒柜/洗碗机',
                                    label: '消毒柜/洗碗机'
                                }, {
                                    value: '热水器',
                                    label: '热水器'
                                }, {
                                    value: '洁身器',
                                    label: '洁身器'
                                }
                            ]
                        },{
                            value: '个护健康',
                            label: '个护健康',
                            children: [
                                {
                                    value: '理发器',
                                    label: '理发器'
                                }, {
                                    value: '剃/脱毛器',
                                    label: '剃/脱毛器'
                                }, {
                                    value: '足浴盆',
                                    label: '足浴盆'
                                }, {
                                    value: '按摩器',
                                    label: '按摩器'
                                }, {
                                    value: '电子秤/厨房秤',
                                    label: '电子秤/厨房秤'
                                },{
                                    value: '口腔护理',
                                    label: '口腔护理'
                                }, {
                                    value: '其他健康仪器',
                                    label: '其他健康仪器'
                                }, {
                                    value: '剃须刀',
                                    label: '剃须刀'
                                }, {
                                    value: '电吹风',
                                    label: '电吹风'
                                }, {
                                    value: '美容美发器',
                                    label: '美容美发器'
                                }
                            ]
                        }]
                    },{
                        value: '鲜花绿植',
                        label: '鲜花绿植',
                    }],
                    tableData: [{
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市'
                        }, {
                        date: '2016-05-04',
                        name: '李玉莲',
                        address: '陕西省'
                        }, {
                        date: '2016-05-01',
                        name: '包贝尔',
                        address: '山东省'
                        }, {
                        date: '2016-05-03',
                        name: '柳十三',
                        address: '海南省'
                        }],
                        currentRow: null
            }
        },
        methods:{
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            addItem () {
                this.dynamicItem.push({
                    propertyName: '',       /* 属性名 */
                    attributeValues: ''     /* 属性值 */
                })
            },
            handleEdit(index, row) {
                this.editVisible = true;
            },
            saveEdit() {
                this.editVisible = false;
            },
        }
    }
</script>  
<style lang="scss" scoped>
    .first{
        display:flex;
        margin-bottom:2vh;
        div{
            margin-left: 5vh;
        }
    }
    .second{
        display:flex;
        margin-bottom:2vh;
        div{
            margin-left: 5vh;
        }
    }
    .info{
        margin-left: 4vh;
        .left{
            padding-top:2vh;
            div {
                display:flex;
                margin:0.5vh  0;
                span{
                    width:15vh;
                    flex-direction: row-reverse;
                }
                .el-input{
                    flex-direction: row;
                }
            }
        }
        .right{
            margin-left:4vh;
            padding-top:1.5vh;
            div{
                margin: 0.5vh 0;
                display:flex;
                span{
                    width:15vh;
                }
                .first,.second,.three{
                    margin-top:-0.5vh
                }
            }
        }
    }
    .four{
        margin-top:2vh;
        .content{
            display:flex;
            overflow: hidden;
            padding: 3vh 1vh;
            .el-input{
                width:30vh
            }
        }
        .attribute{
            border-bottom:2px solid rgb(238,238,238);
            padding-bottom:1vh;
        }
        .el-checkbox{
            margin-left:2vh
        }
    }
    .five{
        margin-top:2vh;
        margin-left:2vh
    }
</style>