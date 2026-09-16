import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import { SeparatorBlock } from '../SeparatorBlock';
import { WordPressProvider } from '../../../WordPressProvider';
import type { WordPressStyles } from '../../../context/WordPress/WordPressContext';

describe('SeparatorBlock', () => {
  it('should apply style from context', async () => {
    const styles: Partial<WordPressStyles> = {
      SeparatorBlock: { backgroundColor: 'red', margin: 23 },
    };

    const { toJSON } = await render(
      <WordPressProvider styles={styles}>
        <SeparatorBlock />
      </WordPressProvider>
    );

    const rootComponent = toJSON();

    const flatStyles = StyleSheet.flatten(rootComponent?.props.style);

    expect(flatStyles).toMatchObject({
      backgroundColor: 'red',
      margin: 23,
    });
  });
});
