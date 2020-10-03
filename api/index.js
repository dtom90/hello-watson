import polka from 'polka';
import send from '@polka/send-type';

const api = polka();

api.get('/message', (req, res) => {
  send(res, 200, {name: 'john'});
});

export default api;