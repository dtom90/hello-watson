<script>
  import ChatArea from './ChatArea.svelte';

  let debug = false;

  export let title = 'Hello Watson!';
  export let noTitle = false;
</script>

<main>
    {#if !noTitle}
        <h1 id="app-title">{title}</h1>
    {/if}

    <div id="debug-wrapper" class="form-group">
        <label>
            <input type="checkbox" bind:checked={debug}>
            Debug
        </label>
    </div>
    <div class="chat-area">
        <ChatArea debug={debug}/>
    </div>
</main>

<style type="text/scss" global>
  @import "./bootstrap";

  main {
    text-align: center;
    margin: 0 auto;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  #app-title {
    color: blue;
    font-size: 4em;
  }

  #debug-wrapper {
    display: flex;
    justify-content: right;
    padding: 0 10px;
  }

  .chat-area {
    flex: 1;
  }
</style>