import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import { type WordPressStyles } from '../../../context/WordPress/WordPressContext';
import { WordPressProvider } from '../../../WordPressProvider';
import { SpacerBlock } from '../SpacerBlock';

describe('SpacerBlock', () => {
  describe('SeparatorBlock', () => {
    it('should apply style from context', async () => {
      const styles: Partial<WordPressStyles> = {
        SpacerBlock: { backgroundColor: 'blue', margin: 52 },
      };

      const { toJSON } = await render(
        <WordPressProvider styles={styles}>
          <SpacerBlock />
        </WordPressProvider>
      );

      const rootComponent = toJSON();

      const flatStyles = StyleSheet.flatten(rootComponent?.props.style);

      expect(flatStyles).toMatchObject({
        backgroundColor: 'blue',
        margin: 52,
      });
    });
  });
});
