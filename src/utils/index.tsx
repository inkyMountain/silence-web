export const cache = {
  set(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key: string) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : value;
  }
};

export const typeOf = (input: unknown) => {
  const regex = /\[object (.+)]/;
  const match = regex.exec(
    Object.prototype.toString.call(input).toLowerCase()
  ) as Array<string>;
  return match[1];
};
