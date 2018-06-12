const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let path = require('path');
let parentDir = path.join(__dirname, '/client/src/');

const ASSET_PATH = process.env.ASSET_PATH || '/client/dist';

module.exports = {
  entry : './client/src/index.js' ,
   output: {
       path: path.resolve(__dirname, './'),
       filename: 'main.js',
   },
   module: {
       rules: [
           {
               test: /\.js?$/,
               exclude: /node_modules/,
               loader: 'babel-loader'
           },
           {
                 test: /\.css$/,
                 loaders: ["style-loader", "css-loader"]
               }
       ]
   },
   plugins: [
       new HtmlWebpackPlugin({
           template: './index.html',
           filename: 'index.html'
       })
   ]


 //  mode: 'development',
 //  entry: path.join(parentDir, 'index.js'),
 //  output: {
 //    path: path.join(__dirname, '/client/dist'),
 //    filename: 'vendor.js',
 //    publicPath: ASSET_PATH
 //  },
 //  module: {
 //    rules: [{
 //      test: /\.js$/,
 //      exclude: /node_modules/,
 //      loader: "babel-loader"
 //    }, {
 //      test: /\.css$/,
 //      loaders: ["style-loader", "css-loader"]
 //    }]
 //  },
 //
 //  devServer: {
 //   contentBase: path.join(__dirname, 'dist'),
 //   compress: true,
 //   port: 3000
 // },
 //
 //  plugins: [
 //    new HtmlWebpackPlugin({
 //      template: './index.html',
 //      filename: 'index.html'
 //    })
 //  ]
};
