const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.hbs$/,
        use: [{
          "loader": 'handlebars-loader',
          "options": { helperDirs: path.resolve(__dirname, 'helpers') }
        }]
      }
    ]
  }
};

module.exports = config;