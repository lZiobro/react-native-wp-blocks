import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { CoverBlock } from '../CoverBlock';
import { Text } from 'react-native';
import { WordPressProvider } from '../../../WordPressProvider';

describe('CoverBlock', () => {
  it('should render cover block with children and background source', async () => {
    const wpBlock = {
      attrs: {
        url: 'https://example.com/cover.png',
      },
      blockName: 'core/cover',
      innerBlocks: [],
      innerContent: [],
      innerHTML: '',
    };

    await render(
      <WordPressProvider>
        <CoverBlock wpBlock={wpBlock}>
          <Text>Overlay Content</Text>
        </CoverBlock>
      </WordPressProvider>
    );

    expect(screen.getByText('Overlay Content')).toBeTruthy();
  });
});
