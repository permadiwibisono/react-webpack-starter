const path = require('path');

module.exports={
  entry:path.resolve(__dirname, '../src/index.js'),
  production:{
    output:{
      path:path.resolve('build/assets'),
      publicPath:'/assets/',
      filename:'bundles.[chunkhash:8].js'
    },
    rootPath:path.resolve('/'),
    sourcePath:path.resolve('src'),
    staticPath:path.resolve('public'),
    buildPath:path.resolve('build'),
    templateHtml:path.resolve('public/index.html'),
  },
  development:{
    output:{
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
      filename: 'bundles.[hash:8].js'
    },
    templateHtml: path.resolve(__dirname, '../public/index.html'),
    port: 9000,
  },
  vendor:{
    filename: '[name].[hash:8].js'
  }
}