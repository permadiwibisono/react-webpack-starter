const path=require('path');
var webpack=require('webpack');
var merge=require('webpack-merge');
var HtmlWebpackPlugin=require('html-webpack-plugin');
var InterpolateHtmlPlugin=require('interpolate-html-plugin');
var base = require('./webpack.base.config.js');
const PORT = 9000;
const PUBLIC_URL=`http://localhost:${PORT}`;

// definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.
var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

const config={
    output:{
        path:path.resolve('public'),
        publicPath:'/',
        filename:'bundles.[hash].js'
    },
    module:{
        rules:[
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
            ]}
        ]
    },
    plugins:[
        new InterpolateHtmlPlugin({
            'PUBLIC_URL':PUBLIC_URL
        }),

        new HtmlWebpackPlugin({
            template:path.resolve('public/index.html'),
            inject:true
        }),

        new webpack.HotModuleReplacementPlugin(),
        
        definePlugin
    ],
    devServer:{
        contentBase:'./public',
        port:PORT
    }
}
module.exports=merge(base,config);