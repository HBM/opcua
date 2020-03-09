// import path from 'path'

const path = require('path')

module.exports = {
  mode: 'development',
  context: path.join(__dirname),
  entry: './index.ts',
  output: {
    filename: './bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }]
  }
}
