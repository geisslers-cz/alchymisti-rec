export function formatTime(t: number): [string, string] {
  t = Math.round(t * 1000);
  const sgn = t < 0 ? '-' : '';
  const m = Math.abs(Math.trunc(t / 60_000));
  t = Math.abs(t) - m * 60_000;
  const s = Math.floor(t / 1000);
  const ms = t % 1000;
  const int = `${sgn}${m}:${s.toString().padStart(2, '0')}`;

  return [int, ms.toString().padStart(3, '0')];
}
