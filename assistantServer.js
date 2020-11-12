const polka = require('polka');
const sirv = require('sirv');
const compression = require('compression');

const api = require('./api');

// Init `sirv` handler
const assets = sirv('public', {
  dev: process.argv[2] === '--dev',
  maxAge: 31536000, // 1Y
  immutable: true
});

const assistantServer = (postProcess) =>
  polka()
    .use(compression(), assets)
    .use('/api', api(postProcess));

const handler = (port) => {
  return (err) => {
    if (err) throw err;
    console.log('> Ready at http://localhost:' + port); // eslint-disable-line no-console
  };
};

module.exports = {
  assistantServer,
  handler
};
