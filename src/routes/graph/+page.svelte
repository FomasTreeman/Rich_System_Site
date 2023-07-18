<script>
  import Chart from './Chart.svelte';

  export let data;
  let graphType = xy;
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
    const number = parseInt(
      date.split('-').reduce((acc, curr) => acc.concat(curr), '')
    );
    return number;
  }

  function filter(e, func) {
    return func().filter((day) => {
      return dateToInt(day.x) >= dateToInt(e.target.from.value) &&
        dateToInt(day.x) <= dateToInt(e.target.to.value)
        ? true
        : false;
    });
  }

  $: type = graphType();
</script>

<nav>
  <button
    on:click={() => {
      graphType = xy;
    }}>PROFIT</button
  >
  <button
    on:click={() => {
      graphType = kitty;
    }}>KITTY</button
  >
  <button
    on:click={() => {
      graphType = log;
    }}
    style="text-decoration: line-through; opacity: 0.5;">LOG</button
  >
</nav>
<form on:submit={(e) => (type = filter(e, graphType))}>
  <div>
    <label for="from"> from</label>
    <input
      type="date"
      id="from"
      value="2023-03-01"
      min={new Date('2023-03-25').toISOString().split('T')[0]}
      max={new Date().toISOString().split('T')[0]}
    />
  </div>
  <div>
    <label for="to"> to</label>
    <input
      type="date"
      id="to"
      value={new Date().toLocaleDateString('en-CA')}
      min={new Date('2023-03-25').toISOString().split('T')[0]}
      max={new Date().toISOString().split('T')[0]}
    />
  </div>
  <button type="submit">Filter</button>
</form>
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
