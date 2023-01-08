//create function to generate random string
export const randomString = (): string => {
  const rand = Math.floor(Math.random() * 10);
  let result = "";

  for (let i = 0; i < 20 + rand; i++) {
    result += String.fromCharCode(33 + Math.floor(Math.random() * 94));
  }
  return result;
};
