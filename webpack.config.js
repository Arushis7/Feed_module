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
};
