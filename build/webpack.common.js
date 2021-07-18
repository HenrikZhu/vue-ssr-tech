const path = require('path');

module.exports = {
  entry: {
    app: path.join(__dirname, '../client/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../docs'),
    assetModuleFilename: 'images/[name].[hash:8][ext][query]',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
      },
    ],
  },
};
