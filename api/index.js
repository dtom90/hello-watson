import polka from 'polka';
import bodyParser from 'body-parser';
import send from '@polka/send-type';
import {sendMessage} from './assistant.js';

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

export default api;