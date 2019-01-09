var path = require('./path.js');
var webpack=require('webpack');
const config = {
  entry:path.entry,
  module: {
      rules: [
        { test:/\.json$/,loader:"json-loader" },
        { test:/\.(eot?.+|ttf?.+|otf?.+|woff?.+|woff2?.+)$/,loader:"file-loader" },
        { test:/\.(png|svg|jpg|gif)$/,loader:"url-loader?limit=10000" },
        { test:/\.jsx?$/, exclude:/node_modules/, loader:"babel-loader" }
      ]
  },
  resolve:{
    extensions:['.js','.jsx']
  },
  plugins:[
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "vendor",
    //   filename: path.vendor.filename,
    //   minChunks: function (module) {
    //     // this assumes your vendor imports exist in the node_modules directory
    //     return module.context && module.context.includes("node_modules");
    //   }
    // })
  ],
  optimization:{
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          filename: path.vendor.filename,
          chunks: 'all'
        }
      }
    }
  },
  devtool:'source-map'
}
module.exports = config;