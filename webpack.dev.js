/* eslint-disable */
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const os = require('os');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const DEV_SERVER_PORT = 8000;
const PROTO = 'http';

module.exports = merge(common, {
    mode: 'development',
    devtool: "inline-source-map",
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
    plugins: [
        ...common.plugins,
        new ForkTsCheckerWebpackPlugin()
    ],
});
