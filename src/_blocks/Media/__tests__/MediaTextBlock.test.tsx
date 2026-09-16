import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { MediaTextBlock } from '../MediaTextBlock';
import { Text } from 'react-native';
import { WordPressProvider } from '../../../WordPressProvider';

describe('MediaTextBlock', () => {
  it('should render BOTH innerHTML content and children', async () => {
    const wpBlock = {
      attrs: {},
      blockName: 'core/media-text',
      innerBlocks: [],
      innerContent: [],
      innerHTML: '<p>Media/Text Content</p>',
    };

    await render(
      <WordPressProvider>
        <MediaTextBlock wpBlock={wpBlock}>
          <Text>Media/Text Child</Text>
        </MediaTextBlock>
      </WordPressProvider>
    );

    expect(screen.getByText('Media/Text Content')).toBeTruthy();
    expect(screen.getByText('Media/Text Child')).toBeTruthy();
  });
});
