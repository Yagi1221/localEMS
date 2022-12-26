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
        "^/api/ups": {
          target: process.env.VUE_APP_TargetURL_UPS,
          ws: false,
          changeOrigin: true,
          pathRewrite: {                         
            '^/api/ups': '', 
          }
        },
        "^/api": {
          target: process.env.VUE_APP_TargetURL_EMS,
          ws: false,
          changeOrigin: true,
          pathRewrite: {                         
            '^/api': '', 
          }
        },
      }
  },
})
