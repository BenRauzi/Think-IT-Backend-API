const webpack = require('webpack');
const path = require('path');
const ROOT = path.resolve(__dirname, './../../');

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NodeExternals = require('webpack-node-externals');
const AwesomeTypescriptLoader = require('awesome-typescript-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function root(args) {  
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [ROOT].concat(args));
};

module.exports = (configs, webpack_mode) => { 
    return {
        mode: webpack_mode,
        target: 'node', 
        devtool: 'source-map',
        externals: [
            NodeExternals({
                importType: 'commonjs'
            })
        ],
        entry:{
            server:['./server/server']
        },
        resolve: {
            extensions: ['.js', '.ts', '.json'],
            plugins: [
                new AwesomeTypescriptLoader.TsConfigPathsPlugin({
                    tsconfig: root('tsconfig.json')
                })
            ]
        },
        output: {
            path: root('dist'),
            filename: '[name].js',
            sourceMapFilename: '[name].map',
            libraryTarget: 'commonjs',
            devtoolModuleFilenameTemplate: '.[resource-path]'
        },
        module: {      
            // allowSyntheticDefaultImports for System.import
            rules: [
                {
                    test: /\.ts$/,
                    loader: 'tslint-loader',
                    enforce: 'pre',
                    exclude: '/node_modules/'
                },
                {
                    test: /\.ts$/,
                    loaders: [
                        'awesome-typescript-loader'
                    ],
                    exclude: [
                        /node_modules/,
                        /\.test\.ts$/
                    ]
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                }
            ]
        },
        plugins: [
            new DefinePlugin(configs),
            new CopyWebpackPlugin([
                { from: 'assets', to: 'assets' },
                { from: 'package.json', to: 'package.json' }
            ])
        ]
    };
}