const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const utils = require('./utils.js');

// utils.getFreePort().then(port => {
//     console.log(port)
// }).catch(err => {
//     console.log(err)
// })
// module.exports = env => {
//     return merge(common, {
//         devtool: 'inline-source-map',
//         devServer: {
//             hot: true,
//             contentBase: './dist', // 告诉服务器从哪里提供内容，只有在想要提供静态文件时才需要，publicPath用于确定应该从哪里提供bundle，并以此选项优先，推荐使用绝对路径
//             compress: true, // 一切服务都启用gzip压缩
//             historyApiFallback: { // 当使用HTML5 History API时，任意的404响应都被以下规则替代
//                 rewrites: [{
//                     from: /.*/, // 匹配任意来源
//                     to: './dist/index.html' // 导向index文件
//                 }]
//             },
//             host: utils.getLocalIpAddress() || 'localhost', // 指定使用一个host，默认为localhost，若希望服务器外部可访问，可配为0.0.0.0
//             port: 8080, // 指定要监听请求的端口号，不指定的话默认从8080开始，被占用则递增，而在指定时，若host相同，port被占用则会报错
//             overlay: { // 是否显示警告信息，默认为overlay: false，按一下配置时若有警告信息，则会在浏览器显示
//                 warnings: true,
//                 errors: true
//             },
//             proxy: {}, // 服务器代理，解决接口跨域限制
//             quiet: true, // 启动后除初始启动信息外任何内容都不会被打印到控制台，来自webpack的错误与警告也不可见
//             // openPage: './dist/index.html', // 指定自动在浏览器打开的页面
//             // progress: '' // 将运行进度输出到控制台，只用于命令行（cli）
//         },
//         mode: 'development',
//         plugins: [
//             new webpack.HotModuleReplacementPlugin(),
//             new FriendlyErrorsPlugin({
//                 compilationSuccessInfo: {
//                     messages: [`Your application is running here: http://${ utils.getLocalIpAddress() || 'localhost'}:8080`]
//                 },
//                 onErrors: (serverity, errors) => {
//                     if (serverity !== 'error') {
//                         return
//                     }
//                     const error = errors[0]
//                     const filename = error.file && error.file.split('!').pop()
//                     notifier.notify({
//                         title: 'project error',
//                         message: serverity + ': ' + error.name,
//                         subtitle: filename || '',
//                         icon: path.join(__dirname, '../src/icon.png')
//                     })
//                 }
//             })
//         ]
//     })
// }
const port = ''
const devWebpackConfig = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        contentBase: './dist', // 告诉服务器从哪里提供内容，只有在想要提供静态文件时才需要，publicPath用于确定应该从哪里提供bundle，并以此选项优先，推荐使用绝对路径
        compress: true, // 一切服务都启用gzip压缩
        historyApiFallback: { // 当使用HTML5 History API时，任意的404响应都被以下规则替代
            rewrites: [{
                from: /.*/, // 匹配任意来源
                to: './dist/index.html' // 导向index文件
            }]
        },
        host: utils.getLocalIpAddress() || 'localhost', // 指定使用一个host，默认为localhost，若希望服务器外部可访问，可配为0.0.0.0
        port: 8081, // 指定要监听请求的端口号，不指定的话默认从8080开始，被占用则递增，而在指定时，若host相同，port被占用则会报错
        overlay: { // 是否显示警告信息，默认为overlay: false，按一下配置时若有警告信息，则会在浏览器显示
            warnings: true,
            errors: true
        },
        proxy: {}, // 服务器代理，解决接口跨域限制
        quiet: true, // 启动后除初始启动信息外任何内容都不会被打印到控制台，来自webpack的错误与警告也不可见
        // openPage: './dist/index.html', // 指定自动在浏览器打开的页面
        // progress: '' // 将运行进度输出到控制台，只用于命令行（cli）
    },
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: http://${ utils.getLocalIpAddress() || 'localhost'}:${port}`]
            },
            onErrors: (serverity, errors) => {
                if (serverity !== 'error') {
                    return
                }
                const error = errors[0]
                const filename = error.file && error.file.split('!').pop()
                notifier.notify({
                    title: 'project error',
                    message: serverity + ': ' + error.name,
                    subtitle: filename || '',
                    icon: path.join(__dirname, '../src/icon.png')
                })
            }
        })
    ]
})

module.exports = new Promise((resolve, reject) => {
    utils.getFreePort(devWebpackConfig.devServer.port).then(port => {
        devWebpackConfig.devServer.port = port
        resolve(devWebpackConfig)
    }).catch(err => {
        reject(err)
    })
})