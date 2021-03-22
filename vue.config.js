var webpack = require('webpack');
const path = require('path')

module.exports = {
    publicPath: process.env.VUE_APP_NAME,
    // 将构建好的文件输出到哪里（或者说将编译的文件）
    outputDir: "dist",

    // 是否在保存的时候使用 `eslint-loader` 进行检查。
    // 有效的值：`ture` | `false` | `"error"`
    // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
    lintOnSave: process.env.NODE_ENV !== "production",

    // 使用带有浏览器内编译器的完整构建版本
    runtimeCompiler: false,
    // 配置 webpack-dev-server 行为。
    devServer: {
        open: true,
        port: 8080,
        proxy: {
            "/serverApi": {
                target: process.env.VUE_APP_SERVER_API, // 开发模式代理
                // target: "http://192.168.100.68",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "^/serverApi": "/"
                }
            },
            "/faceRrajectoryServeApi": {
                // target: process.env.VUE_APP_SERVER_API, // 开发模式代理
                target: "http://172.16.0.10:8088",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "^/faceRrajectoryServeApi": "/"
                }
            }
        }
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            }),
            new webpack.DefinePlugin({
                CESIUM_BASE_URL: JSON.stringify('/Cesium')
            })
        ]
    }
};
