<script>
  let toggle = false;
  export let data;

  function hide() {
    toggle = false;
  }
</script>

<header>
  <a href="/"> HOME </a>
  <a href="/activity"> ACTIVITY </a>
  <button on:click={() => (toggle = !toggle)}> 🔽 </button>
  {#if toggle}
    <ul>
      <a href="/woman" on:click={hide}> WOMAN </a>
      <a href="/graph" on:click={hide}> GRAPH </a>
      <a href="/history" on:click={hide}> HISTORY </a>
      <a href="/dev" on:click={hide}> DEV </a>
    </ul>
  {/if}
  <div class="top-right">
    <p>next race</p>
    <b>{data.activity.next}</b>
  </div>
</header>

<slot />

<style>
  header {
    margin-block: 1.5rem;
    margin-inline: 1.5rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    z-index: 99;
    position: relative;
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
