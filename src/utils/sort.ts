export const by = (key: string|number) => (a: any, b: any) =>
  a[key] - b[key] < 0 ? -1 : 1;

export const descBy = (key: string|number) => (a: any, b: any) =>
  a[key] - b[key] < 0 ? 1 : -1;

export const sortBy = <T>(key: string|number, arr: T[], fn = (x: any) => x): T[] =>
  arr.slice().sort(by(key));
