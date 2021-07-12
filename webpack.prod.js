const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: { sourceMap: true },
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
