let environment = process.env.NODE_ENV;
let webpack_mode = 'none';
switch (environment) {
     case 'prod': case 'production':
          webpack_mode = environment = 'production';
          break;
     case 'dev': case 'development':
          webpack_mode = environment = 'development';
          break;
     case 'dev_cloud':
          environment = 'development-cloud';
          webpack_mode = 'development';
     case 'test':
          environment = 'test';
          webpack_mode = 'development';
          break;

     default:
          throw new Error(`Unknown Environment: '${environment}'. Ensure NODE_ENV is set to [prod, production, dev, development, test].`);
}

const package = require('../package.json');
let config = require('./config.default.json');
let imports = require('./config.json');
let econfig = imports[environment];
econfig.NODE_ENV = environment;
econfig.APPLICATION_NAME = package.name;
econfig.APPLICATION_VERSION = package.version;

Object.keys(econfig).forEach((key) => {
     config[key] = JSON.stringify(econfig[key]);
})

module.exports = require(`./webpack/config.${environment}`)(config, webpack_mode);
