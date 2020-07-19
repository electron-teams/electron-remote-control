const { override } = require('customize-cra')

const addWebpackTarget = (config) => {
    config.target = 'electron-renderer';
    return config;
}

module.exports = override(addWebpackTarget)