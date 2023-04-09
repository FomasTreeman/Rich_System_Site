<script>
  let clothes = {
    pants: true,
    bra: true,
    top: true,
    trousers: true,
  };
  export let data;
  //   function toggleClothes(clothesName) {
  //     clothes[clothesName] = !clothes[clothesName];
  //   }
  $: {
    if (data.today > 100) clothes.trousers = false;
    if (data.today > 200) clothes.top = false;
    if (data.today > 400) clothes.pants = false;
    if (data.today > 600) clothes.bra = false;
  }
</script>

<div>
  {#if !clothes.bra}
    <img id="male" src="male.jpeg" alt="male" />
  {:else}
    <img id="woman" src="woman.jpeg" alt="naked woman" />
    {#if clothes.pants}
      <img id="pants" src="pants.png" alt="underwear" />
    {/if}
    {#if clothes.bra}
      <img id="bra" src="bra.png" alt="bra" />
    {/if}
    {#if clothes.top}
      <img id="top" src="top.png" alt="top" />
    {/if}
    {#if clothes.trousers}
      <img id="trousers" src="trousers.png" alt="trousers" />
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
    z-index: -1;
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
