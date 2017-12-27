const path=require('path');
var webpack=require('webpack');
var HtmlWebpackPlugin=require('html-webpack-plugin');
var InterpolateHtmlPlugin=require('interpolate-html-plugin');

const PORT = 9000;
const PUBLIC_URL=`http://localhost:${PORT}`;

// definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.
var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

const config={
    entry:path.resolve('src/index.js'),
    output:{
        path:path.resolve('public'),
        publicPath:'/',
        filename:'bundles.js'
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
            {test:/\.jsx?$/, exclude:/node_modules/, loader:"babel-loader"}
        ]
    },
    resolve:{
        extensions:['.js','.jsx']
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
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: 'commons.js',
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.includes("node_modules");
            }
        }),
        definePlugin
    ],
    devtool:'source-map',
    devServer:{
        contentBase:'./public',
        port:PORT
    }
}
module.exports=config;