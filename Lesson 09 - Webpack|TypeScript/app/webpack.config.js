const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
    mode: process.env.NODE_ENV,
    entry: './src/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        /**
         * Allows us to specify several loaders within our webpack config.
         * They are evaluated right to left or bottom to top
         * 
         * @link https://webpack.js.org/configuration/module/#modulerules
        */
        rules: [
            { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ }
        ]
    },
    resolve: {
        /**
         * Tells webpack what files with the given extensions it should work with.
         * Allows us to do file imports without passing the file extensions.
         * 
         * @link https://webpack.js.org/configuration/resolve/#resolveextensions
        */
        extensions: ['.ts', '.js']
    }
};

module.exports = (env, argv) => {
    if (process.env.NODE_ENV === 'development') {
        config.output.publicPath = 'dist';
        config.devServer = {
            publicPath: '/dist/',
            port: 8090,
        };
        /**
         * Controls how source maps are generated. And if they exist
         * how they will be bundled.
         * 
         * @link https://webpack.js.org/configuration/devtool/#devtool
        */
        config.devtool = 'inline-source-map';
    }

    if (process.env.NODE_ENV === 'production') {
        config.devtool = false;
        config.plugins = [
            /**
             * This plugin cleans up the output path before doing a re-build in production.
             * 
             * @link https://www.npmjs.com/package/clean-webpack-plugin
            */
            new CleanWebpackPlugin()
        ];
    }

    return config;
};