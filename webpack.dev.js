/* eslint-disable */
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const DEV_SERVER_PORT = 8000;
const PROTO = 'http';

module.exports = merge(common, {
    mode: 'development',
    devtool: "inline-source-map",
    devServer: {
        historyApiFallback: true,
        port: DEV_SERVER_PORT,
        host: '0.0.0.0', // To enable access over LAN
        open: [`${PROTO}://localhost:${DEV_SERVER_PORT}/`],
    },
    plugins: [
        ...common.plugins,
        new ForkTsCheckerWebpackPlugin()
    ],
});
