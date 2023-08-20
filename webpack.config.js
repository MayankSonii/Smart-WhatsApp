const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'production',

    entry: {
        main: './src/index.js',
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),

        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public', 'manifest.json'),
                    to: path.resolve(__dirname, 'build'),
                },
            ],
        }),
    ],
}
