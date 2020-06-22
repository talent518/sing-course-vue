const path = require("path");
const webpack = require("webpack");
let AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const resolve = (dir) => path.join(__dirname, dir);

console.log(111, process.env.NODE_ENV);

const env = process.env.NODE_ENV || 'dev';
process.env.VUE_APP_ENV = env;
console.log(process.env.VUE_APP_ENV);
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
function isHaveParallelUglifyPlugin() {
  if (process.env.NODE_ENV === "prod") {

    console.log(222);

    plugins.push(
      new ParallelUglifyPlugin({
        // 传递给 UglifyJS 的参数
        // （还是使用 UglifyJS 压缩，只不过帮助开启了多进程）
        uglifyJS: {
          output: {
            beautify: false, // 最紧凑的输出
            comments: false, // 删除所有的注释
          },
          compress: {
            // 删除所有的 `console` 语句，可以兼容ie浏览器
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true,
          },
        },
      })
    );
  }
}

isHaveParallelUglifyPlugin();
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
