import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { ClassicEditorBlock } from '../ClassicEditorBlock';
import { Text } from 'react-native';
import { WordPressProvider } from '../../../WordPressProvider';

describe('ClassicEditorBlock', () => {
  it('should render flat innerHTML after removing HTML comments', async () => {
    const wpBlock = {
      attrs: {},
      blockName: 'core/freeform',
      innerBlocks: [],
      innerContent: [],
      innerHTML: '<!-- HTML Comment --><p>Classic Editor Text</p>',
    };

    await render(
      <WordPressProvider>
        <ClassicEditorBlock wpBlock={wpBlock}>
          <Text>Children Text</Text>
        </ClassicEditorBlock>
      </WordPressProvider>
    );

    expect(screen.getByText('Classic Editor Text')).toBeTruthy();
    expect(screen.queryByText('Children Text')).toBeNull();
  });
});
