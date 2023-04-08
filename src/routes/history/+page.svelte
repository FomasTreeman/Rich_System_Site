<script>
  import { onMount } from "svelte";
  import Table from "../Table.svelte";

  let history = [];

  // const URL = "https://rich-system.team-freeman.com";
  const URL = "http://localhost:19000";

  function fetchData() {
    fetch(`${URL}/history`)
      .then((response) => response.json())
      .then((data) => {
        history = data.history;
      })
      .catch(console.log);
  }

  onMount(() => {
    fetchData();
  });
</script>

<Table results={history} />
