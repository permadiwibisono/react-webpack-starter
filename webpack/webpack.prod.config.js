var path=require('./path.js');
var webpack=require('webpack');
var merge=require('webpack-merge');
var base = require('./webpack.base.config.js');

var HtmlWebpackPlugin=require('html-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var InterpolateHtmlPlugin=require('interpolate-html-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var PreloadWebpackPlugin = require('preload-webpack-plugin');
var ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
var StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractCSS = new ExtractTextPlugin('styles.[chunkhash:8].css');

// definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.
var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false')),
    __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false')),
    'process.env.NODE_ENV': JSON.stringify('production')
});

const config={
    output:{
        path : path.production.assetsPath,
        publicPath : path.production.publicPath,
        filename : path.production.scripts.filename
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: extractCSS.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader:'css-loader',
                            options:{
                                minimize:true
                            }
                        },
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
        new CleanWebpackPlugin(path.production.buildPath,{root:path.production.rootPath}),
        
        // new webpack.optimize.ModuleConcatenationPlugin(),

        extractCSS,

        new CopyWebpackPlugin([{
            context: path.production.staticSourcePath,
            from : '**/*',
            to : path.production.buildPath
        }],{ ignore:['*.html'] }),

        new InterpolateHtmlPlugin({
            'PUBLIC_URL':''
        }),

        new webpack.HashedModuleIdsPlugin(),

        new HtmlWebpackPlugin({
            template:path.production.templateHtml,
            inject:true,
            filename:'../index.html',
            minify: {
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true
            }
        }),

        new UglifyJSPlugin({
            sourceMap:true,
            uglifyOptions:{
                ie8:true,
                compress: {
                    warnings: false,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true
                },
                output: {
                    comments: false
                }
            }
        }),
        
        // will initiate early, high-priority, and non-render-blocking fetch of a resource which will be used later on
        new PreloadWebpackPlugin({
            rel: 'preload',
            as: 'script',
            include: 'all',
            fileBlacklist: [/\.(css|map)$/, /base?.+/]
        }),

        //Add defer in script tags
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        }),

        // Change styles.[hash].css into inline styles in index.html
        new StyleExtHtmlWebpackPlugin({
            minify: true
        }),

        // Compress assets. In order for this to work we’ll also need to do modifications on your webserver config (e.g. Apache|Nginx). If the browser supports gzip that’s what he’ll receive.
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
            threshold: 10240,
            minRatio: 0.8
        }),

        definePlugin
    ],
    devtool: 'cheap-module-source-map',
}
module.exports=merge(base,config);