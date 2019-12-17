const CompressionWebpackPlugin = require("compression-webpack-plugin");
module.exports = {
  productionSourceMap: false, // build时不生成.map文件
  configureWebpack: config => {
    // 配置CDN加速
    // config.externals = {
    //   vue: "Vue",
    //   "vue-router": "VueRouter",
    //   axios: "axios",
    //   "element-ui": "ELEMENT",
    //   Vuex: "Vuex"
    // };
    // 生产环境才生效
    // if (process.env.NODE_ENV === "production") {
    //   // 配置gzip压缩
    //   config.plugins.push(
    //     new CompressionWebpackPlugin({
    //       // 正在匹配需要压缩的文件后缀
    //       test: /\.(js|css|svg|woff|ttf|json|html)$/,
    //       // 大于10kb的会压缩
    //       threshold: 10240,
    //       // 删除原文件
    //       // deleteOriginalAssets: true
    //     })
    //   );
    // }
  },
  devServer: {
    // 设置api跨域代理
    proxy: {
      "/api": {
        target: "http://music.163.com/api",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
};