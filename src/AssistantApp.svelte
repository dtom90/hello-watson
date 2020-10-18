<script>
  import ChatArea from './ChatArea.svelte';

  let debug = false;

  export let title = null;
  export let titleColor = 'black';
  export let debugCheckbox = false;
</script>

<main>
    {#if title}
        <h1 id="app-title" style="color: {titleColor}">{title}</h1>
    {/if}

    {#if debugCheckbox}
        <div id="debug-wrapper">
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="debugCheckbox" bind:checked={debug}>
                <label class="form-check-label" for="debugCheckbox">Debug</label>
            </div>
        </div>
    {/if}
    <div id="chat-container">
        <ChatArea debug={debug}/>
    </div>
</main>

<style type="text/scss" global>
  @import "./bootstrap";

  main {
    margin: 0 auto;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
  }

  #app-title {
    text-align: center;
    font-size: 4em;
  }

  #debug-wrapper {
    display: flex;
    justify-content: right;
    padding: 10px;
  }

  #chat-container {
    flex: 1;
    overflow: hidden;
  }
</style>