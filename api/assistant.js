const AssistantV2 = require('ibm-watson/assistant/v2');
require('dotenv').config();

const assistant = new AssistantV2({
  serviceName: 'assistant',
  version: '2020-04-01'
});

if (!process.env.ASSISTANT_ID) {
  throw Error('Missing ASSISTANT_ID env var');
}

const assistantId = process.env.ASSISTANT_ID;

const initConversation = async () =>
  assistant.createSession({
    assistantId
  });


const sendMessage = async (sessionId, input) => {
  if (!sessionId) {
    const {result} = await initConversation();
    sessionId = result.session_id;
  }
  const {result} = await assistant.message({
    assistantId,
    sessionId,
    input: {
      ...input,
      options: {
        return_context: true
      }
    }
  });
  return {sessionId, result};
};

module.exports = {
  sendMessage
};
