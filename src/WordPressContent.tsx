import { type WordPressBlock } from './types/blockTypes';
import { WordPressBlockSelector } from './_blocks';
import { FlatList } from 'react-native';

export type WordPressContentProps = {
  blocks: WordPressBlock[];
};
/**
 * Renders a list of parsed WordPress blocks. Can be configured with {@link WordPressContext}.
 *
 * @param blocks Blocks to be parsed.
 */
export const WordPressContent = ({ blocks }: WordPressContentProps) => {
  const safeBlocks = Array.isArray(blocks) ? blocks : [];

  return (
    <FlatList
      data={safeBlocks}
      renderItem={({ item, index }) => (
        <WordPressBlockSelector
          key={`block_${index}`}
          wpBlock={item}
          index={index}
        />
      )}
    />
  );
};
