'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './lib/app.js',
  output: {
    filename: './public/js/app.bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
//# sourceMappingURL=webpack.config.js.map