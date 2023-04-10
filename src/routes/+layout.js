export const ssr = false;
// const URL = "https://rich-system.team-freeman.com";
const URL = "http://localhost:19000";

export async function load({ fetch, params }) {
  const [acResp, hisResp] = await Promise.all([
    fetch(`${URL}/activity`),
    fetch(`${URL}/history`),
  ]);
  const [activity, history] = await Promise.all([
    acResp.json(),
    hisResp.json(),
  ]);

  return { activity, history };
}
