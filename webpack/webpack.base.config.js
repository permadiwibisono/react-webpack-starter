var path = require('path');
var webpack=require('webpack');
const config = {
    entry:path.resolve('src/index.js'),
    module:{
        rules:[
            {test:/\.json$/,loader:"json-loader"},
            {test:/\.(png|svg|jpg|gif)$/,loader:"file-loader"},
            {test:/\.jsx?$/, exclude:/node_modules/, loader:"babel-loader"}
        ]
    },
    resolve:{
        extensions:['.js','.jsx']
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: 'vendors.[hash].js',
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.includes("node_modules");
            }
        })
    ],
    devtool:'source-map'
}
module.exports = config;