module.exports = {
    baseUrl: './',
    productionSourceMap: false,
    changeOrigin:true,
    devServer: {
        proxy: {
            '/api':{
                target:'http://128.192.80.135',
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            },
        }
    }
}