import polka from 'polka';
import send from '@polka/send-type';

const api = polka();

const messages = [
  'Hello, my name is Watson. What can I do for you today?',
  'I am doing well, thank you for asking!'
]

api.get('/message', (req, res) => {
  send(res, 200, {name: 'john'});
});

export default api;