<script>
  import { onMount } from "svelte";

  let toggle = false;

  let todaysProfit = 0;
  let totalProfit = 0;
  let bestStreak = 0;
  let todaysSettled = [];

  // const URL = "https://rich-system.team-freeman.com";
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
      .then((data) => {
        bestStreak = data.best;
        todaysSettled = data.settled;
      })
      .catch(() => (dsll = 35505));
  }

  onMount(() => {
    fetchData();
  });

  // $: console.log(todaysSettled);
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
      {#each todaysSettled as { time, selection, side, odds, liability, profit }}
        <tr>
          <td>{time}</td>
          <td>{selection}</td>
          <td>{side}</td>
          <td>{odds}</td>
          <td>{liability}</td>
          <td>{profit}</td>
        </tr>
      {/each}
    </table>
  {/if}
  <h3>best streak: {bestStreak}</h3>
  <h3>total profit: £{totalProfit}</h3>
  <br />
  <h2>in works</h2>
  <img src="/work.gif" alt="making money gif with looney tunes" />
  <hr style="width: 100%" />
  <b>horses in action</b>
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
