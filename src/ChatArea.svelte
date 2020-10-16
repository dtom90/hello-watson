<script>
  import request from 'superagent';

  export let debug = false;

  let sessionId = '';
  let messages = [];

  async function sendMessage(text) {
    try {
      const {body} = await request.post('/api/message').send({sessionId, text});
      if (debug) {
        console.log(body);
      }
      sessionId = body.sessionId;
      messages = [...messages, ...body.output.generic];
    } catch (error) {
      console.error(error.response);
      messages = [...messages,
        {isUser: false, text: 'Oops, looks like I had trouble processing that message...'},
        {isUser: false, text: `I got the error "${error.response.body.error}"`}
      ];
    }
  }

  async function submitMessageInput(event) {
    const text = event.target.messageInput.value;
    messages = [...messages, {isUser: true, text}];
    event.target.messageInput.value = '';
    await sendMessage(text);
  }

  sendMessage('');
</script>

<div class="chat-container">
    <form on:submit|preventDefault={submitMessageInput}>
        <label>
            Message:
            <input id="messageInput" type="text" size="50">
        </label>
    </form>
    {#each messages as {isUser, text}, i}
        <div class="message-container {isUser ? 'user' : 'bot'}-message">
            <span class="message">{text}</span>
        </div>
    {/each}
</div>

<style>
    .chat-container {
        background-color: rgba(0, 0, 0, 0.1);
        width: 100%;
        height: 100%;
    }

    .message-container {
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

    .user-message {
        justify-content: right;
    }

    .user-message > .message {
        background-color: #007fff;
    }
</style>