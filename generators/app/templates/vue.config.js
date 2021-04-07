const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        API: path.resolve(__dirname, 'src/assets/js/api/index'),
      },
    },
  },

  // ! H5开发环境下，将 API 请求代理到 node API 服务器
  devServer: {
    port: 3333,
    proxy: {
      '/api': {
        target: process.env.api,
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
