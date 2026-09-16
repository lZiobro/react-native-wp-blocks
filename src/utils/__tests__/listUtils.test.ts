import { describe, expect, it } from '@jest/globals';
import { getListSymbol } from '../listUtils';

describe('listUtils', () => {
  it('getListSymbol -> should return proper symbol for unordered list', async () => {
    const listParams = {
      isOrdered: false,
      listIndex: 0,
      className: undefined,
      type: undefined,
    };

    const result = getListSymbol(
      listParams.isOrdered,
      listParams.listIndex,
      listParams.className,
      listParams.type
    );

    expect(result).toBe('•');
  });

  it('getListSymbol -> should return proper symbol for unordered checkmark list', async () => {
    const listParams = {
      isOrdered: false,
      listIndex: 0,
      className: 'is-style-checkmark-list',
      type: undefined,
    };

    const result = getListSymbol(
      listParams.isOrdered,
      listParams.listIndex,
      listParams.className,
      listParams.type
    );

    expect(result).toBe('✓');
  });

  it('getListSymbol -> should return proper symbol for ordered list', async () => {
    const listParams = {
      isOrdered: true,
      listIndex: 86,
      className: undefined,
      type: undefined,
    };

    const result = getListSymbol(
      listParams.isOrdered,
      listParams.listIndex,
      listParams.className,
      listParams.type
    );

    expect(result).toBe('86.');
  });

  it('getListSymbol -> should return proper symbol for ordered upper alphabet list', async () => {
    const listParams = {
      isOrdered: true,
      listIndex: 28, //26 => overflow into 2 characters -> A (26) + remainder B (2)
      className: undefined,
      type: 'upper-alpha',
    };

    const result = getListSymbol(
      listParams.isOrdered,
      listParams.listIndex,
      listParams.className,
      listParams.type
    );

    expect(result).toBe('AB.');
  });

  it('getListSymbol -> should return proper symbol for ordered lower alphabet list', async () => {
    const listParams = {
      isOrdered: true,
      listIndex: 5,
      className: undefined,
      type: 'lower-alpha',
    };

    const result = getListSymbol(
      listParams.isOrdered,
      listParams.listIndex,
      listParams.className,
      listParams.type
    );

    expect(result).toBe('e.');
  });

  it('getListSymbol -> should return proper symbol for ordered upper roman list', async () => {
    const listParams = {
      isOrdered: true,
      listIndex: 4,
      className: undefined,
      type: 'upper-roman',
    };

    const result = getListSymbol(
      listParams.isOrdered,
      listParams.listIndex,
      listParams.className,
      listParams.type
    );

    expect(result).toBe('IV.');
  });

  it('getListSymbol -> should return proper symbol for ordered lower roman list', async () => {
    const listParams = {
      isOrdered: true,
      listIndex: 49,
      className: undefined,
      type: 'lower-roman',
    };

    const result = getListSymbol(
      listParams.isOrdered,
      listParams.listIndex,
      listParams.className,
      listParams.type
    );

    expect(result).toBe('xlix.');
  });
});
