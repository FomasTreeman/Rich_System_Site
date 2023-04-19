<script>
  export let data;
  let profit = 0;

  $: profit = data.activity.settled.reduce(
    (acc, curr) => (acc += curr.profit),
    0
  );
</script>

<div>
  {#if profit > 1000}
    <img id="male" src="male.jpeg" alt="male" />
  {:else}
    <img id="woman" src="woman.jpeg" alt="naked woman" />
    {#if !(profit > 100)}
      <img id="trousers" src="trousers.png" alt="trousers" />
    {/if}
    {#if !(profit > 200)}
      <img id="top" src="top.png" alt="top" />
    {/if}
    {#if !(profit > 500)}
      <img id="pants" src="pants.png" alt="underwear" />
    {/if}
    {#if !(profit > 600)}
      <img id="bra" src="bra.png" alt="bra" />
    {/if}
  {/if}
</div>

<style>
  div {
    position: relative;
    width: 100vw;
    height: 100vh;
    margin-top: -7rem;
  }

  #woman,
  #male {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 85%;
    z-index: 1;
    object-fit: cover;
  }

  #male {
    z-index: 9;
  }

  #pants {
    position: absolute;
    bottom: 307px;
    left: 117px;
    width: 132px;
    height: 89px;
    object-fit: cover;
    z-index: 2;
  }

  #bra {
    position: absolute;
    bottom: 427px;
    left: 116px;
    width: 134px;
    height: 153px;
    z-index: 3;
    object-fit: cover;
  }

  #top {
    position: absolute;
    bottom: 387px;
    left: 82px;
    width: 187px;
    height: 176px;
    z-index: 10;
    object-fit: cover;
  }

  #trousers {
    position: absolute;
    bottom: 80px;
    left: 104px;
    width: 149px;
    height: 362px;
    z-index: 9;
    object-fit: cover;
  }
</style>
