/* eslint-disable */
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const AggressiveMergingPlugin = require('webpack').optimize.AggressiveMergingPlugin;

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new AggressiveMergingPlugin(),
        new BundleAnalyzerPlugin(),
        ...common.plugins,
    ],
});
