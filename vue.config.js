// const CompressionWebpackPlugin = require('compression-webpack-plugin')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias.set('@img', resolve('src/assets/img'))
    config.resolve.alias.set('@three', resolve('src/views/Three'))
  },
  lintOnSave: false,
  devServer: {
    overlay: {
      warning: false,
      errors: false
    }
  },
  configureWebpack: (config) => {
    // 配置CDN加速
    // config.externals = {
    //   vue: "Vue",
    //   "vue-router": "VueRouter",
    //   axios: "axios",
    //   "element-ui": "ELEMENT",
    //   Vuex: "Vuex"
    // };
    // 生产环境才生效
    // if (process.env.NODE_ENV === 'production') {
    //   // 配置gzip压缩
    //   config.plugins.push(
    //     new CompressionWebpackPlugin({
    //       // 正在匹配需要压缩的文件后缀
    //       test: /\.(js|css|svg|woff|ttf|json|html)$/,
    //       // 大于10kb的会压缩
    //       threshold: 10240
    //       // 删除原文件
    //       // deleteOriginalAssets: true
    //     })
    //   )
    // }
  },

  devServer: {
    // 设置跨域代理
    proxy: {
      '/api': {
        target: 'http://music.163.com/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
