import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { StandardHtmlBlock } from '../StandardHtmlBlock';
import { Text } from 'react-native';
import { WordPressProvider } from '../../../WordPressProvider';

describe('StandardHtmlBlock', () => {
  it('should render flat innerHTML elements and skip any children provided', async () => {
    const wpBlock = {
      attrs: {},
      blockName: 'core/paragraph',
      innerBlocks: [],
      innerContent: [],
      innerHTML: '<p>Standard HTML Paragraph</p>',
    };

    await render(
      <WordPressProvider>
        <StandardHtmlBlock wpBlock={wpBlock}>
          <Text>Child Text</Text>
        </StandardHtmlBlock>
      </WordPressProvider>
    );

    expect(screen.getByText('Standard HTML Paragraph')).toBeTruthy();
    expect(screen.queryByText('Child Text')).toBeNull();
  });
});
