const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var SRC = path.resolve(__dirname, 'src/index.js');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './docs',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'C.C.SLC',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'docs'),
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.mtl$/,
        loader: 'mtl-loader'
      },
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl-loader'
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader'
      },
      {
        test: /\.wav$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
      },
      {
        test: /\.png$/,
        loader: 'url-loader',
      },
    ],
  },
};
