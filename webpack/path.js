const path = require('path');

module.exports={
    entry:path.resolve('src/index.js'),
    production:{
        rootPath:path.resolve('/'),
        sourcePath:path.resolve('src'),
        staticSourcePath:path.resolve('public'),
        buildPath:path.resolve('build'),
        assetsPath:path.resolve('build/assets'),
        publicPath:'/assets/',
        templateHtml:path.resolve('public/index.html'),
        scripts:{
            filename:'bundles.[chunkhash:8].js'
        }
    },
    vendor:{
        filename:'vendors.[hash:8].js'
    }
}