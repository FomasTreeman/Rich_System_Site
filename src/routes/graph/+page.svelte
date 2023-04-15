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

  function reg() {
    const oldData = xy();
    const newData = oldData.map((coord) => {
      return { x: Math.floor(Date.parse(coord.x) / 1000000), y: coord.y };
    });
    console.log(newData);
    const n = newData.length;
    let xSum = 0,
      ySum = 0,
      xySum = 0,
      xSqSum = 0;
    for (let i = 0; i < n; i++) {
      xSum += newData[i].x;
      ySum += newData[i].y;
      xySum += newData[i].x * newData[i].y;
      xSqSum += newData[i].x * newData[i].x;
    }
    const slope = (n * xySum - xSum * ySum) / (n * xSqSum - xSum * xSum);
    const yIntercept = (ySum - slope * xSum) / n;
    type = newData.map((day, i) => ({
      x: oldData[i].x,
      y: slope * day.x + yIntercept,
    }));
  }
</script>

<nav>
  <button on:click={profit}>PROFIT</button>
  <button on:click={kitty}>KITTY</button>
  <!-- <button on:click={log}>LOG</button> -->
  <button on:click={reg}>REG</button>
</nav>
<Chart {type} />

<style>
  nav {
    display: flex;
    justify-content: space-around;
    margin-block: 3rem;
  }
</style>
