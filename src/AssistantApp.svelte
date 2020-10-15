<script>
  import ChatArea from './ChatArea.svelte';

  let debug = false;

  export let title = 'Hello Watson!';
  export let noTitle = false;
</script>

<main>
    {#if !noTitle}
        <h1>{title}</h1>
    {/if}

    <label>
        <input type="checkbox" bind:checked={debug}>
        Debug
    </label>
    <div class="chat-area">
        <ChatArea debug={debug}/>
    </div>
</main>

<style>
    main {
        text-align: center;
        margin: 0 auto;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    h1 {
        color: blue;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    .chat-area {
        flex: 1;
    }
</style>