<script>
  import { onMount } from "svelte";
  let todaysProfit = 0;
  let totalProfit = 0;
  let bestStreak = 0;

  const URL = "http://localhost:19000";

  function fetchData() {
    fetch(`${URL}/funds`)
      .then((response) => response.json())
      .then((data) => {
        todaysProfit = data.today;
        totalProfit = data.total;
      })
      .catch(() => (kitty = 35505));
    fetch(`${URL}/activity`)
      .then((response) => response.json())
      .then((data) => (bestStreak = data.best))
      .catch(() => (dsll = 35505));
  }

  onMount(() => {
    fetchData();
  });
</script>

<main>
  <p>best streak: {bestStreak}</p>
  <p>todays profit so far: £{todaysProfit}</p>
  <p>total profit: £{totalProfit}</p>
  <br />
  <p>in works</p>
  <img src="/work.gif" alt="making money gif with looney tunes" />
  <hr style="width: 100%" />
  <p>horses in action</p>
  <p>todays settled</p>
</main>

<style>
  img {
    max-width: 100%;
  }

  main {
    display: flex;
    flex-direction: column;
  }

  p {
    font-size: 1.5rem;
  }
</style>
