const polka = require('polka');
const bodyParser = require('body-parser');
const send = require('@polka/send-type');
const {sendMessage} = require('./assistant.js');

const api = (postProcess = () => null) => {
  const api = polka()
    .use(bodyParser.json());

  api.post('/message', async (req, res) => {
    let sessionId, text, result;
    ({sessionId, text} = req.body);
    try {
      ({sessionId, result} = await sendMessage(sessionId, {text}));
      await postProcess(result);
      send(res, 200, {sessionId, ...result});
    } catch (error) {
      send(res, 502, {error: error.message});
    }
  });

  return api;
};

module.exports = api;
