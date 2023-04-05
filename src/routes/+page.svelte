<script>
  import { onMount } from "svelte";

  let kitty = 0;
  let dsll = 0;
  const IP = "https://rich-system.team-freeman.com";

  function fetchData() {
    fetch(`${IP}/funds`)
      .then((response) => response.json())
      .then((data) => (kitty = data.funds))
      .catch(() => (kitty = 35505));
    fetch(`${IP}/dsll`)
      .then((response) => response.json())
      .then((data) => (dsll = data.days))
      .catch(() => (dsll = 35505));
  }

  onMount(() => {
    fetchData();
  });
</script>

<main>
  <h1>£{kitty}</h1>
  <h2>{dsll} days streak</h2>
  <img src="/giphy.gif" alt="making money gif with looney tunes" />
</main>

<style>
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  main {
    margin: 0;
    width: 50%;
    display: flex;
    place-items: center;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
  }

  img {
    max-width: 100%;
  }

  h1 {
    font-size: 3.2em;
    line-height: 1.1;
    margin: 0%;
  }
</style>
