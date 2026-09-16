import { describe, expect, it } from '@jest/globals';
import { stripNewLines } from '../stringUtils';

describe('stringUtils', () => {
  it('stripNewLines -> should properly strip new lines', async () => {
    const testString = '\r\nfoo\nbar \n\n lorem ipsum\r\n dolor sit amet\n\n\n';
    const expectedResult = 'foobar  lorem ipsum dolor sit amet';

    const result = stripNewLines(testString);
    expect(result).toEqual(expectedResult);
  });

  it('stripNewLines -> should properly react to minAmount parameter', async () => {
    const testString = '\r\nfoo\nbar \n\n lorem ipsum\r\n dolor sit amet\n\n\n';
    const expectedResult = '\r\nfoo\nbar  lorem ipsum\r\n dolor sit amet';

    const result = stripNewLines(testString, 2);
    expect(result).toEqual(expectedResult);
  });

  it('stripNewLines -> should properly react to replaceAmount parameter with minAmount > 1', async () => {
    const testString = '\r\nfoo\nbar \n\n lorem ipsum\r\n dolor sit amet\n\n\n';
    const expectedResult = '\r\nfoo\nbar \n lorem ipsum\r\n dolor sit amet\n';

    const result = stripNewLines(testString, 2, 1);
    expect(result).toEqual(expectedResult);
  });

  it('stripNewLines -> should properly react to replaceAmount parameter', async () => {
    const testString = '\r\nfoo\nbar \n\n lorem ipsum\r\n dolor sit amet\n\n\n';
    const expectedResult = '\nfoo\nbar \n lorem ipsum\n dolor sit amet\n';

    const result = stripNewLines(testString, 1, 1);
    expect(result).toEqual(expectedResult);
  });
});
