<script>
  let toggle = false;

  export let data;
</script>

<header>
  <a href="/"> HOME </a>
  <a href="/activity"> ACTIVITY </a>
  <button on:click={() => (toggle = !toggle)}> 🔽 </button>
  {#if toggle}
    <ul>
      <a href="/graph" on:click={() => (toggle = false)}> GRAPH </a>
      <a href="/history" on:click={() => (toggle = false)}> HISTORY </a>
      <a href="/dev" on:click={() => (toggle = false)}> DEV </a>
    </ul>
  {/if}
  <div class="top-right">
    <p>next race</p>
    <b>{data?.activity?.next || '⏳'}</b>
  </div>
</header>

<slot />

<style>
  header {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    gap: 2rem;
    padding-block: 1.5rem;
    padding-inline: 1.5rem;
    z-index: 99;
    background-color: rgb(36, 36, 36);
  }

  a {
    font-weight: 500;
    color: greenyellow;
    text-decoration: inherit;
  }

  a:hover {
    color: green;
  }

  div {
    text-align: center;
    margin-left: auto;
  }

  ul {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: rgba(80, 70, 70, 0.941);
    top: 100%;
    left: 9rem;
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 5px 7px 9px 2px rgba(0, 0, 0, 0.25);
  }

  ul > a {
    text-decoration: underline;
  }

  p,
  b {
    margin: 0%;
  }

  button {
    padding: 0px;
    background-color: transparent;
    border-radius: 0px;
    box-shadow: none;
  }
</style>
