const merge = require('webpack-merge'); // Used to merge webpack configs
const common = require('./config.common');

/**
 * Webpack Plugins
 */
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

module.exports =  (configs, webpack_mode)=> {
    return merge(common (configs, webpack_mode), { 
        plugins: [
            new LoaderOptionsPlugin({
                debug: true
            })
        ]
    });
}
