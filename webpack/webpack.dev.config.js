const path=require('./path.js');
const webpack=require('webpack');
const merge=require('webpack-merge');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const InterpolateHtmlPlugin=require('interpolate-html-plugin');
const base = require('./webpack.base.config.js');
const autoprefixer = require('autoprefixer');

// definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.
const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

// console.log("PATHS: ", path);

const config = {
  mode: 'development',
  output:path.development.output,
  module: {
    rules: [
      {
        test:/\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                autoprefixer
              ]
            }
          }
        ]
      }
    ]
  },
  plugins:[
    // new InterpolateHtmlPlugin({ //Deprecated...
    //   'PUBLIC_URL':`http://localhost:${path.development.port}`
    // }),

    new HtmlWebpackPlugin({
      template:path.development.templateHtml,
      inject:true
    }),

    new webpack.HotModuleReplacementPlugin(),

    definePlugin
  ],
  devServer:{
    contentBase: './public',
    port: path.development.port
  }
}
// console.log('HASIL: ', merge(base, config))
module.exports=merge(base,config);