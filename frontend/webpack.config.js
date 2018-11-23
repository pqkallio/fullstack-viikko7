const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const Webpack = require('webpack')

const config = (_, argv) => {
    const backendUrl = 'http://localhost:3001'

    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.js'
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),
            compress: true,
            port: 3000,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*'
            }
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/env', '@babel/react']
                    }
                },
                {
                    test: /\.css$/,
                    loaders: ['style-loader', 'css-loader']
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public/index.html')
            }),
            new Webpack.DefinePlugin({
                'BACKEND_URL': JSON.stringify(backendUrl)
            })
        ]
    }
}

module.exports = config
