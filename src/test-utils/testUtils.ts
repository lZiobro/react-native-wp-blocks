import type { WordPressBlock } from '../types';

export const getRandomColorHex = () =>
  Math.floor(Math.random() * 16777215).toString(16);

export const getRandomString = () => Math.random().toString(36).slice(2, 7);

export const mockWordPressBlock = (
  name: string | null,
  innerBlocks: WordPressBlock[] = []
): WordPressBlock => ({
  blockName: name,
  attrs: [],
  innerBlocks: innerBlocks,
  innerHTML: '',
});
