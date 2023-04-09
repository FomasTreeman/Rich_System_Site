const URL = "https://rich-system.team-freeman.com";
// const URL = "http://localhost:19000";

// function fetchData() {
//   fetch(`${URL}/activity`)
//     .then((response) => response.json())
//     .then((data) => {
//       kitty = data.funds;
//       totalProfit = data.total;
//       bestStreak = data.best;
//       todaysSettled = data.settled;
//       openBets = data.open;
//       bestKitty = data.bestKitty;
//       lastRace = data.last;
//       allTimeLiability = data.atl;
//       monthlyAVG =
//         Object.values(data.monthly).reduce((a, b) => a + b, 0) /
//         Object.keys(data.monthly).length;
//       dailyAVG =
//         Object.values(data.daily).reduce((a, b) => a + b, 0) /
//         Object.keys(data.daily).length;
//     })
//     .catch(console.log);
// }

export async function load({ fetch, params }) {
  const res = await fetch(`${URL}/activity`);
  const items = await res.json();

  return items;
}
