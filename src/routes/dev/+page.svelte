<script>
  import { onMount } from "svelte";
  import Login from "./Login.svelte";
  import user from "../../user";
  import Custom from "./Custom.svelte";

  //   const URL = "https://rich_system.team-freeman.com";
  const URL = "http://localhost:19000";

  let settings = {};
  let userName;
  let customize = false;
  let presets = false;

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

  function togglePresets() {
    presets = !presets;
    customize = false;
  }

  function toggleCustomize() {
    customize = !customize;
    presets = false;
  }

  user.subscribe((value) => {
    userName = value;
  });

  onMount(async () => {
    const res = await fetch(`${URL}/settings`);
    const data = await res.json();
    settings = data;
  });
</script>

{#if userName != null}
  <article class="flex col">
    <h1>Hi {userName}!</h1>
    <button on:click={submit}>SUBMIT SETTINGS</button>
  </article>
  <nav class="flex">
    <button on:click={toggleCustomize}>custom</button>
    <button on:click={togglePresets}>presets</button>
    <button>version</button>
  </nav>
  {#if customize}
    <Custom bind:settings />
  {:else if presets}
    <section>
      <button>
        {JSON.stringify({
          back: {
            on: true,
            percent: 0.5,
            max: 250,
            min: 40,
          },
          lay: {
            on: true,
            percent: 12.5,
            max: 200,
            min: 40,
          },
        })}
      </button>
    </section>
  {/if}
{:else}
  <Login />
{/if}

<style>
  nav {
    margin-top: 2rem;
  }
  nav > button {
    background-color: rgb(66, 71, 71);
  }

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
</style>
