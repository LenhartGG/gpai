'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
    dev: {

        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        // proxyTable: {
        //     //例如要请求的接口url为http://172.3.2.1:8000/look/1
        //     '/look': {
        //         target: 'http://172.3.2.1:8000',
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/look': '/look'
        //         }
        //     }
        // },
        // 测试服务器接口地址
        proxyTable: {
            //例如要请求的接口url为http://116.228.20.122/NAMS_mobile/wechat/getWechatConfig
            '/NAMS_mobile': {
                target: 'http://192.168.199.195:9091',
                changeOrigin: true,
                pathRewrite: {
                    '^/NAMS_mobile': '/NAMS_mobile'
                }
            }
        },
      //   proxyTable: {
      //     //例如要请求的接口url为http://116.228.20.122/NAMS_mobile/wechat/getWechatConfig
      //     '/NAMS_mobile': {
      //         target: 'http://192.168.199.195:9091',
      //         changeOrigin: true,
      //         pathRewrite: {
      //             '^/NAMS_mobile': '/NAMS_mobile'
      //         }
      //     }
      // },
        // //本地服务器接口地址
        // proxyTable: {
        //     //例如要请求的接口url为http://nams.free.ngrok.cc/NAMS_mobile/wechat/getWechatConfig
        //     '/NAMS_mobile': {
        //         target: 'http://192.168.199.137:8080',
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/NAMS_mobile': '/NAMS_mobile'
        //         }
        //     }
        // },
        // Various Dev Server settings
        host: '192.168.199.126', // can be overwritten by process.env.HOST
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',

        /**
         * Source Maps
         */

        productionSourceMap: true,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}