var path=require('path');
var webpack=require('webpack');
var merge=require('webpack-merge');
var base = require('./webpack.base.config.js');

var HtmlWebpackPlugin=require('html-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var InterpolateHtmlPlugin=require('interpolate-html-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractCSS = new ExtractTextPlugin('styles.css');

// definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.
var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false')),
    __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

const config={
    output:{
        path:path.resolve('build/assets'),
        publicPath:'/assets/',
        filename:'bundles.[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    fallback: "style-loader",
                    use: ["css-loader",
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    require('autoprefixer')
                                ]
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(path.resolve('build'),{root:path.resolve('/')}),

        extractCSS,

        new CopyWebpackPlugin([{
            context: path.resolve('public'),
            from : '**/*',
            to : path.resolve('build')
        }],{ ignore:['*.html'] }),

        new InterpolateHtmlPlugin({
            'PUBLIC_URL':''
        }),

        new HtmlWebpackPlugin({
            template:path.resolve('public/index.html'),
            inject:true,
            filename:'../index.html'
        }),

        new UglifyJSPlugin({
            sourceMap:true
        }),

        definePlugin
    ]
}
module.exports=merge(base,config);