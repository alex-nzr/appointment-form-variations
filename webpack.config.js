const path = require("path")
const HWP = require("html-webpack-plugin")


const isDev = process.env.NODE_ENV === 'development';

const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

module.exports = {
    mode: "development",
    devServer: {
        historyApiFallback: true,
        liveReload: true,
        watchFiles:  ['src/**/*', 'public/**/*'],
        open: true,
        compress: true,
        //hot: true,
        port: 8080,
    },
    devtool: isDev ? 'source-map' : false,
    resolve: {
        extensions: ['.html','.js','.ts','.jsx','.tsx','.scss'],
        alias: {
            '@root': path.resolve(__dirname, './src'),
        }
    },
    entry: {
        main: path.resolve(__dirname, './src/index.tsx'),
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, "./dist/js"),
        assetModuleFilename: '../static/[hash][ext][query]'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: "chunk-vendors",
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: "initial"
                },
                common: {
                    name: "chunk-common",
                    minChunks: 2,
                    priority: -20,
                    chunks: "initial",
                    reuseExistingChunk: true
                },
            }
        }
    },
    plugins:[
        new HWP({
            template: path.resolve(__dirname, './src/public/index.html'),
            minify: !isDev,
            filename: isDev ? "index.html" : "../index.html"
        }),
    ],
    module:  {
        rules: [
            {
                test: /\.(ts|js|jsx|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                "@babel/preset-typescript",
                                "@babel/preset-react"
                            ],
                            plugins: ["@babel/transform-runtime"],
                            targets: "> 0.25%, not dead"
                        }
                    }
                ],
            },
            {
                test: /\.m\.(scss|css)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: {
                                localIdentName: '[local]__[sha1:hash:hex:7]'
                            }
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ],
            },
            {
                test: /^((?!\.m).)*(scss|css)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|)$/,
                type: 'asset/inline',
            },
        ]
    }
}