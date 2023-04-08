<script>
  export let results = [];

  function calculateRed(price) {
    if (price > 110) {
      // return 10;
      return 255 - (Math.floor((price - 20) * (255 / 90)) - 255);
    } else return 255;
  }

  function calculateGreen(price) {
    if (price < 110) {
      return Math.floor((price - 20) * (255 / 90));
    } else return 255;
  }

  function twoDP(num, comma = true) {
    const two = Math.floor(num * 100) / 100;
    return two.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
</script>

<table>
  <tr>
    <th>time</th>
    <th>horse</th>
    <th>side</th>
    <th>odds</th>
    <th>risk</th>
    <th>profit</th>
  </tr>
  {#if results.length === 0}
    <tr>
      <td colspan="6">no settled bets</td>
    </tr>
  {/if}
  {#each results as { time, selection, side, price, liability, profit }}
    <tr>
      <td>{time}</td>
      <td>{selection}</td>
      <td>{side}</td>
      <td
        style="background-color: rgba({calculateRed(price)}, 
            {calculateGreen(price)}, 1, 0.4)">{price}</td
      >
      <td>£{twoDP(liability)}</td>
      {#if profit < 0}
        <td style="background-color: rgba(240, 1, 1, 0.3)">£{profit}</td>
      {:else}
        <td style="background-color: rgba(1, 240, 1, 0.3)">£{profit}</td>
      {/if}
    </tr>
  {/each}
</table>
