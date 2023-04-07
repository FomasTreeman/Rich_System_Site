<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  function renderChart() {
    const ctx = document.getElementById("myChart");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  onMount(() => {
    renderChart();
  });
</script>

<div>
  <canvas id="myChart" />
</div>
