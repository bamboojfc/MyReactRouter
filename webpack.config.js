var webpack = require('webpack');
var path = require('path');

var config = {
    entry: {
        hello: path.join(__dirname, 'src', 'app.js'),
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    },
    devServer: {
        historyApiFallback: true,
        inline: true,
        port: 8081
    }
};

module.exports = config;