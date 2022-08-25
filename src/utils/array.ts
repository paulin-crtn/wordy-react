/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
/**
 * Return a random value from an array
 *
 * @param array
 * @returns
 */
export const getRandomValue = (array: any) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

/**
 * Return the given array shuffled
 *
 * @param array
 * @returns
 */
export const shuffleArray = (array: any) => {
  return array.sort(() => 0.5 - Math.random());
};
