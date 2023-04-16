<script>
  export let data;

  function twoDP(num) {
    const two = Math.floor(num * 100) / 100;
    return two.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  $: console.log(
    data.activity.settled.reduce((acc, curr) => (acc += curr.profit), 0)
  );
</script>

<main>
  <h1>£{twoDP(data.activity.funds)}</h1>
  <section>
    <li
      style="background-color: {Math.sign(
        data.activity.settled.reduce(
          (acc, curr) => (curr.side == 'LAY' ? (acc += curr.profit) : acc),
          0
        )
      ) != -1
        ? 'rgba(0, 128, 0, 0.56)'
        : 'rgba(255, 0, 0, 0.586)'}"
    >
      <p>LAY</p>
      <h3>
        £{twoDP(
          data.activity.settled.reduce(
            (acc, curr) => (curr.side == "LAY" ? (acc += curr.profit) : acc),
            0
          )
        )}
      </h3>
    </li>
    <li
      style="background-color: {Math.sign(
        data.activity.settled.reduce(
          (acc, curr) => (curr.side == 'BACK' ? (acc += curr.profit) : acc),
          0
        )
      ) != -1
        ? 'rgba(0, 128, 0, 0.56)'
        : 'rgba(255, 0, 0, 0.586)'}"
    >
      <p>BACK</p>
      <h3>
        £{twoDP(
          data.activity.settled.reduce(
            (acc, curr) => (curr.side == "BACK" ? (acc += curr.profit) : acc),
            0
          )
        )}
      </h3>
    </li>
  </section>
  <img
    src={`/${Math.floor(Math.random() * 9 + 1)}.gif`}
    alt="making money gif with looney tunes"
  />
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
  /* 
  li:first-child {
    background-color: rgba(0, 128, 0, 0.56);
  }

  li:last-child {
    background-color: rgba(255, 0, 0, 0.586);
  } */

  img {
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
