const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPligin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// module.exports = merge(common, {
//     plugins: [
//         new UglifyJSPligin({
//             sourceMap: true
//         }),
//         new webpack.DefinePlugin({
//             'process.env.NODE_ENV': JSON.stringify('production')
//         })
//     ]
// });
module.exports = env => {
    return merge(common(env), {
        plugins: [
            new UglifyJSPligin({
                sourceMap: true
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            })
        ]
    });
}