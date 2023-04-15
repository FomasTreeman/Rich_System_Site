<script>
  import Chart from "./Chart.svelte";

  export let data;
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
    type = xy().map((day) => ({ x: day.x, y: (acc += day.y) }));
  }

  function profit() {
    type = xy();
  }

  function log() {
    type = xy().map((day) => ({ x: day.x, y: Math.log(day.y) }));
  }
</script>

<nav>
  <button on:click={profit}>PROFIT</button>
  <button on:click={kitty}>KITTY</button>
  <button on:click={log}>LOG</button>
</nav>
<Chart {type} />

<style>
  nav {
    display: flex;
    justify-content: space-around;
    margin-block: 3rem;
  }
</style>
