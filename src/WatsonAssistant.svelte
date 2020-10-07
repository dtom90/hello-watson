<script>
  import request from 'superagent';

  let messages = [];

  async function sendMessage(event) {
    const message = event.target.messageInput.value;
    messages = [...messages, {isBot: false, message}];
    event.target.messageInput.value = '';

    try {
      const response = await request.post('/api/message').send({message});
      messages = [...messages, {isBot: true, ...response.body}];
    } catch (error) {
      console.error(error.response);
      messages = [...messages,
        {isBot: true, message: 'Oops, looks like I had trouble processing that message...'},
        {isBot: true, message: `I got the error "${error.response.body.error}"`}
      ];
    }
  }
</script>

<div class="chat-container">
    <form on:submit|preventDefault={sendMessage}>
        <label for="messageInput">Message:</label>
        <input id="messageInput" type="text">
    </form>
    {#each messages as {isBot, message}, i}
        <div class="message-container {isBot ? 'bot' : 'user'}-message">
            <span class="message">{message}</span>
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