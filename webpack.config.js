const app=require('path');
var webpack=require('webpack');
var HtmlWebpackPlugin=require('html-webpack-plugin');
const config={
    entry:'./src/index.js',
    output:{
        path:`${__dirname}/public/`,
        publicPath:'/',
        filename:'bundle.js'
    },
    module:{
        rules:[
            {test:/\.json$/,loader:"json-loader"},
            {test:/\.css$/,use:[
                'style-loader',
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                      ident: 'postcss',
                      plugins: [
                          require('autoprefixer')
                      ]
                    }
                }
            ]},
            {test:/\.(png|svg|jpg|gif)$/,loader:"file-loader"},
            {test:/\.jsx?$/, exclude:/node_modules/, include:`${__dirname}/src/`, loader:"babel-loader"}
        ]
    },
    resolve:{
        extensions:['.js','.jsx']
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:`${__dirname}/public/index.html`,
            inject:true
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool:'source-map',
    devServer:{
        contentBase:'./public',
        port:9000
    }
}
module.exports=config;