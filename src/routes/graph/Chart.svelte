<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  export let type;

  let ctx;
  let myChart;

  $: if (myChart) {
    myChart.data.datasets[0].data = type;
    myChart.update();
  }

  onMount(async () => {
    myChart = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "days",
            data: type,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            title: {
              display: true,
              text: "Profit",
            },
          },
        },
      },
    });
  });
</script>

<div style="height: 50vh">
  <canvas id="myChart" bind:this={ctx} />
</div>
