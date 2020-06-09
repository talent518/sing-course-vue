'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  context: path.resolve(__dirname, './'),
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      '@api': resolve('src/api'),
      '@util': resolve('src/util'),
      '@assets': resolve('src/assets'),
      '@components': resolve('src/components')
    }
  },
}