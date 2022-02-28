module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.98.123.211',
        // pathRewrite: {'^/api': ''},
        ws: true, //用于支持websocket
        changeOrigin: true  //伪装请求头的host值
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  },
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= '屈品汇'
        return args
      })
  }
}
