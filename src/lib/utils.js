export function twoDP(num) {
  const two = Math.floor(num * 100) / 100;
  return two.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}
