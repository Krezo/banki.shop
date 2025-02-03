export const formatStringNumber = (value: string | number): string => {
  const match = value.toString().match(/^\d+/);
  if (!match) return '0';

  const number = parseInt(match[0], 10);
  if (!isFinite(number)) return '0';

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export function fakeFetch<T>(data: T, time: number = 0) {
  return new Promise<T>((res) => {
    console.log(time);
    setTimeout(() => res(data), time ? time : Math.random() * 1000);
  });
}
