<script>
  import Chart from "./Chart.svelte";

  export let data;
  let graphType = "xy";
  let type = xy();

  function xy() {
    return Object.entries(data.history.daily)
      .map((entry) => {
        const [x, y] = entry;
        return { x: x, y: y };
      })
      .reverse();
  }

  function kitty() {
    let acc = 840;
    return xy().map((day) => ({ x: day.x, y: (acc += day.y) }));
  }

  function log() {
    return xy().map((day) => ({ x: day.x, y: Math.log(day.y) }));
  }

  function dateToInt(date) {
    console.log(date);
    const number = parseInt(
      date.split("-").reduce((acc, curr) => acc.concat(curr), "")
    );
    return number;
  }

  function filterKitty(e) {
    console.log(e.target.from.value, e.target.to.value);
    return kitty().filter((day) => {
      return dateToInt(day.x) >= dateToInt(e.target.from.value) &&
        dateToInt(day.x) <= dateToInt(e.target.to.value)
        ? true
        : false;
    });
  }
</script>

<nav>
  <button
    on:click={() => {
      type = xy();
      graphType = "xy";
    }}>PROFIT</button
  >
  <button
    on:click={() => {
      type = kitty();
      graphType = "kitty";
    }}>KITTY</button
  >
  <button
    on:click={() => {
      type = log();
      graphType = "log";
    }}
    style="text-decoration: line-through; opacity: 0.5;">LOG</button
  >
</nav>
{#if graphType == "kitty"}
  <form on:submit={(e) => (type = filterKitty(e))}>
    <div>
      <label for="from"> from</label>
      <input type="date" id="from" value="2023-03-01" />
    </div>
    <div>
      <label for="to"> to</label>
      <input
        type="date"
        id="to"
        value={new Date().toLocaleDateString("en-CA")}
      />
    </div>
    <button type="submit">Filter</button>
  </form>
{/if}
<Chart {type} />

<style>
  nav {
    display: flex;
    justify-content: space-around;
    margin-block: 3rem;
  }

  form {
    display: flex;
    justify-content: center;
    margin-block: 3rem;
    gap: 1rem;
  }
</style>
