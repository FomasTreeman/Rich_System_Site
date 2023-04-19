<script>
  import { onMount } from "svelte";
  const URL = "https://api.github.com/repos/FomasTreeman/Rich_System";

  let versions = [];

  function dispatch(message) {
    if (!confirm(`Are you sure you want to deploy ${message}?`)) return;
    fetch(URL + "/dispatches", {
      method: "POST",
      headers: {
        Accept: "application/vnd.github.everest-preview+json",
        "Content-Type": "application/json",
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify({
        event_type: "trigger_workflow",
        client_payload: {
          message: message,
        },
      }),
    });
  }

  onMount(async () => {
    const [tagRes, branchRes] = await Promise.all([
      fetch(URL + "/tags", {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
      }),
      fetch(URL + "/branches", {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
      }),
    ]);
    versions = [...(await branchRes.json()), ...(await tagRes.json())];
  });
</script>

<section class="flex">
  {#each versions as version}
    <button on:click={() => dispatch(version.name)}>{version.name}</button>
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
