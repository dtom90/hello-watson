import polka from 'polka';
import sirv from 'sirv';
import compression from 'compression';

import api from './api/index.js';

// Init `sirv` handler
const assets = sirv('public', {
  maxAge: 31536000, // 1Y
  immutable: true
});

polka()
  .use(compression(), assets)
  .use('/api', api)
  .listen(3000, err => {
    if (err) throw err;
    console.log('> Ready at http://localhost:3000'); // eslint-disable-line no-console
  });