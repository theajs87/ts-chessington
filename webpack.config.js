const path = require('path');

const config = {
    entry: './dist/frontend/js/chessington.js',
    output: {
        filename: 'chessington.bundle.js',
        path: path.join(__dirname, 'dist', 'frontend', 'js'),
        libraryTarget: 'var',
        library: 'chessington'
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
            },
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            }
        ]
    },
    mode: "development"
};

module.exports = config;