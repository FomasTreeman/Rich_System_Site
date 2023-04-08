function fetchData() {
  fetch(`${URL}/funds`)
    .then((response) => response.json())
    .then((data) => {
      kitty = data.funds;
      totalProfit = data.total;
    })
    .catch(() => (kitty = 99999));
  fetch(`${URL}/activity`)
    .then((response) => response.json())
    .then((data) => {
      bestStreak = data.best;
      todaysSettled = data.settled;
      openBets = data.open;
      bestKitty = data.bestKitty;
      lastRace = data.last;
      allTimeLiability = data.atl;
      monthlyAVG =
        Object.values(data.monthly).reduce((a, b) => a + b, 0) /
        Object.keys(data.monthly).length;
      dailyAVG =
        Object.values(data.daily).reduce((a, b) => a + b, 0) /
        Object.keys(data.daily).length;
    })
    .catch(console.log);
}

export const load = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await response.json();

  return {
    pokemons: data.results,
  };
};
