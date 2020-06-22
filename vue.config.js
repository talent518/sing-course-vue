const path = require("path");
const webpack = require("webpack");
let AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const resolve = (dir) => path.join(__dirname, dir);

console.log(process.env.NODE_ENV);

const env = process.env.NODE_ENV || 'dev';
process.env.VUE_APP_ENV = env;

let plugins = [];
// if (process.env.NODE_ENV !== "production") {
//   plugins = [
//     new webpack.DllReferencePlugin({
//       manifest: require("./dev/vendor/vendor-manifest.json"),
//     }),
//     new AddAssetHtmlPlugin({
//       // dll文件位置
//       filepath: path.resolve(__dirname, "./dev/vendor/*.js"),
//       // dll 引用路径
//       publicPath: "/vendor",
//       // dll最终输出的目录
//       outputPath: "/vendor",
//     }),
//   ];
// }

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@api", resolve("src/api"))
      .set("@util", resolve("src/util"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
  },
  productionSourceMap: false,
  configureWebpack: {
    devtool: "source-map",
    plugins,
  },
  devServer: {
    port: 8083
  }
};
