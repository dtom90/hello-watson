const assistantServer = require('./server');
const polkaApi = require('./api');
const svelteChatArea = require('./src/ChatArea.svelte');
const svelteAssistantApp = require('./src/AssistantApp.svelte');

module.exports = {
  assistantServer,
  polkaApi,
  svelteChatArea,
  svelteAssistantApp
};