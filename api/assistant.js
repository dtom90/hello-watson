import AssistantV2 from 'ibm-watson/assistant/v2.js';

process.env.IBM_CREDENTIALS_FILE = process.cwd();
console.log(process.env.IBM_CREDENTIALS_FILE);

const assistant = new AssistantV2({
  serviceName: 'assistant',
  version: '2020-04-01'
});

let sessionId;

const initConvo = () => {
  assistant.createSession({
    assistantId: 'fa9acfa6-1ee7-453c-a753-03700de3e3b0'
  })
    .then(response => {
      console.log(JSON.stringify(response.result, null, 2));
      sessionId = response.result.session_id;
      sendMessage();
    })
    .catch(err => {
      console.log('error: ', err);
    });
};

const sendMessage = () => {
  assistant.message({
    assistantId: 'fa9acfa6-1ee7-453c-a753-03700de3e3b0',
    sessionId,
    input: {'text': 'Hello'}
  })
    .then(response => {
      console.log(JSON.stringify(response.result, null, 2));
    })
    .catch(err => {
      console.log('error: ', err);
    });
};

initConvo();

export {
  sendMessage
};
