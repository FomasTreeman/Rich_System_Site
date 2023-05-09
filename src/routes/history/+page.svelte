<script>
  import { noop } from "svelte/internal";
  import Table from "../Table.svelte";
  export let data;
  let history = data.history.history;
  let search = "";

  function filterNames() {
    console.log("B");
    console.log(history);
    history = data.history.history.filter((bet) => {
      if (typeof bet.selection !== "string") return false;
      return bet.selection.toLowerCase().includes(search.toLowerCase());
    });
  }

  function totalNamedHorses() {
    return data.history.history.filter(
      (bet) => typeof bet.selection === "string"
    ).length;
  }

  function totalNewHorses() {
    let repeated = [];
    data.history.history.forEach((bet) => {
      if (repeated.includes(bet.selection)) return;
      repeated.push(bet.selection);
    });
    return repeated.length;
  }
</script>

<input type="text" bind:value={search} name="search" on:input={filterNames} />
<!-- <b
  >{totalNamedHorses()} of our {data.history.history.length} are named. {totalNewHorses()}
  are only mentioned once, there are roughly 18,000 official horses, {Math.ceil(
    (100 / 18000) * data.history.history.length
  )}% there</b
> -->
<Table bind:results={history} />
