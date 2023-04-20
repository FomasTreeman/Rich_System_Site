<script>
  export let data;
  let profit = 0;
  const wWidth = 1663;
  const wHeight = 2492;
  let y = 0;
  let x = 0;

  function widthRatio() {
    return wWidth / wHeight;
  }

  function xDiff() {
    return wWidth - x;
  }

  function yDiff() {
    return wHeight - y;
  }

  $: profit = data.activity.settled.reduce(
    (acc, curr) => (acc += curr.profit),
    0
  );
</script>

<svelte:window bind:outerWidth={x} bind:outerHeight={y} />

<div>
  {#if profit > 1000}
    <img id="male" src="male.jpeg" alt="male" />
  {:else}
    <img id="woman" src="woman.jpeg" alt="naked woman" />
    {#if profit < 0}
      <img
        style="position: fixed;
        bottom: {x * widthRatio() * 0.65}px;
        left: 16%;
        width: 60%;
        height: {x * widthRatio() * 1.2}px;
        z-index: 10;"
        id="jacket"
        src="jacket.png"
        alt="jacket"
      />
      <img
        style="position: fixed;
      bottom: {x * widthRatio() * 1.7}px;
      left: 65%;
      width: 25%;
      height: {x * widthRatio() * 0.4}px;
      z-index: 10;"
        id="snowflake"
        src="snowflake.png"
        alt="snowflake"
      />
    {/if}
    {#if !(profit > 100)}
      <img
        style="position: fixed;
        bottom: {x * widthRatio() * 0.25}px;
        left: 5%;
        width: 83%;
        height: {x * widthRatio() * 1.2}px;
        z-index: 9;"
        id="trousers"
        src="trousers.png"
        alt="trousers"
      />
    {/if}
    {#if !(profit > 200)}
      <img
        style="position: fixed;
        bottom: {x * widthRatio() * 1.2}px;
        left: 28%;
        width: 38%;
        height: {x * widthRatio() * 0.6}px;
        z-index: 9;"
        id="top"
        src="top.png"
        alt="top"
      />
    {/if}
    {#if !(profit > 500)}
      <img
        style="position: fixed;
        bottom: {x * widthRatio()}px;
        left: 32%;
        width: 30%;
        height: {x * widthRatio() * 0.3}px;
        z-index: 7;"
        id="pants"
        src="pants.png"
        alt="underwear"
      />
    {/if}
    {#if !(profit > 600)}
      <img
        style="position: fixed;
        bottom: {x * widthRatio() * 1.41}px;
        left: 30%;
        width: 35%;
        height: {x * widthRatio() * 0.4}px;
        z-index: 6;"
        id="bra"
        src="bra.png"
        alt="bra"
      />
    {/if}
  {/if}
</div>

<style>
  div {
    width: 100vw;
    height: 100vh;
    margin-top: -7rem;
  }

  #woman,
  #male {
    position: fixed;
    margin-top: 20%;
    bottom: 0;
    left: 0;
    z-index: 1;
    aspect-ratio: 1663 / 2492;
    width: 100%;
  }

  #male {
    z-index: 9;
  }

  img {
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    pointer-events: none;
  }
</style>
