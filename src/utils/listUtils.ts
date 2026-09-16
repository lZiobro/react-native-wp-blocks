const NUMERALS: Record<string, number> = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};

/**
 * Converts number to appropiate symbol in roman numerals.
 * @param number number to be converted
 * @param isUpper should return upper-case
 * @returns {string}
 */
const toRomanNumeral = (number: number, isUpper: boolean = true): string => {
  let result = '';
  for (const i of Object.keys(NUMERALS)) {
    const q = Math.floor(number / NUMERALS[i]!);
    number -= q * NUMERALS[i]!;
    result += i.repeat(q);
  }

  return isUpper ? result : result.toLowerCase();
};

const alphabet = Array.from({ length: 26 }, (_element, index) =>
  String.fromCharCode(65 + index)
);

/**
 * Converts number to appropiate symbol in alphabet.
 * @param number number to be converted
 * @param isUpper should return upper-case
 * @returns {string}
 */
const toAlphabet = (number: number, isUpper: boolean = true): string => {
  // number is 0-based (caller passes listItemIndex - 1)
  let result = '';
  let n = number + 1; // convert to 1-based for the algorithm
  while (n > 0) {
    const remainder = (n - 1) % 26;
    result = alphabet[remainder]! + result;
    n = Math.floor((n - 1) / 26);
  }
  return isUpper ? result : result.toLowerCase();
};

export enum ListType {
  UPPER_ALPHA = 'upper-alpha',
  LOWER_ALPHA = 'lower-alpha',
  UPPER_ROMAN = 'upper-roman',
  LOWER_ROMAN = 'lower-roman',
}

/**
 * Retrieves list symbol based on provided params. For ordered lists resulting string will also contain delimited `.`.
 * @param isOrdered  
 * @param index
 * @param className Will return checkmark for `is-style-checkmark-list`
 * @param type one of {@link ListType}
 * @returns
 */
export const getListSymbol = (
  isOrdered: boolean,
  index: number,
  className: string | undefined,
  type: ListType | string | undefined
): string => {
  let itemSymbol = '•';
  if (!isOrdered && className?.includes('is-style-checkmark-list')) {
    itemSymbol = '✓';
  }

  if (isOrdered) {
    if (!type) {
      itemSymbol = `${index}.`;
    } else if (type === ListType.UPPER_ALPHA) {
      itemSymbol = `${toAlphabet(index - 1)}.`;
    } else if (type === ListType.LOWER_ALPHA) {
      itemSymbol = `${toAlphabet(index - 1, false)}.`;
    } else if (type === ListType.UPPER_ROMAN) {
      itemSymbol = `${toRomanNumeral(index)}.`;
    } else if (type === ListType.LOWER_ROMAN) {
      itemSymbol = `${toRomanNumeral(index, false)}.`;
    }
  }

  return itemSymbol;
};
