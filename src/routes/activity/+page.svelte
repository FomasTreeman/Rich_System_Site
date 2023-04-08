<script>
  import { onMount } from "svelte";
  import Table from "../Table.svelte";

  let toggle = false;

  let kitty = 0;
  let todaysProfit = 0;
  let totalProfit = 0;
  let bestStreak = 0;
  let bestKitty = 0;
  let todaysSettled = [];
  let totalLiability = 0;
  let lastRace = "";
  let allTimeLiability = 0;
  let monthlyAVG = 0;
  let dailyAVG = 0;

  const URL = "https://rich-system.team-freeman.com";
  // const URL = "http://localhost:19000";

  function fetchData() {
    fetch(`${URL}/funds`)
      .then((response) => response.json())
      .then((data) => {
        kitty = data.funds;
        totalProfit = data.total;
      })
      .catch(() => (kitty = 99999));
    fetch(`${URL}/activity`)
      .then((response) => response.json())
      .then((data) => {
        bestStreak = data.best;
        todaysSettled = data.settled;
        bestKitty = data.bestKitty;
        lastRace = data.last;
        allTimeLiability = data.atl;
        monthlyAVG =
          Object.values(data.monthly).reduce((a, b) => a + b, 0) /
          Object.keys(data.monthly).length;
        dailyAVG =
          Object.values(data.daily).reduce((a, b) => a + b, 0) /
          Object.keys(data.daily).length;
      })
      .catch(console.log);
  }

  function twoDP(num, comma = true) {
    const two = Math.floor(num * 100) / 100;
    return two.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  onMount(() => {
    fetchData();
  });

  $: totalLiability = todaysSettled.reduce((acc, curr) => {
    return acc + curr.liability;
  }, 0);

  $: todaysProfit = todaysSettled.reduce((acc, curr) => {
    return acc + curr.profit;
  }, 0);

  // setInterval(() => {
  //   fetchData();
  // }, 10000);
</script>

<main class="flex col">
  <p>todays 🫰💸</p>
  <h1>
    £{twoDP(todaysProfit)}
  </h1>
  <h2>
    %{twoDP(
      todaysProfit != 0 ? (todaysProfit / (kitty - todaysProfit)) * 100 : 0
    )}
  </h2>
  <button
    style="background-color: {toggle ? 'inherit' : 'grey'}"
    on:click={() => (toggle = !toggle)}
  >
    SETTLED BETS
  </button>
  {#if toggle}
    <Table results={todaysSettled} />
  {/if}
  <section class="flex wrap">
    <li class="general">
      <p>trades</p>
      <h3>{Object.keys(todaysSettled).length}</h3>
    </li>
    <li class="general">
      <p>🔥</p>
      <h3>{bestStreak}</h3>
    </li>
    <li class="general">
      <p>avg 🔥</p>
      <h3>🧑‍💻</h3>
    </li>
    <li class="general">
      <p>final race</p>
      <h3>{lastRace}</h3>
    </li>
    <li class="trophies">
      <p>🏆</p>
      <h3>£{twoDP(bestKitty)}</h3>
    </li>
    <li class="trophies">
      <p>🏆 range</p>
      <h3>£{twoDP(kitty - bestKitty)}</h3>
    </li>
    <li class="return">
      <p>profit</p>
      <h3>£{twoDP(totalProfit)}</h3>
    </li>
    <li class="return">
      <p>ROI</p>
      <h3>
        %{((totalProfit / allTimeLiability) * 100).toString().substring(0, 6)}
      </h3>
    </li>
    <li class="special return">
      <p>weekly: £🧑‍💻</p>
      <p>monthly: £{twoDP(monthlyAVG)}</p>
      <p>daily: £{twoDP(dailyAVG)}</p>
    </li>
    <li class="lia">
      <p>todays avg liability</p>
      <h3>
        £{Object.keys(todaysSettled).length < 0
          ? twoDP(totalLiability / Object.keys(todaysSettled).length)
          : 0}
      </h3>
    </li>
    <li class="lia">
      <p>todays liability total</p>
      <h3>
        £{twoDP(totalLiability)}
      </h3>
    </li>
    <li class="lia">
      <p>overall liability</p>
      <h3>£{twoDP(allTimeLiability)}</h3>
    </li>
  </section>
  <!-- <section>
    <h2>🐎 in action</h2>
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/1ZQ2Q2Z3Z4Q"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </section> -->
  <br />
  <!-- <h2>in works</h2> -->
  <br />
  <img src="/work.gif" alt="making money gif with looney tunes" />
  <!-- <b>horses in action</b> -->
</main>

<style>
  .flex {
    display: flex;
    flex-direction: row;
    /* justify-content: space-between; */
  }

  .col {
    flex-direction: column;
  }

  /* .space-around {
    justify-content: space-around;
  } */

  .wrap {
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .special > * {
    text-align: start;
  }

  section {
    margin-top: 2rem;
  }

  li {
    list-style: none;
    text-align: center;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    padding-inline: 2rem;
    border-radius: 1rem;
    border: 1px solid grey;
    box-shadow: 5px 7px 9px 2px rgba(0, 0, 0, 0.25);
  }

  .general {
    background-color: blueviolet;
  }

  .trophies {
    background-color: orange;
  }

  .return {
    background-color: rgb(209, 104, 121);
  }

  .lia {
    background-color: rgb(137, 179, 54);
  }

  h3 {
    margin-top: auto;
    margin-bottom: 0px;
  }

  h1,
  h2,
  p {
    text-align: center;
    margin: 0px;
  }

  button {
    margin-inline: auto;
    margin-block: 1rem;
  }

  img {
    max-width: 100%;
  }
</style>
