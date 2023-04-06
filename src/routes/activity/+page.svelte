<script>
  import { onMount } from "svelte";

  let toggle = false;

  let kitty = 0;
  let todaysProfit = 0;
  let totalProfit = 0;
  let bestStreak = 0;
  let bestKitty = 0;
  let todaysSettled = [];

  const URL = "https://rich-system.team-freeman.com";
  // const URL = "http://localhost:19000";

  function fetchData() {
    fetch(`${URL}/funds`)
      .then((response) => response.json())
      .then((data) => {
        kitty = data.funds;
        totalProfit = data.total;
      })
      .catch(() => (kitty = 35505));
    fetch(`${URL}/activity`)
      .then((response) => response.json())
      .then((data) => {
        bestStreak = data.best;
        todaysSettled = data.settled;
        bestKitty = data.bestKitty;
      })
      .catch(() => (dsll = 35505));
  }

  function calculateRed(price) {
    if (price > 110) {
      // return 10;
      return 255 - (Math.floor((price - 20) * (255 / 90)) - 255);
    } else return 255;
  }

  function calculateGreen(price) {
    if (price < 110) {
      return Math.floor((price - 20) * (255 / 90));
    } else return 255;
  }

  onMount(() => {
    fetchData();
  });

  $: todaysProfit =
    Math.floor(
      todaysSettled.reduce((acc, curr) => {
        return acc + curr.profit;
      }, 0) * 100
    ) / 100;

  setInterval(() => {
    fetchData();
  }, 10000);
</script>

<main class="flex col">
  <p>todays profit:</p>
  <h1>£{todaysProfit}</h1>

  <button on:click={() => (toggle = !toggle)}> SETTLED BETS </button>
  {#if toggle}
    <table>
      <tr>
        <th>time</th>
        <th>horse</th>
        <th>side</th>
        <th>odds</th>
        <th>risk</th>
        <th>profit</th>
      </tr>
      {#if todaysSettled.length === 0}
        <tr>
          <td colspan="6">no settled bets</td>
        </tr>
      {/if}
      {#each todaysSettled as { time, selection, side, price, liability, profit }}
        <tr>
          <td>{time}</td>
          <td>{selection}</td>
          <td>{side}</td>
          <td
            style="background-color: rgba({calculateRed(price)}, 
            {calculateGreen(price)}, 1, 1)">{price}</td
          >
          <td>£{Math.floor(liability * 100) / 100}</td>
          {#if profit < 0}
            <td style="background-color: rgba(240, 1, 1, 0.3)">£{profit}</td>
          {:else}
            <td style="background-color: rgba(1, 240, 1, 0.3)">£{profit}</td>
          {/if}
        </tr>
      {/each}
    </table>
  {/if}
  <section class="flex wrap">
    <li>
      <p>🔥</p>
      <h3>{bestStreak}</h3>
    </li>
    <li>
      <p>best pussy:</p>
      <h3>£{bestKitty}</h3>
    </li>
    <li>
      <p>range from best:</p>
      <h3>£{Math.floor(kitty - bestKitty)}</h3>
    </li>
    <li>
      <p>overall profit:</p>
      <h3>£{totalProfit}</h3>
    </li>
  </section>
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
    justify-content: space-between;
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
    border-radius: 1rem;
    border: 1px solid grey;
  }

  h3 {
    margin-top: auto;
    margin-bottom: 0px;
  }

  h1,
  p {
    text-align: center;
    margin: 0px;
  }

  img {
    max-width: 100%;
  }

  button {
    margin-inline: auto;
    margin-block: 1rem;
  }

  table {
    width: 100%;
    table-layout: fixed;
  }

  th,
  tr {
    font-size: medium;
  }

  table,
  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
    overflow: hidden;
  }
</style>
