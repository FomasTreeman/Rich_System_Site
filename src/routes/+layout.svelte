<script>
  import { onMount } from "svelte";

  let nextRace = "";
  let toggle = false;
  const URL = "https://rich-system.team-freeman.com";

  // const URL = "http://localhost:19000";

  function fetchData() {
    fetch(`${URL}/activity`)
      .then((response) => response.json())
      .then((data) => {
        nextRace = data.next;
      })
      .catch(() => (nextRace = "error"));
  }

  onMount(() => {
    fetchData();
  });
</script>

<header>
  <a href="/"> HOME </a>
  <a href="/activity"> ACTIVITY </a>
  <button on:click={() => (toggle = !toggle)}> 🔽 </button>
  {#if toggle}
    <ul>
      <a href="/graph"> GRAPH </a>
      <a href="/history"> HISTORY </a>
    </ul>
  {/if}
  <div class="top-right">
    <p>next race</p>
    <b>{nextRace}</b>
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
    gap: 0.5rem;
    background-color: rgba(28, 26, 26, 0.3);
    top: 100%;
    left: -1.5rem;
    width: 100%;
    border: 3px solid black;
    border-radius: 1rem;
    padding-block: 0.5rem;
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
