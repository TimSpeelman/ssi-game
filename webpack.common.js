/* eslint-disable */

const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
// const os = require('os');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const PROJECT_ROOT = __dirname;
// const DEV_SERVER_PORT = 8000;
// const PROTO = 'http';

module.exports = {
    entry: './src/index.ts',
    context: PROJECT_ROOT,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/',
        clean: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                sideEffects: true,
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'source-map-loader',
            },
            {
                test: /\.md$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'raw-loader',
            },

            {
                test: /\.(png|j?g|svg|gif|woff|woff2|eot|ttf)?$/,
                include: path.resolve(__dirname, 'src'),
                use: 'file-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
            filename: 'index.html',
        }),
        new CopyWebPackPlugin({
            patterns: [{ from: 'static' }],
        }),
    ],
};
