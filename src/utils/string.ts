export function rightPad(s: string, l: number, c: string) {
  let cc = c;
  let ss = s;
  let i = -1;
  let ll = l - ss.length;
  if (!cc && cc.charCodeAt(0) !== 0) {
    cc = ' ';
  }
  while (++i < ll) {
    ss += c;
  }

  return ss;
}
