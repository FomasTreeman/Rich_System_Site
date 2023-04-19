<script>
  import { onMount } from "svelte";

  let versions = [];
  export let URL;

  function dispatch(message) {
    if (!confirm(`Are you sure you want to deploy ${message}?`)) return;
    fetch(URL + "/git/dispatches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  onMount(async () => {
    const [tagRes, branchRes] = await Promise.all([
      fetch(URL + "/git/tags"),
      fetch(URL + "/git/branches"),
    ]);
    const [tagJson, branchJson] = await Promise.all([
      tagRes.json(),
      branchRes.json(),
    ]);
    versions = branchJson.concat(tagJson);
  });
</script>

<section class="flex">
  {#each versions as version}
    <button on:click={() => dispatch(version)}>{version}</button>
  {/each}
</section>

<style>
  .flex {
    flex-wrap: wrap;
    gap: 1rem;
  }

  section {
    margin: 2rem;
  }
</style>
