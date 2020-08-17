const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [{
            test: /\.(sa|sc|c)ss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            loader: 'file-loader',
            options: {
                name: path.posix.join('static', 'img/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            loader: 'file-loader',
            options: {
                name: path.posix.join('static', 'fonts/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(csv|tsv)$/,
            loader: 'csv-loader',
            options: {
                name: path.posix.join('static', 'data/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.xml$/,
            loader: 'xml-loader',
            options: {
                name: path.posix.join('static', 'xml/[name].[hash:7].[ext]')
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../dist/index.html'),
            template: 'index.html',
            inject: true,
            favicon: path.resolve('favicon.ico')
        })
    ]
}