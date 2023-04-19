<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let settings = {};
  function submit() {
    if (confirm("Are you sure you want to submit these settings?")) {
      console.log("submitting");
      dispatch("submit", settings);
    }
  }

  function inferType(value) {
    if (typeof value == "boolean") return "checkbox";
    if (typeof value == "number") return "number";
    return "text";
  }
</script>

<form class="flex">
  <button on:click={submit}>SUBMIT SETTINGS</button>
  {#each Object.entries(settings) as [key, value]}
    <div class="flex col">
      <label for={key}>{key}</label>
      {#if inferType(value) == "checkbox"}
        <input
          type="checkbox"
          checked={value}
          on:change={(e) => {
            settings[key] = e.target.checked;
          }}
          id={key}
        />
      {:else if inferType(value) == "number"}
        <input
          type="number"
          {value}
          step="0.5"
          on:change={(e) => {
            settings[key] = e.target.value;
          }}
          id={key}
        />
      {:else}
        <input
          type="text"
          {value}
          on:change={(e) => {
            settings[key] = e.target.value;
          }}
          id={key}
        />
      {/if}
    </div>
  {/each}
</form>

<style>
  form {
    margin-top: 3rem;
    height: fit-content;
  }

  .flex {
    /* justify-content: space-around; */
    flex-wrap: wrap;
    gap: 2rem;
  }

  input[type="checkbox"] {
    scale: 3;
    width: min-content;
    align-self: center;
  }

  input[type="number"] {
    width: 5ch;
  }
  /* 
    input[type="range"] {
      width: 10rem;
      scale: 2;
      -webkit-transform: rotate(90deg);
      -moz-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      -o-transform: rotate(90deg);
      transform: rotate(90deg);
    }
  
    .slider {
      position: relative;
    }
  
    .slider :last-child {
      position: absolute;
      top: 12rem;
      right: -3rem;
    } */
</style>
