const {assistantServer, handler} = require('./assistantServer');

const PORT = 3000;

assistantServer.listen(PORT, handler(PORT));
