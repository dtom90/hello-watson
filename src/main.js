import AssistantApp from './AssistantApp.svelte';

const app = new AssistantApp({
  target: document.body,
  props: {
    title: 'Hello Watson!',
    titleColor: 'rgb(0, 133, 113)',
    debugCheckbox: true
  }
});

export default app;