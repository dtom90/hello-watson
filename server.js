#!/usr/bin/env node

'use strict';

import app from './app.js';
let port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;

app.listen(port, function() {
  console.log('Server running on port: %d', port);
});
