const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'bundle.[hash:8].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    overlay: {
      errors: true,
    },
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          'vue-style-loader',
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
    minimize: true,
  },
});
