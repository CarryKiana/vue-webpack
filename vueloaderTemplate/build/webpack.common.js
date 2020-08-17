const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

module.exports = env => {
    const devMode = env !== 'production'
    console.log(env)
    return {
        entry: {
            app: './src/main.js',
            vendor: [
                'lodash'
            ]
        },
        resolve: {
            alias: {
                vue$: 'vue/dist/vue.esm.js'
            }
        },
        module: {
            rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
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
            }),
            new MiniCssExtractPlugin({
                filename: devMode ? '[name].css' : 'static/css/[name].[contenthash].css',
                chunkFilename: devMode ? '[id].css' : 'static/css/[id].[contenthash].css'
            }),
            new VueLoaderPlugin()
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'lodash',
                        chunks: 'all',
                        minChunks: 2,
                        priority: 10
                    }
                }
            }
        }
    }
}