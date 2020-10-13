const AssistantV2 = require('ibm-watson/assistant/v2');

const assistant = new AssistantV2({
  serviceName: 'assistant',
  version: '2020-04-01'
});


const initConversation = async () =>
  assistant.createSession({
    assistantId: 'fa9acfa6-1ee7-453c-a753-03700de3e3b0'
  });


const sendMessage = async (sessionId, input) => {
  if (!sessionId) {
    const {result} = await initConversation();
    sessionId = result.session_id;
  }
  return assistant.message({
    assistantId: 'fa9acfa6-1ee7-453c-a753-03700de3e3b0',
    sessionId,
    input
  });
};

module.exports = {
  sendMessage
};
