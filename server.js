const {assistantServer, handler} = require('./assistantServer');

const PORT = 3000;

const postProcess = (result) => {
  result.output.generic.push({
    response_type: 'text',
    text: 'Post-processed!'
  });
};

assistantServer(postProcess).listen(PORT, handler(PORT));
