var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public/scripts');
var APP_DIR = path.resolve(__dirname, 'src/client');

var config = {
  entry: [
    APP_DIR + '/style.less',
    APP_DIR + '/index.js'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'index.js'
  },
  resolve: {
    modules: [APP_DIR, "node_modules"],
    extensions: ['.js', '.jsx', '.json']
  },
  module : {
    rules : [{
      test : /\.jsx?/,
      include : APP_DIR,
      loader : 'babel-loader',
      options: {
        presets: ['es2015', 'react', 'stage-2']
      }
    }, {
      test: /\.less$/,
      include : APP_DIR,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader", options: {
          sourceMap: true
        }
      }, {
        loader: "less-loader", options: {
          sourceMap: true
        }
      }]
    }]
  }
};

module.exports = config;