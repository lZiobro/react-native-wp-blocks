import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { FootnotesBlock } from '../FootnotesBlock';
import { WordPressProvider } from '../../../WordPressProvider';

describe('FootnotesBlock', () => {
  it('should render footnote items passed in attributes with correct numerical order', async () => {
    const wpBlock = {
      attrs: {
        items: [
          { id: 'fn-1', content: 'Footnote content 1' },
          { id: 'fn-2', content: 'Footnote content 2' },
        ],
      },
      blockName: 'core/footnotes',
      innerBlocks: [],
      innerContent: [],
      innerHTML: '',
    };

    await render(
      <WordPressProvider>
        <FootnotesBlock wpBlock={wpBlock} />
      </WordPressProvider>
    );

    expect(screen.getByText('1. Footnote content 1')).toBeTruthy();
    expect(screen.getByText('2. Footnote content 2')).toBeTruthy();
  });
});
