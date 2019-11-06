module.exports = {
    baseUrl: './',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api':{
                target:'https://o2o.liqunshop.com',
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            },
        }
    }
}