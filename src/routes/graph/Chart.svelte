<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  export let type;
  let ctx;
  let myChart;

  $: if (myChart) {
    myChart.data.datasets[0].data = type;
    myChart.data.datasets[1].data = regression(type);
    myChart.update();
  }

  function regression(oldData) {
    const newData = oldData.map((coord) => {
      return { x: Math.floor(Date.parse(coord.x) / 1000000), y: coord.y };
    });
    const n = newData.length;
    let xSum = 0,
      ySum = 0,
      xySum = 0,
      xSqSum = 0;
    for (let i = 0; i < n; i++) {
      xSum += newData[i].x;
      ySum += newData[i].y;
      xySum += newData[i].x * newData[i].y;
      xSqSum += newData[i].x * newData[i].x;
    }
    const slope = (n * xySum - xSum * ySum) / (n * xSqSum - xSum * xSum);
    const yIntercept = (ySum - slope * xSum) / n;
    return newData.map((day, i) => ({
      x: oldData[i].x,
      y: slope * day.x + yIntercept,
    }));
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
          {
            label: "regression",
            pointRadius: 0,
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
