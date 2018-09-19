const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js'
    },
    plugins: [
        new CopyWebpackPlugin(
            [{ from: 'app/index.html', to: 'index.html' }],
            {}
        )
    ],
    module: {
        rules: [
            {
                test: /\.svelte$/,
                exclude: /node_modules/,
                use: 'svelte-loader'
            }
        ]
    }
};
