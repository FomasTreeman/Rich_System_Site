export async function load({ fetch }) {
  console.log('🚴');
  console.time('load');
  const [acResp, hisResp] = await Promise.all([
    fetch(`${import.meta.env.VITE_BOT_API_URL}/activity`),
    fetch(`${import.meta.env.VITE_BOT_API_URL}/history`),
  ]);

  // for error handling
  // const [acResp, hisResp] = await Promise.all([
  //   fetch(`asd/activity`),
  //   fetch(`asdasd/history`),
  // ]);

  if (acResp.status !== 200 || hisResp.status !== 200) {
    console.log('error');
    console.timeEnd('load');
    return;
  }

  const [activity, history] = await Promise.all([
    acResp.json(),
    hisResp.json(),
  ]);

  function averages(results) {
    let monthly = {};
    let daily = {};
    // let weeklyAVG = {}
    results.forEach((bet) => {
      const [year, month, day] = bet.time.substring(0, 10).split('/');
      const monthID = year + '-' + month;
      const dayID = year + '-' + month + '-' + day;
      if (!monthly[monthID]) {
        monthly[monthID] = bet.profit;
      } else {
        monthly[monthID] += bet.profit;
      }
      if (!daily[dayID]) {
        daily[dayID] = bet.profit;
      } else {
        daily[dayID] += bet.profit;
      }
    });

    return { monthly, daily };
  }

  const { monthly, daily } = averages(history.history);
  history['monthly'] = monthly;
  history['daily'] = daily;

  console.timeEnd('load');
  return { activity, history };
}
