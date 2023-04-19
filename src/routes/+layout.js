export const ssr = false;
const URL = "https://rich-system.team-freeman.com";

export async function load({ fetch, params }) {
  const [acResp, hisResp] = await Promise.all([
    fetch(`${URL}/activity`),
    fetch(`${URL}/history`),
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
      const [year, month, day] = bet.time.substring(0, 10).split("/");
      const monthID = year + "-" + month;
      const dayID = year + "-" + month + "-" + day;
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
    // const monthlyAVG =
    //   Object.values(monthly).reduce((a, b) => a + b, 0) /
    //   Object.keys(monthly).length;
    // const dailyAVG =
    //   Object.values(daily).reduce((a, b) => a + b, 0) / Object.keys(daily).length;
    console.log("🔥", monthly, daily);

    return { monthly, daily };
  }

  const { monthly, daily } = averages(history.history);
  history["monthly"] = monthly;
  history["daily"] = daily;

  return { activity, history };
}
