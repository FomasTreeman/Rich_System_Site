<script>
  // import { onMount } from "svelte";
  import Table from "../Table.svelte";

  export let data;

  let toggleA = false;

  function twoDP(num, comma = true) {
    const two = Math.floor(num * 100) / 100;
    return two.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  function atl() {
    const allTime = data.history.history.reduce((acc, curr) => {
      if (curr.side == "BACK") return acc + curr.liability / curr.price;
      if (curr.side == "LAY") return acc + curr.liability;
    }, 0);
    return allTime;
  }

  function getStreaks() {
    let streaks = [];
    let index = 0;
    data.history.history.forEach((bet) => {
      if (bet.side === "BACK") return;
      if (bet.profit > 0) {
        if (!streaks[index]) streaks[index] = 0;
        streaks[index] += 1;
      } else {
        if (!streaks[index]) return;
        index += 1;
      }
    });
    return streaks;
  }

  function avgStreak() {
    const streaks = getStreaks();
    return Math.floor(streaks.reduce((a, b) => a + b, 0) / streaks.length);
  }

  $: monthlyAVG =
    Object.values(data.history.monthly).reduce((a, b) => a + b, 0) /
    Object.keys(data.history.monthly).length;

  $: dailyAVG =
    Object.values(data.history.daily).reduce((a, b) => a + b, 0) /
    Object.keys(data.history.daily).length;

  $: totalLiability = data.activity.settled.reduce((acc, curr) => {
    return curr.side == "LAY"
      ? acc + curr.liability
      : acc + curr.liability / curr.price;
  }, 0);

  $: todaysProfit = data.activity.settled.reduce((acc, curr) => {
    return acc + curr.profit;
  }, 0);
</script>

<main class="flex col">
  <p>todays 🫰💸</p>
  <h1>
    £{twoDP(todaysProfit)}
  </h1>
  <h2>
    %{twoDP(
      todaysProfit != 0
        ? (todaysProfit / (data.activity.funds - todaysProfit)) * 100
        : 0
    )}
  </h2>
  <div class="flex">
    <button
      style="background-color: {toggleA ? 'inherit' : 'grey'}"
      on:click={() => (toggleA = !toggleA)}
    >
      SETTLED BETS
    </button>
  </div>
  {#if toggleA}
    <Table results={data.activity.settled} />
    <p>Total trades: {Object.keys(data.activity.settled).length}</p>
  {/if}
  {#if data.activity.open != null}
    <table>
      <caption>🐎 open 🐎 </caption>
      <tr>
        <th>selection</th>
        <th>side</th>
        <th>price</th>
        <th>size</th>
      </tr>
      {#each data.activity.open as bet}
        <tr>
          <td>{bet.selection}</td>
          <td>{bet.side}</td>
          <td>{bet.price}</td>
          <td>{bet.size}</td>
        </tr>
      {/each}
    </table>
  {/if}
  <section class="flex wrap">
    <li class="general">
      <p>final race</p>
      <h3>{data.activity.last}</h3>
    </li>
    <li class="general">
      <p>races</p>
      <h3>{data.activity.totalRaces}</h3>
    </li>
    <li class="general">
      <p>🔥</p>
      <h3>{avgStreak()}</h3>
    </li>
    <li class="general">
      <p>losses</p>
      <h3>{getStreaks().length - 1}</h3>
    </li>

    <li class="lia">
      <p>avg liabil</p>
      <h3>
        £{twoDP(
          data.activity.settled.reduce(
            (acc, curr) => (curr.side == "LAY" ? acc + curr.liability : acc),
            0
          ) / data.activity.settled.filter((bet) => bet.side == "LAY").length ||
            0
        )}
      </h3>
    </li>
    <li class="lia">
      <p>liabl total</p>
      <h3>
        £{twoDP(totalLiability)}
      </h3>
    </li>
    <li class="lia">
      <p>total liabl</p>
      <h3>£{twoDP(atl())}</h3>
    </li>
    <li class="return">
      <p>profit</p>
      <h3>£{twoDP(data.activity.funds - 840)}</h3>
    </li>

    <li class="return">
      <p>ROI</p>
      <h3>
        %{((Math.floor(data.activity.funds - 840) / atl()) * 100)
          .toString()
          .substring(0, 6)}
      </h3>
    </li>
    <li class="special return">
      <p>weekly: £🧑‍💻</p>
      <p>monthly: £{twoDP(monthlyAVG)}</p>
      <p>daily: £{twoDP(dailyAVG)}</p>
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
</main>

<style>
  /* .space-around {
    justify-content: space-around;
  } */

  .wrap {
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  section {
    margin-top: 2rem;
  }

  .general {
    background-color: blueviolet;
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
</style>
