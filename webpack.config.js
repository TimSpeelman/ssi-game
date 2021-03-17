/* eslint-disable */

const HtmlWebPackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const os = require('os');

const PROJECT_ROOT = __dirname;
const DEV_SERVER_PORT = 8000;
const PROTO = 'http';

module.exports = {
    mode: 'development',
    context: PROJECT_ROOT,
    devtool: "inline-source-map",
    entry: path.join(__dirname, 'src', 'index.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true,
        port: DEV_SERVER_PORT,
        host: '0.0.0.0', // To enable access over LAN
        openPage: [`${PROTO}://localhost:${DEV_SERVER_PORT}/`],

        // For LAN access, print our local IP addresses.
        before: function (app, server, compiler) {
            const nets = os.networkInterfaces();
            const netNames = Object.keys(nets);
            console.log(`You are being served at ${PROTO}://localhost:${DEV_SERVER_PORT}/`);
            console.log('Or access externally at one of:');
            netNames.forEach((netName) =>
                console.log('-', `${PROTO}://` + nets[netName][0].address + ':' + DEV_SERVER_PORT),
            );
            console.log();
        },
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    optimization: {
        runtimeChunk: true,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
    },
    output: {
        pathinfo: false,
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                }
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'source-map-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                include: path.resolve(__dirname, 'src'),
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
        new ForkTsCheckerWebpackPlugin()
    ],
};
