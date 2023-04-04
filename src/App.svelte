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
  <h1>{kitty}</h1>
  <h2>{dsll} days since last loss</h2>
</main>

<style>
</style>
