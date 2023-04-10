<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  export let data;
  let allData = [];

  function renderChart() {
    const ctx = document.getElementById("myChart");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: Object.keys(data.history.daily).reverse(),
        datasets: [
          {
            label: "days",
            data: allData,
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
  }

  $: {
    let acc = 840;
    allData = Object.values(data.history.daily)
      .reverse()
      .map((day) => (acc += day));
  }

  onMount(async () => {
    renderChart();
  });
</script>

<nav>
  <button>daily</button>
  <button>weekly</button>
  <button>monthly</button>
</nav>
<div style="height: 50vh">
  <canvas id="myChart" />
</div>

<style>
  nav {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
  }
</style>
