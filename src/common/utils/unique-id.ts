export function uniqueId(n = 10): string {
  if (n < 1) return "";
  const LETTERS = "AZERTYUIOPQSDFGHJKLMWXCVBN";
  const NUMBERS = "123456789";
  const c = Math.random() < 0.5 ? pickRandom(LETTERS) : pickRandom(NUMBERS);
  return c + uniqueId(n - 1);
}

function pickRandom(str: string) {
  return str[Math.floor(Math.random() * str.length)];
}
