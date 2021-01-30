const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    stats: 'minimal',
    entry: {
        main: ['webpack-hot-middleware/client', './src/js/main.js'],
    },
    output: {
        publicPath: '/',
        filename: '[name].js',
        path: path.resolve(process.cwd(), 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /(\.woff2?$)/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash]',
                    },
                },
            },
        ],
    },
    plugins: [new MiniCssExtractPlugin(), new webpack.HotModuleReplacementPlugin()],
};
