export const ssr = false; // so vercel can load under 10 seconds have to make the fetch from the browser

export async function load({ fetch }) {
  console.log(`${import.meta.env.VITE_BOT_API_URL}/activity`);
  try {
    const [acResp, hisResp] = await Promise.all([
      fetch(`${import.meta.env.VITE_BOT_API_URL}/activity`),
      fetch(`${import.meta.env.VITE_BOT_API_URL}/history`),
    ]);
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

    return { activity, history };
  } catch (e) {
    console.error(e);
    return { activity: {}, history: {} };
  }
}
