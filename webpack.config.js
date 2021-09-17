const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry:  path.resolve(__dirname, './src/js/main.js'),
    output: {
        filename: '[name].js?[fullhash]',
        path: path.resolve(__dirname, './dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html')
        }),
    ]
};
module.exports = config;