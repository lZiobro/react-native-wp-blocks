import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { QuoteBlock } from '../QuoteBlock';
import { Text, StyleSheet } from 'react-native';
import { WordPressProvider } from '../../../WordPressProvider';

describe('QuoteBlock', () => {
  it('should render children and skip innerHTML when provided and apply border styles from theme', async () => {
    const wpBlock = {
      attrs: {},
      blockName: 'core/quote',
      innerBlocks: [],
      innerContent: [],
      innerHTML: '<p>innerHTML text</p>',
    };

    const targetColor = '#ff00ee';

    const { toJSON } = await render(
      <WordPressProvider theme={{ 'theme.border_color': targetColor }}>
        <QuoteBlock wpBlock={wpBlock}>
          <Text>Quote Child</Text>
        </QuoteBlock>
      </WordPressProvider>
    );

    expect(screen.getByText('Quote Child')).toBeTruthy();
    expect(screen.queryByText('innerHTML text')).toBeNull();

    const json = toJSON();
    const flatStyles = StyleSheet.flatten(json?.props.style);
    expect(flatStyles).toMatchObject({
      borderColor: targetColor,
      borderLeftWidth: 2,
    });
  });

  it('should parse and render innerHTML when children are not provided and apply border color from theme', async () => {
    const wpBlock = {
      attrs: {},
      blockName: 'core/quote',
      innerBlocks: [],
      innerContent: [],
      innerHTML: '<blockquote>Parsed Quote</blockquote>',
    };
    const targetColor = '#ff00ee';

    const { toJSON } = await render(
      <WordPressProvider theme={{ 'theme.border_color': targetColor }}>
        <QuoteBlock wpBlock={wpBlock} />
      </WordPressProvider>
    );

    expect(screen.getByText('Parsed Quote')).toBeTruthy();

    const json = toJSON();
    const flatStyles = StyleSheet.flatten(json?.props.style);
    expect(flatStyles).toMatchObject({
      borderColor: targetColor,
      borderLeftWidth: 2,
    });
  });
});
