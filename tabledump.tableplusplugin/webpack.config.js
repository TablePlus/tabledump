const webpack = require('webpack');
const path = require('path');

const config = {
    entry: './main.js',
    output: {
        filename: 'dumpcreation.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    },
    stats: {
        colors: true
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};

module.exports = config;