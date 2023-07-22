<script>
  import { onMount } from 'svelte';
  import { twoDP } from '../lib/utils';

  export let data;
  let promise = getGIF();

  function getDailyKitty() {
    let acc = 840;
    const kitty = Object.values(data.history.daily)
      .reverse()
      .map((profit) => (acc += profit));
    return kitty;
  }

  function total(side) {
    return data.activity.settled.reduce(
      (acc, curr) => (curr.side == side ? (acc += curr.profit) : acc),
      0
    );
  }

  async function getGIF() {
    const URL = `https://api.giphy.com/v1/gifs/search?api_key=${
      import.meta.env.VITE_GIPHY_API_KEY
    }&q=money&offset=${Math.floor(Math.random() * 9 + 1)}&limit=1`;
    console.log(URL);
    const resp = await fetch(URL);
    const json = await resp.json();
    console.log('📙', json.data[0]);
    console.log('📙', json.data[0].images.original.url);
    return json.data[0].images.original.url;
  }
  $: console.log(promise);
</script>

<main>
  {#if data?.activity}
    <h1>£{twoDP(data.activity.funds)}</h1>
    <section>
      <li class={Math.sign(total('LAY')) == -1 ? 'red' : 'green'}>
        <p>LAY</p>
        <h3>
          £{twoDP(total('LAY'))}
        </h3>
      </li>
      <li class={Math.sign(total('BACK')) == -1 ? 'red' : 'green'}>
        <p>BACK</p>
        <h3>
          £{twoDP(total('BACK'))}
        </h3>
      </li>
    </section>
    <li class="trophies">
      <p>🏆</p>
      <h3>£{twoDP(Math.max(...getDailyKitty()))}</h3>
      <p>
        £{twoDP(data.activity.funds - Math.max(...getDailyKitty()))}
      </p>
    </li>
    {#await promise}
      <p>loading...</p>
    {:then url}
      <img src={url} alt="making money " />
    {/await}
  {:else}
    <img
      src="https://media4.giphy.com/media/3o7bu3XilJ5BOiSGic/200.gif"
      alt="loading"
    />
  {/if}
</main>

<style>
  main {
    margin: 0;
    width: 100%;
    place-items: center;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
  }

  section {
    width: 100%;
    display: flex;
    gap: 1rem;
    margin: 1.5rem;
    justify-content: center;
  }

  li {
    padding-block: 0.5rem;
    min-width: 10%;
  }

  .trophies {
    background-color: orange;
  }

  .green {
    background-color: rgba(0, 128, 0, 0.56);
  }
  .red {
    background-color: rgba(255, 0, 0, 0.586);
  }
  /* 
  li:first-child {
    background-color: rgba(0, 128, 0, 0.56);

  }
  li:last-child {
    background-color: rgba(255, 0, 0, 0.586);
  } */

  img {
    margin-block: 2rem;
    max-width: 50%;
  }

  h1 {
    font-size: 3.2em;
    line-height: 1.1;
    margin: 0%;
  }

  p,
  h3 {
    margin: 0;
  }
</style>
