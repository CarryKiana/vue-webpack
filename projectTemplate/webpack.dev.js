const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');

module.exports = env => {
    return merge(common(env), {
        devtool: 'inline-source-map',
        devServer: {
            contentBase: './dist',
            compress: true,
            hot: true,
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
            proxy: {}
        },
        plugins: [
            // new webpack.NamedModulesPlugin(),
            // new webpack.DefinePlugin({
            //     'process.env.NODE_ENV': JSON.stringify('development')
            // }),
            new webpack.HotModuleReplacementPlugin()
        ],
        mode: 'development', // 效果等同于注释掉的plugins
        output: {
            filename: '[name].[hash].js', // 热更新（HMR）不能和[chunkhash]同时使用，开发环境请用hash替换，生产环境不要使用参数--hot
            chunkFilename: '[name].[hash].js',
            path: path.resolve(__dirname, 'dist')
        }
    })
}