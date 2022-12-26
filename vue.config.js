const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
    devServer: {
      https:false,
      historyApiFallback: true,
      allowedHosts: "all",
      port: process.env.VUE_APP_Port,
      proxy: {
        "^/api": {
          target: process.env.VUE_APP_ApiURL_Proxy,
          ws: false,
          changeOrigin: true,
          pathRewrite: {                         
            '^/api': '', 
          }
        },
      }
  },
})
