<script>
  import {onMount, afterUpdate} from 'svelte';
  import request from 'superagent';

  export let debug = false;

  let sessionId = '';
  let messages = [];
  let sending = false;

  async function sendMessage(text = '') {
    try {
      sending = true;
      const {body} = await request.post('/api/message').send({sessionId, text});
      sending = false;
      if (debug) {
        console.log(JSON.stringify(body, null, 2));
      }
      sessionId = body.sessionId;
      messages = [...messages, ...body.output.generic];
    } catch (error) {
      sending = false;
      if (error.response) {
        console.error(error.response);
        messages = [...messages,
          {isUser: false, text: 'Oops, looks like I had trouble processing that message...'},
          {isUser: false, text: `I got the error "${error.response.body.error}"`}
        ];
      } else {
        console.error(error);
      }
    }
  }

  async function submitMessageInput(event) {
    const text = event.target.messageInput.value;
    messages = [...messages, {isUser: true, text}];
    event.target.messageInput.value = '';
    await sendMessage(text);
  }

  onMount(sendMessage);

  afterUpdate(() => {
    const view = document.getElementById('messages-view');
    if (view) {
      view.scrollTo(0, view.scrollHeight);
    }
  });
</script>

<div id="chat-area">
    <form on:submit|preventDefault={submitMessageInput}>
        <input id="messageInput" class="form-control" type="text" placeholder="enter a message...">
    </form>
    <div id="messages-area">
        <div id="messages-view">
            {#each messages as {isUser, text}, i}
                <div class="message-row {isUser ? 'user' : 'bot'}-message">
                    <span class="message">
                        {#each text.split('\n') as line}
                            <div>{line}</div>
                        {/each}
                    </span>
                </div>
            {/each}
            {#if sending}
                <div class="message-row bot-message">
                    <span class="message">
                        <img class="spinner-img" src="/spinner.gif" alt="sending message..."/>
                    </span>
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    #chat-area {
        background-color: rgba(0, 0, 0, 0.1);
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    #messages-area {
        flex: 1;
        overflow-y: hidden;
    }

    #messages-view {
        height: 100%;
        overflow-y: scroll;
    }

    .message-row {
        padding: 10px 10px 0 10px;
        display: flex;
    }

    .message {
        padding: 12.5px 18.75px;
        margin: 0.3125rem 0;
        border-radius: 20px;
        color: white;
    }

    .bot-message > .message {
        background-color: rgb(0, 133, 113);
    }

    .bot-message {
        justify-content: right;
    }

    .user-message > .message {
        background-color: #007fff;
    }

    .spinner-img {
        height: 16px;
    }
</style>