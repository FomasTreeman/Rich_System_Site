<script>
  let back = true;
  let lay = true;
  let backPerc = 0.5;
  let layPerc = 12.5;
</script>

<section class="flex">
  <div class="flex col">
    <h2>lay</h2>
    <input
      type="checkbox"
      checked={lay}
      on:change={(e) => {
        lay = e.target.checked;
      }}
      id="lay"
    />
  </div>
  <div class="flex col">
    <h2>back</h2>
    <input
      type="checkbox"
      checked={back}
      on:change={(e) => {
        back = e.target.checked;
      }}
      id="back"
    />
  </div>
</section>
<section class="flex">
  <div class="slider">
    <label for="layPerc">%</label>
    <input
      type="number"
      value={layPerc}
      min="0"
      max="50"
      step="0.5"
      on:change={(e) => {
        layPerc = e.target.value;
      }}
      id="layPerc"
    />
    <input
      type="range"
      min="15"
      max="50"
      step="0.5"
      value={layPerc}
      on:change={(e) => {
        layPerc = e.target.value;
      }}
    />
  </div>
  <div class="slider">
    <label for="backPerc">%</label>
    <input
      type="number"
      value={backPerc}
      min="0"
      max="50"
      step="0.05"
      on:change={(e) => {
        backPerc = e.target.value;
      }}
      id="backPerc"
    />
    <input
      type="range"
      min="0"
      max="50"
      step="0.05"
      value={backPerc}
      on:change={(e) => {
        backPerc = e.target.value;
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
