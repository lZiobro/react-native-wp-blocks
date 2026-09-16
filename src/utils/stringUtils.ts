/**
 * Strips new lines and carriage returns from a string.
 * @param inputString input
 * @param minAmount minimum amount of symbols to replace
 * @param replaceAmount number of new lines to replace matches with
 * @returns {string}
 */
export const stripNewLines = (
  inputString: string,
  minAmount = 1,
  replaceAmount = 0
) => {
  return inputString.replaceAll(
    new RegExp(`(\\r?\\n){${minAmount},}`, 'g'),
    '\n'.repeat(replaceAmount)
  );
};
