const merge = require('webpack-merge');
const common = require('./webpack.common');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = env => {
    return merge(common(env), {
        devtool: 'source-map',
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new webpack.HashedModuleIdsPlugin()
            // new webpack.DefinePlugin({
            //     'process.env.NODE_ENV': JSON.stringify('production')
            // })
        ],
        mode: 'production',
        output: {
            filename: 'static/js/[name].[chunkhash].js', // 热更新（HMR）不能和[chunkhash]同时使用，开发环境请用hash替换，生产环境不要使用参数--hot
            chunkFilename: 'static/js/[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        },
    })
}