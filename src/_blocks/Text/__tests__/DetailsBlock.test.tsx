import { describe, expect, it } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { DetailsBlock } from '../DetailsBlock';
import { Text } from 'react-native';
import { WordPressProvider } from '../../../WordPressProvider';

describe('DetailsBlock', () => {
  it('should render only toggle summary when not expanded and expand details content on press', async () => {
    const wpBlock = {
      attrs: {},
      blockName: 'core/details',
      innerBlocks: [],
      innerContent: [],
      innerHTML: '<summary>Show Details</summary>',
    };

    const { queryByText } = await render(
      <WordPressProvider>
        <DetailsBlock wpBlock={wpBlock}>
          <Text>Details Child Content</Text>
        </DetailsBlock>
      </WordPressProvider>
    );

    // Initial state: summary is shown, child not rendered
    expect(screen.getByText(/Show Details/)).toBeTruthy();
    expect(screen.getByText(/▶/)).toBeTruthy();
    expect(queryByText('Details Child Content')).toBeNull();

    // Toggle expansion
    const toggle = screen.getByText(/▶/);
    await fireEvent.press(toggle);

    // Expanded state
    expect(screen.getByText(/▼/)).toBeTruthy();
    expect(screen.getByText('Details Child Content')).toBeTruthy();

    // Toggle collapse
    await fireEvent.press(toggle);
    expect(queryByText('Details Child Content')).toBeNull();
  });
});
