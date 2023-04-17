<script>
  //   import { onMount } from "svelte";

  export let settings;

  //   onMount(async () => {
  //     const res = await fetch(URL + "/settings", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(settings),
  //     });
  //     const data = await res.json();
  //     console.log(data);
  //     settings = data;
  //   });
  $: console.log(settings);
</script>

<section class="flex">
  <div class="flex col">
    <h2>lay</h2>
    <input
      type="checkbox"
      checked={settings.lay.on}
      on:change={(e) => {
        settings.lay.on = e.target.checked;
      }}
      id="lay"
    />
  </div>
  <div class="flex col">
    <h2>back</h2>
    <input
      type="checkbox"
      checked={settings.back.on}
      on:change={(e) => {
        settings.back.on = e.target.checked;
      }}
      id="back"
    />
  </div>
</section>
<section class="flex">
  <div>
    <label for="layMin">min: </label>
    <input
      type="number"
      value={settings.lay.min}
      min="0"
      max="50"
      step="0.5"
      on:change={(e) => {
        settings.lay.min = e.target.value;
      }}
      id="layPerc"
    />
  </div>
  <div>
    <label for="backMin">min: </label>
    <input
      type="number"
      value={settings.back.min}
      min="0"
      max="50"
      step="0.5"
      on:change={(e) => {
        settings.back.min = e.target.value;
      }}
      id="backMin"
    />
  </div>
</section>
<section class="flex" style="margin-top: 0.5rem">
  <div>
    <label for="layMax">max: </label>
    <input
      type="number"
      value={settings.lay.max}
      min="5"
      max="200"
      step="1"
      on:change={(e) => {
        settings.lay.max = e.target.value;
      }}
      id="layMin"
    />
  </div>
  <div>
    <label for="backMax">max: </label>
    <input
      type="number"
      value={settings.back.max}
      min="0"
      max="50"
      step="0.5"
      on:change={(e) => {
        settings.back.max = e.target.value;
      }}
      id="backMax"
    />
  </div>
</section>
<!-- percentages -->
<section class="flex">
  <div class="slider">
    <label for="layPerc">%</label>
    <input
      type="number"
      value={settings.lay.percent}
      min="0"
      max="50"
      step="0.5"
      on:change={(e) => {
        settings.lay.percent = e.target.value;
      }}
      id="layPerc"
    />
    <input
      type="range"
      min="0"
      max="50"
      step="0.5"
      value={settings.lay.percent}
      on:change={(e) => {
        settings.lay.percent = e.target.value;
      }}
    />
  </div>
  <div class="slider">
    <label for="backPerc">%</label>
    <input
      type="number"
      value={settings.back.percent}
      min="0"
      max="50"
      step="0.05"
      on:change={(e) => {
        settings.back.perc = e.target.value;
      }}
      id="backPerc"
    />
    <input
      type="range"
      min="0"
      max="50"
      step="0.05"
      value={settings.back.percent}
      on:change={(e) => {
        settings.back.percent = e.target.value;
      }}
      id="backPerc"
    />
  </div>
</section>

<style>
  section {
    margin-top: 3rem;
    height: fit-content;
  }

  .flex {
    justify-content: space-around;
  }

  .slider {
    position: relative;
  }

  .slider :last-child {
    position: absolute;
    top: 12rem;
    right: -3rem;
  }

  input[type="checkbox"] {
    scale: 3;
    width: min-content;
    align-self: center;
  }

  input[type="range"] {
    width: 10rem;
    scale: 2;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    transform: rotate(90deg);
  }
</style>
