<script>
  export let results = [];
  let currentDay = "";
  let filteredResults = results;
  let range = 500;

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

  function twoDP(num, comma = true) {
    const two = Math.floor(num * 100) / 100;
    return two.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  function isNewDay(time) {
    if (time.length == 5) return false;
    if (currentDay == "") {
      currentDay = time.split("/")[2];
      return true;
    } else if (time.split("/")[2] !== currentDay) {
      currentDay = time.split("/")[2];
      return true;
    } else return false;
  }

  function filterResults(type) {
    if (type === "BACK") {
      filteredResults = results.filter((result) => result.side === "BACK");
    } else if (type === "LAY") {
      filteredResults = results.filter((result) => result.side === "LAY");
    } else {
      filteredResults = results;
    }
  }
</script>

<div>
  <button on:click={() => filterResults("BACK")}> back </button>
  <button on:click={() => filterResults("LAY")}> lay </button>
  <button on:click={() => filterResults("ALL")}> all </button>
</div>
<table>
  <tr>
    <th>time</th>
    <th>horse</th>
    <th>side</th>
    <th>odds</th>
    <th>price * stake</th>
    <th>profit</th>
  </tr>
  {#if filteredResults.length === 0}
    <tr>
      <td colspan="6">no settled bets</td>
    </tr>
  {/if}
  {#each filteredResults.slice(0, range) as { time, selection, side, price, liability, profit }, i}
    {#if i != range - 1}
      {#if isNewDay(time)}
        <tr class="day">
          <td colspan="6">{time.substring(0, 10)}</td>
        </tr>
      {/if}
      <tr>
        <td>{time.length > 5 ? time.split("/")[2] : time}</td>
        <td>{selection}</td>
        <td>{side}</td>
        <td
          style="background-color: rgba({calculateRed(price)}, 
            {calculateGreen(price)}, 1, 0.4)">{price}</td
        >
        <td>£{twoDP(liability)}</td>
        {#if profit < 0}
          <td style="background-color: rgba(240, 1, 1, 0.3)">£{profit}</td>
        {:else}
          <td style="background-color: rgba(1, 240, 1, 0.3)">£{profit}</td>
        {/if}
      </tr>
    {:else}
      <td colspan="6" id="more">
        <button on:click={() => (range += 500)}>more</button>
      </td>
    {/if}
  {/each}
</table>

<style>
  .day {
    text-align: center;
    background-color: grey;
  }

  div {
    display: flex;
    justify-content: end;
    gap: 1rem;
    margin: 1rem;
  }

  div > * {
    background-color: black;
  }

  #more {
    text-align: center;
    height: 5rem;
  }

  #more > button {
    background-color: rgb(97, 84, 84);
    color: white;
    font-size: 2rem;
    margin-block: 2rem;
    border-radius: 4rem;
    width: 50%;
  }
</style>
