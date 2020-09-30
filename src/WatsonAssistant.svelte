<script>
  let messages = [
    {bot: true, message: 'Hello, my name is Watson!'},
    {bot: true, message: 'I can answer simple questions'},
    {user: true, message: 'How are you today?'},
    {bot: true, message: 'I am doing well, thank you for asking!'}
  ];
</script>

<div class="chat-container">
    {#each messages as {bot, message}}
        <div class="message-container {bot ? 'bot' : 'user'}-message">
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