const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: {
        main: './src/index.js',
        contentScript: './src/utils/contentScript.js'
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
        clean: true
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
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader']
            }
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
                {
                    from: path.resolve(__dirname, 'src', 'utils', 'utils.css'),
                    to: path.resolve(__dirname, 'build'),
                },
                {
                    from: path.resolve(__dirname, 'public', 'assets'),
                    to: path.resolve(__dirname, 'build', 'assets'),
                },
            ],
        }),
    ],
}
