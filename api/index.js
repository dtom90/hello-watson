const polka = require('polka');
const bodyParser = require('body-parser');
const send = require('@polka/send-type');
const {sendMessage} = require('./assistant.js');

const api = polka()
  .use(bodyParser.json());

api.post('/message', async (req, res) => {
  const {sessionId, text} = req.body;
  try {
    const {result} = await sendMessage(sessionId, {text});
    send(res, 200, {sessionId, ...result});
  } catch (error) {
    send(res, 502, {error: error.message});
  }
});

module.exports = api;
