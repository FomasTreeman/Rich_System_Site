<script>
  import Table from '../Table.svelte';
  export let data;
  let history = data.history.history;
  let search = '';
  let searchPrice = 0;
  let searchLosses = false;
  let losses = 0;

  function filterNames() {
    history = data.history.history.filter((bet) => {
      if (typeof bet.selection !== 'string') return false;
      return bet.selection.toLowerCase().includes(search.toLowerCase());
    });
  }

  function filterOdds() {
    if (searchPrice < 20) return (history = data.history.history);
    if (typeof searchPrice != 'number') return;
    history = data.history.history.filter((bet) => {
      return bet.price <= searchPrice ? true : false;
    });
  }

  function filterLosses() {
    console.log(searchLosses);
    if (searchLosses == true) return (history = data.history.history);
    history = data.history.history.filter((bet) => {
      if (bet.side == 'BACK') return false;
      return Math.sign(bet.profit) === 1 ? false : true;
    });
  }

  function lossCount() {
    let count = 0;
    history.forEach((bet) => {
      if (Math.sign(bet.profit) === 1 || bet.side == 'BACK') return;
      count++;
    });
    return count;
  }

  // function totalNamedHorses() {
  //   return data.history.history.filter(
  //     (bet) => typeof bet.selection === "string"
  //   ).length;
  // }

  // function totalNewHorses() {
  //   let repeated = [];
  //   data.history.history.forEach((bet) => {
  //     if (repeated.includes(bet.selection)) return;
  //     repeated.push(bet.selection);
  //   });
  //   return repeated.length;
  // }

  $: if (history) losses = lossCount();
</script>

<div class="grid">
  <label for="searchNames"> Names </label>
  <input
    id="searchNames"
    type="text"
    bind:value={search}
    name="searchNames"
    placeholder="Name"
    on:input={filterNames}
  />
  <label for="searchPrice"> Odds </label>
  <input
    id="searchPrice"
    type="number"
    bind:value={searchPrice}
    name="searchPrice"
    on:input={filterOdds}
  />
  <label for="searchLosses"> Losses </label>
  <input
    id="searchLosses"
    type="checkbox"
    bind:checked={searchLosses}
    name="searchLosses"
    on:input={filterLosses}
  />
</div>
<div class="flex space-between">
  <b> = {losses} lay losses</b>
  <a
    href="data:text/json;charset=utf-8,{JSON.stringify(history)}"
    class="downloadAnchorNode"
    download="history.json"
  >
    Download JSON
  </a>
</div>
<!-- <b
  >{totalNamedHorses()} of our {data.history.history.length} are named. {totalNewHorses()}
  are only mentioned once, there are roughly 18,000 official horses, {Math.ceil(
    (100 / 18000) * data.history.history.length
    )}% there</b
> -->
<Table bind:results={history} />

<style>
  .space-between {
    justify-content: space-between;
    margin-inline: 1rem;
  }
  .grid {
    display: grid;
    margin: 1rem;
    margin-top: 0rem;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    margin-bottom: 1rem;
  }
  input {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    max-width: 20ch;
  }
</style>
