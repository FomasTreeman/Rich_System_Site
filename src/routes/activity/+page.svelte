<script>
  // import { onMount } from "svelte";
  import Table from "../Table.svelte";

  let toggleA = false;

  export let data;

  let todaysProfit = 0;
  let totalLiability = 0;

  function twoDP(num, comma = true) {
    const two = Math.floor(num * 100) / 100;
    return two.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  $: totalLiability = data.activity.settled.reduce((acc, curr) => {
    return acc + curr.liability;
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
    <!-- <button>back</button>
    <button>lay</button> -->
    <Table results={data.activity.settled} />
  {/if}
  {#if data.activity.open.length > 0}
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
      <p>trades</p>
      <h3>{Object.keys(data.activity.settled).length}</h3>
    </li>
    <li class="general">
      <p>🔥</p>
      <h3>{data.activity.best}</h3>
    </li>
    <li class="general">
      <p>final race</p>
      <h3>{data.activity.last}</h3>
    </li>
    <li class="general">
      <p>races today</p>
      <h3>{data.activity.totalRaces}</h3>
    </li>
    <li class="trophies">
      <p>🏆</p>
      <h3>£{twoDP(data.activity.bestKitty)}</h3>
    </li>
    <li class="trophies">
      <p>🏆 range</p>
      <h3>£{twoDP(data.activity.funds - data.activity.bestKitty)}</h3>
    </li>
    <li class="return">
      <p>profit</p>
      <h3>£{twoDP(data.activity.total)}</h3>
    </li>

    <li class="lia">
      <p>todays avg liability</p>
      <h3>
        £{Object.keys(data.activity.settled.filter((bet) => bet.side != "BACK"))
          .length > 0
          ? twoDP(
              totalLiability /
                Object.keys(
                  data.activity.settled.filter((bet) => bet.side != "BACK")
                ).length
            )
          : 0}
      </h3>
    </li>
    <li class="lia">
      <p>todays liability total</p>
      <h3>
        £{twoDP(totalLiability)}
      </h3>
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
