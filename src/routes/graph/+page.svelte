<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  const URL = "https://rich-system.team-freeman.com";
  //   const URL = "http://localhost:19000";

  let allData = {};

  function renderChart() {
    const ctx = document.getElementById("myChart");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: Object.keys(allData).reverse(),
        datasets: [
          {
            label: "days",
            data: Object.values(allData).reverse(),
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
            beginAtZero: true,
            title: {
              display: true,
              text: "Profit",
            },
          },
        },
      },
    });
  }

  async function fetchData() {
    const response = await fetch(URL + "/activity");
    const data = await response.json();
    allData = data.daily;
    console.log(data);
  }

  onMount(async () => {
    await fetchData();
    renderChart();
  });
</script>

<div style="height: 50vh">
  <canvas id="myChart" />
</div>
