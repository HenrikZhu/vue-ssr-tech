const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const {VueLoaderPlugin} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'bundle.[hash:8].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '../docs',
    overlay: {
      errors: true,
    },
    hot: true,
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'vue-ssr-tech',
      favicon: 'favicon.ico',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {sourceMap: true},
          },
          'stylus-loader',
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
});
