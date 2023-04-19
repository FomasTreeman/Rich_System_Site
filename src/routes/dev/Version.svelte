<script>
  import { onMount } from "svelte";

  let versions = [];
  export let URL;

  function dispatch(message) {
    console.log(message);
    if (!confirm(`Are you sure you want to deploy ${message}?`)) return;
    fetch(URL + "/git/dispatch", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: message,
    });
  }

  onMount(async () => {
    const [branchRes, tagRes] = await Promise.all([
      fetch(URL + "/git/branches"),
      fetch(URL + "/git/tags"),
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
