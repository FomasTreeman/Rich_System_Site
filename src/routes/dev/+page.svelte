<script>
  import Login from "./Login.svelte";
  import user from "../../user";
  import Custom from "./Custom.svelte";
  import Presets from "./Presets.svelte";
  import Version from "./Version.svelte";

  const URL = "https://rich-system.team-freeman.com";

  let userName;
  let active = "";

  function toggleContent(content) {
    active = content;
  }

  user.subscribe((value) => {
    userName = value;
  });
</script>

{#if userName != null}
  <h1>Hi {userName}!</h1>
  <nav class="flex">
    <button on:click={() => toggleContent("customize")}>custom</button>
    <button on:click={() => toggleContent("presets")}>presets</button>
    <button on:click={() => toggleContent("version")}>version</button>
  </nav>
  {#if active == "customize"}
    <Custom {URL} />
  {:else if active == "presets"}
    <Presets {URL} />
  {:else if active == "version"}
    <Version {URL} />
  {/if}
{:else}
  <Login {URL} />
{/if}

<style>
  h1 {
    margin-left: 2rem;
  }
  nav {
    margin-top: 2rem;
  }
  nav > button {
    background-color: rgb(66, 71, 71);
  }
  .flex {
    justify-content: space-around;
  }
</style>
