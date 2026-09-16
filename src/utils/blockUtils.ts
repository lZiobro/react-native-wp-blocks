import type { WordPressBlock } from '../types/blockTypes';

/**
 * Checks if block has innerBlocks.
 * @param wpBlock
 * @returns {boolean}
 */
export const hasInnerBlocks = (wpBlock: WordPressBlock): boolean =>
  typeof wpBlock === 'object' &&
  Array.isArray(wpBlock.innerBlocks) &&
  wpBlock.innerBlocks.length > 0;
