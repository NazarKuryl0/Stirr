export function convertTime(time) {
  const hours = Math.floor(time / 3600);
  const min = Math.floor((time - hours * 3600) / 60);
  const sec = time - hours * 3600 - min * 60;
  const fH = hours ? `${hours}:` : ``;
  const fM = min >= 10 ? min : `0${min}`;
  const fS = sec >= 10 ? sec : `0${sec}`;
  return `${fH}${fM}:${fS}`;
}
