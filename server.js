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

assistantServer(postProcess).listen(PORT, handler(PORT));
