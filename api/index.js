import polka from 'polka';
import bodyParser from 'body-parser';
import send from '@polka/send-type';

const api = polka()
  .use(bodyParser.json());

api.post('/message', (req, res) => {
  const userMessage = req.body.message;
  if (Math.random() > 0.5) {
    send(res, 200, {message: `I see that you just said "${userMessage}". What a great thing to hear!`});
  } else {
    send(res, 502, {error: 'Could not communicate with Watson'});
  }
});

export default api;