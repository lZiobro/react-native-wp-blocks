import type { ReactNode } from 'react';
import { WordPressBlockName, type WordPressBlock } from '../types/blockTypes';
import { useWordPressContext } from '../context/WordPress/useWordPressContext';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { hasInnerBlocks } from '../utils/blockUtils';

export type WordPressBlockSelectorProps = {
  wpBlock: WordPressBlock;
  index?: number;
};

/**
 * Recursively maps `wpBlock` and all nested `innerBlocks` to their react-native counterpart.
 * Uses `WordPressContext` `blocks` to dynamically pick appropiate components to render.
 * Can be configured via `WordPressContext` `config` to disable errors.
 *
 * @param wpBlock
 * @param index
 *
 * @returns result {@link ReactNode}
 */
export const WordPressBlockSelector = ({
  wpBlock,
  index,
}: WordPressBlockSelectorProps): ReactNode => {
  const { blocks, config } = useWordPressContext();

  if (
    wpBlock.blockName === null &&
    wpBlock.innerHTML &&
    wpBlock.innerHTML.trim() !== ''
  ) {
    wpBlock.blockName = WordPressBlockName.CLASSIC;
  }

  if (wpBlock.blockName === null) {
    return <React.Fragment key={index} />;
  }

  const Component = blocks[wpBlock.blockName];

  if (!Component) {
    return config.showMissingBlockErrors ? (
      <Text style={styles.errorText}>
        NO BLOCK COMPONENT FOUND FOR WPBLOCK: {wpBlock.blockName}
      </Text>
    ) : (
      <React.Fragment />
    );
  }

  const blockKey = `${wpBlock.blockName}_${index}_root`;

  const children = hasInnerBlocks(wpBlock)
    ? wpBlock.innerBlocks.map((inner_block, innerIdx) => (
        <WordPressBlockSelector
          key={`${blockKey}_${innerIdx}_block`}
          wpBlock={inner_block}
          index={innerIdx}
        />
      ))
    : undefined;

  return (
    <Component wpBlock={wpBlock} key={blockKey} index={index}>
      {children}
    </Component>
  );
};

const styles = StyleSheet.create({ errorText: { color: 'red' } });
