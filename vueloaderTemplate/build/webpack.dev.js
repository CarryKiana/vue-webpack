const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');

module.exports = env => {
    return merge(common(env), {
        devtool: 'inline-source-map',
        devServer: {
            contentBase: './dist',
            compress: true,
            hot: false,
            historyApiFallback: {
                rewrites: [{
                    from: /.*/,
                    to: './dist/index.html'
                }]
            },
            host: '192.168.1.249',
            open: true,
            overlay: {
                warning: true,
                errors: true
            },
            port: 8080,
            proxy: {},
            quiet: true,
            watchOptions: {
                poll: false
            }
        },
        plugins: [
            // new webpack.NamedModulesPlugin(),
            // new webpack.DefinePlugin({
            //     'process.env.NODE_ENV': JSON.stringify('development')
            // }),
            new webpack.HotModuleReplacementPlugin(),
            new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://192.168.1.249:8080`]
                },
                onErrors: (severity, errors) => {
                    if (severity !== 'error') {
                        return
                    }
                    const error = errors[0]
                    const filename = error.file && error.file.split('!').pop()
                    notifier.notify({
                        title: 'project error',
                        message: severity + ': ' + error.name,
                        subtitle: filename || '',
                        icon: path.join(__dirname, 'logo.png')
                    })
                }
            })
        ],
        mode: 'development', // 效果等同于注释掉的plugins
        // output: {
        //     filename: '[name].[hash].js', // 热更新（HMR）不能和[chunkhash]同时使用，开发环境请用hash替换，生产环境不要使用参数--hot
        //     chunkFilename: '[name].[hash].js',
        //     path: path.resolve(__dirname, 'dist')
        // }
        // 2018/9/25，时隔一月，回来一look，测出开发环境下用webpack-dev-server不能配置output，否则页面打开的会去读取dist里的文件，不会去读内存（热更没体现），没有相应的打包后的文件会报错，网上说的output不影响webpack-dev-server可能只适用于webpack3或以下
    })
}