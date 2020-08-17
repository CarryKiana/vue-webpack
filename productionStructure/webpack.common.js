const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const devMode = process.env.NODE_ENV !== 'production'
console.log(process.env.NODE_ENV)
// module.exports = {
//     entry: {
//         app: './src/index.js'
//     },
//     module: {
//         rules: [{
//             test: /\.(sa|sc|c)ss$/,
//             use: [
//                 devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
//                 'css-loader'
//             ]
//         }]
//     },
//     plugins: [
//         new CleanWebpackPlugin(['dist']),
//         new HtmlWebpackPlugin({
//             title: 'Production'
//         }),
//         new MiniCssExtractPlugin({
//             filename: devMode ? '[name].css' : '[name].[hash].css',
//             chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
//         })
//     ],
//     output: {
//         filename: '[name].bundle.js',
//         path: path.resolve(__dirname, 'dist')
//     }
// };

module.exports = env => {
    // console.log(env)
    const devMode = env !== 'production'
    return {
        entry: {
            app: './src/index.js'
        },
        module: {
            rules: [{
                test: /\.(sa|sc|c)ss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }]
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new HtmlWebpackPlugin({
                title: 'Production'
            }),
            new MiniCssExtractPlugin({
                filename: devMode ? '[name].css' : '[name].[hash].css',
                chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
            })
        ],
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
        }
    }
}