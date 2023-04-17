<script>
  import Login from "./Login.svelte";
  import user from "../../user";

  //   const URL = "https://rich_system.team-freeman.com";
  const URL = "http://localhost:19000";

  let settings = {
    back: {
      on: true,
      perc: 0.5,
      min: 0.5,
      max: 50,
    },
    lay: {
      on: true,
      perc: 12.5,
      min: 0.5,
      max: 50,
    },
  };
  let userName;

  function submit() {
    fetch(`${URL}/settings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settings),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  user.subscribe((value) => {
    userName = value;
  });
  $: console.log(userName);
</script>

{#if userName != null}
  <article class="flex col">
    <h1>Hi {userName}!</h1>
    <button>SUBMIT SETTINGS</button>
  </article>

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
  <section class="flex">
    <div class="slider">
      <label for="layPerc">%</label>
      <input
        type="number"
        value={settings.lay.perc}
        min="0"
        max="50"
        step="0.5"
        on:change={(e) => {
          settings.lay.perc = e.target.value;
        }}
        id="layPerc"
      />
      <input
        type="range"
        min="15"
        max="50"
        step="0.5"
        value={settings.lay.perc}
        on:change={(e) => {
          settings.lay.perc = e.target.value;
        }}
      />
    </div>
    <div class="slider">
      <label for="backPerc">%</label>
      <input
        type="number"
        value={settings.back.perc}
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
        value={settings.back.perc}
        on:change={(e) => {
          settings.back.perc = e.target.value;
        }}
        id="backPerc"
      />
    </div>
  </section>
{:else}
  <Login />
{/if}

<style>
  section {
    margin-top: 3rem;
    height: fit-content;
  }

  .flex {
    justify-content: space-around;
  }

  article.flex {
    align-items: center;
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
