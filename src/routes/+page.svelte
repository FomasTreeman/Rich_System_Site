<script>
  import { onMount } from "svelte";

  let kitty = 0;
  let dsll = 0;

  const URL = "https://rich-system.team-freeman.com";
  // const URL = "http://localhost:19000";

  function fetchData() {
    fetch(`${URL}/funds`)
      .then((response) => response.json())
      .then((data) => (kitty = data.funds))
      .catch(() => (kitty = 35505));
    fetch(`${URL}/activity`)
      .then((response) => response.json())
      .then((data) => (dsll = data.days))
      .catch(() => (dsll = 35505));
  }

  onMount(() => {
    fetchData();
  });

  setInterval(() => {
    fetchData();
  }, 10000);
</script>

<main>
  <h1>£{kitty}</h1>
  <h2>{dsll} day streak</h2>
  <img
    src={`/${Math.floor(Math.random() * 9 + 1)}.gif`}
    alt="making money gif with looney tunes"
  />
</main>

<style>
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
