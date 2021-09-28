/**
 * Получить случайное число в заданном интервале
 */
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export const makeId = () => getRandomInt(1000000, 9999999);
