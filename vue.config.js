module.exports = {
    // 基本路径
    publicPath: './',
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => { },
    configureWebpack: () => { },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores+
    parallel: require('os').cpus().length > 1,
    // webpack-dev-server 相关配置
    devServer: {
        open: true,
        host: '127.0.0.1',
        port: 8081,
        https: false,
        hotOnly: false,
        proxy: {
            '/api':{                        /* 后台其它接口 */
                target:'https://o2o.liqunshop.com/adminwebapi/api',               /* https://o2o.liqunshop.com/adminwebapi/api/Order/OrderMasterListGet */ 
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            },
            '/webapi':{                     /* 权限 */
                target:'https://o2o.liqunshop.com/framewebapi/api',                /* https://o2o.liqunshop.com/framewebapi/api/User/SysAppListGet */
                changeOrigin:true,
                pathRewrite:{
                    '/webapi':''
                }
            }
        }, // 设置代理
        before: app => { }
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    }
}
