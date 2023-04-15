<script>
  import Table from "../Table.svelte";

  export let data;
  let monthlyAVG;
  let dailyAVG;

  function twoDP(num, comma = true) {
    const two = Math.floor(num * 100) / 100;
    return two.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  $: monthlyAVG =
    Object.values(data.history.monthly).reduce((a, b) => a + b, 0) /
    Object.keys(data.history.monthly).length;

  $: dailyAVG =
    Object.values(data.history.daily).reduce((a, b) => a + b, 0) /
    Object.keys(data.history.daily).length;
</script>

<section class="flex wrap">
  <li class="general">
    <p>🔥</p>
    <h3>{data.history.avgStreak}</h3>
  </li>
  <li class="general">
    <p>losses (lay)</p>
    <h3>{data.history.losses}</h3>
  </li>
  <li class="lia">
    <p>overall liability</p>
    <h3>£{twoDP(data.history.atl)}</h3>
  </li>
  <li class="return">
    <p>ROI</p>
    <h3>
      %{((data.activity.total / data.history.atl) * 100)
        .toString()
        .substring(0, 6)}
    </h3>
  </li>
  <li class="special return">
    <p>weekly: £🧑‍💻</p>
    <p>monthly: £{twoDP(monthlyAVG)}</p>
    <p>daily: £{twoDP(dailyAVG)}</p>
  </li>
</section>
<Table results={data.history.history} />

<style>
  /* .space-around {
    justify-content: space-around;
  } */

  .wrap {
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .special > * {
    text-align: start;
  }

  section {
    margin-block: 2rem;
  }

  li {
    list-style: none;
    text-align: center;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    padding-inline: 2rem;
    border-radius: 1rem;
    border: 1px solid grey;
    box-shadow: 5px 7px 9px 2px rgba(0, 0, 0, 0.25);
  }

  .general {
    background-color: blueviolet;
  }

  .return {
    background-color: rgb(209, 104, 121);
  }

  .lia {
    background-color: rgb(137, 179, 54);
  }

  h3 {
    margin-top: auto;
    margin-bottom: 0px;
  }

  p {
    text-align: center;
    margin: 0px;
  }
</style>
