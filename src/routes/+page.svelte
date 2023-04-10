<script>
  import { onMount } from "svelte";

  export let data;

  function twoDP(num) {
    const two = Math.floor(num * 100) / 100;
    return two.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
</script>

<main>
  <h1>£{twoDP(data.activity.funds)}</h1>
  <h2>{data.activity.days} day streak</h2>
  <img
    src={`/${Math.floor(Math.random() * 9 + 1)}.gif`}
    alt="making money gif with looney tunes"
  />
</main>

<style>
  main {
    margin: 0;
    width: 50%;
    display: flex;
    place-items: center;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
  }

  img {
    max-width: 100%;
  }

  h1 {
    font-size: 3.2em;
    line-height: 1.1;
    margin: 0%;
  }
</style>
