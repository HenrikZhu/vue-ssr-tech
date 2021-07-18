const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'vue-ssr-tech',
      favicon: 'favicon.ico',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  output: {
    filename: '[name].[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          MiniCssExtractPlugin.loader,
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
    minimizer: [new CssMinimizerPlugin()],
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'vendor',
          chunks: 'all',
          minChunks: 1,
        },
      },
    },
  },
});
