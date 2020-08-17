const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist', // 告诉服务器从哪里提供内容，只有在想要提供静态文件时才需要，publicPath用于确定应该从哪里提供bundle，并以此选项优先，推荐使用绝对路径
        compress: true, // 一切服务都启用gzip压缩
        hot: true, // 启用webpack的模块热替换特性
        historyApiFallback: { // 当使用HTML5 History API时，任意的404响应都被以下规则替代
            rewrites: [{
                from: /.*/,
                to: './dist/index.html'
            }]
        },
        host: '192.168.1.158', // 指定使用一个host。默认是localhost。若希望服务器外部可访问，可配为0.0.0.0
        open: true, // 配置启动服务器时是否在浏览器自动打开页面
        // openPage: './dist/index.html', // 指定自动在浏览器打开时的页面
        overlay: { // 是否显示警告等信息,默认为overlay：false
            warning: true,
            errors: true
        },
        port: 8080, // 指定要监听请求的端口号
        proxy: { // 如果有单独的后端开发服务器API，并希望在同域名下发送API请求，那么在此配置
            //具体看webpack
        },
        // progress: '', // 将运行进度输出到控制台，只用于命令行工具（cli）
        quiet: true, // 启用后除初始启动信息外任何内容都不会被打印到控制台，来自webpack的错误与警告也不可见
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.(scss|css)$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader'
            ]
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                'file-loader'
            ]
        }, {
            test: /\.(csv|tsv)$/,
            use: [
                'csv-loader'
            ]
        }, {
            test: /\.xml$/,
            use: [
                'xml-loader'
            ]
        }]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: true,
            favicon: path.resolve('favicon.ico')
        })
    ]
}