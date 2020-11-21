const {assistantServer, handler} = require('./assistantServer');

const PORT = 3000;

const postProcess = (result) => {
  if (result.output.entities.length > 0) {
    result.output.generic.unshift({
      response_type: 'text',
      text: 'Entities: ' + result.output.entities.map(entity => entity.value).join(',')
    });
  }
  if (result.output.intents.length > 0) {
    result.output.generic.unshift({
      response_type: 'text',
      text: 'Intent: ' + result.output.intents[0].intent
    });
  }
};

// eslint-disable-next-line no-unused-vars
const postProcessAsync = async (result) => {
  const start = Date.now();
  await new Promise(resolve => setTimeout(resolve, 1000));
  const end = Date.now();
  result.output.generic.push({
    response_type: 'text',
    text: `Waited from ${start} to ${end} for ${end - start} ms`
  });
};

assistantServer(postProcess).listen(PORT, handler(PORT));
