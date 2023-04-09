<script>
  let clothes = {
    pants: true,
    bra: true,
    top: true,
    trousers: true,
  };

  function toggleClothes(clothesName) {
    clothes[clothesName] = !clothes[clothesName];
  }
</script>

<h1>demo</h1>

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
<img id="male" src="male.jpeg" alt="male" />

<style>
  h1 {
    text-align: center;
    margin: -10px;
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
    bottom: 32%;
    left: 26%;
    width: 10rem;
    height: 10rem;
    object-fit: cover;
    z-index: 2;
  }

  #bra {
    position: absolute;
    bottom: 50%;
    left: 27%;
    width: 10rem;
    height: 10rem;
    z-index: 2;
    object-fit: cover;
  }

  #top {
    position: absolute;
    bottom: 46%;
    left: 25%;
    width: 10rem;
    height: 11rem;
    z-index: 2;
    object-fit: cover;
  }

  #trousers {
    position: absolute;
    bottom: 3%;
    left: 25%;
    width: 10rem;
    height: 26rem;
    z-index: 2;
    object-fit: cover;
  }
</style>
