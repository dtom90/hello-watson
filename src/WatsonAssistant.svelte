<script>
  import request from 'superagent';

  let sessionId = '';
  let messages = [];

  async function sendMessage(text) {
    try {
      const {body} = await request.post('/api/message').send({sessionId, text});
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
        <label for="messageInput">Message:</label>
        <input id="messageInput" type="text">
    </form>
    {#each messages as {isUser, text}, i}
        <div class="message-container {isUser ? 'user' : 'bot'}-message">
            <span class="message">{text}</span>
        </div>
    {/each}
</div>

<style>
    .chat-container {
        background-color: lightgray;
        width: 100%;
        height: 100%;
    }

    .message-container {
        padding: 10px 10px 0 10px;
        display: flex;
    }

    .message {
        padding: 10px;
        border-radius: 10px;
    }

    .bot-message > .message {
        background-color: lightgreen;
    }

    .user-message {
        justify-content: right;
    }

    .user-message > .message {
        background-color: #00B4A0;
    }
</style>