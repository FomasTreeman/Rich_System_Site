<script>
  import { onMount } from "svelte";

  let nextRace = "";

  // const URL = "https://rich-system.team-freeman.com";

  const URL = "http://localhost:19000";

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

  p,
  b {
    margin: 0%;
  }
</style>
