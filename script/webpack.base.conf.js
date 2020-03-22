const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    stats: {
        entrypoints: false,
        children: false
    },
    optimization: {
        minimizer: [
            // 压缩js
            new TerserPlugin({
                test: /\.(jsx|js)$/,
                extractComments: true,
                parallel: true,
                cache: true
            })
        ],
        splitChunks: {
            cacheGroups: {
                vendors: {
                    //node_modules里的代码
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    name: 'vendors', //chunks name
                    priority: 10, //优先级
                    enforce: true
                }
            }
        }
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.less', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                loader: 'file-loader',
                options: {
                    outputPath: './assets/images',
                    publicPath: '../assets/images/',
                    esModule: false
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|mp3)$/,
                loader: 'file-loader',
                options: {
                    esModule: false
                }
            }
        ]
    },
    plugins: {
        // 配置入口页面
        html: new HtmlWebpackPlugin({
            title: 'tristana',
            template: 'public/index.html',
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
        }),
        // 清理dist包
        cleanWebpack: new CleanWebpackPlugin(),
        // 抽取css
        miniCssExtract: new MiniCssExtractPlugin({
            filename: process.env.ENV_LWD == 'development' ? './css/[id].css' : './css/[id].[hash].css',
            chunkFilename: process.env.ENV_LWD == 'development' ? './css/[id].css' : './css/[id].[hash].css',
            ignoreOrder: true
        }),
        namedModules: new webpack.NamedModulesPlugin(),
        // 压缩css
        optimizeCssAssets: new OptimizeCssAssetsPlugin(),
        // 生成包依赖图
        bundleAnalyzer: new BundleAnalyzerPlugin({ analyzerPort: 8081 }),
        // 打包进度
        progressBarPlugin: new ProgressBarPlugin(),
        // 加载中文包
        ContextReplacementPlugin: new webpack.ContextReplacementPlugin(
            /moment\/locale$/,
            /zh-cn/
        ),
        CompressionPlugin: new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.jsx$|\.less$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        DefinePlugin: new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.ENV_LWD)
        })
    },
    devServer: {
        hot: false,
        historyApiFallback: true,
        contentBase: './',
        compress: true
    },
    // externals 排除对应的包，注：排除掉的包必须要用script标签引入下
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'socket.io-client': 'io'
    }
};
