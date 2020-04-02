/*
 * @Description: 
 * @Version: 1.0
 * @Autor: liusm
 * @Date: 2020-04-02 12:48:38
 * @LastEditors: liusm
 * @LastEditTime: 2020-04-02 12:48:59
 */

const path = require('path');
const UglifyJsPlugin  = require('uglifyjs-webpack-plugin');


const config = {
    entry: {
        kit: './kit.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins:[
        new UglifyJsPlugin()
    ]
}

module.exports = config;