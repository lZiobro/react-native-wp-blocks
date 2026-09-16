import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { NestedHtmlBlock } from '../NestedHtmlBlock';
import { Text } from 'react-native';
import { WordPressProvider } from '../../../WordPressProvider';

describe('NestedHtmlBlock', () => {
  it('should render children if provided and skip innerHTML', async () => {
    const wpBlock = {
      attrs: {},
      blockName: 'core/group',
      innerBlocks: [],
      innerContent: [],
      innerHTML: '<p>Text in innerHTML</p>',
    };

    await render(
      <WordPressProvider>
        <NestedHtmlBlock wpBlock={wpBlock}>
          <Text>Nested Child</Text>
        </NestedHtmlBlock>
      </WordPressProvider>
    );

    expect(screen.getByText('Nested Child')).toBeTruthy();
    expect(screen.queryByText('Text in innerHTML')).toBeNull();
  });

  it('should parse and render innerHTML if children are not provided', async () => {
    const wpBlock = {
      attrs: {},
      blockName: 'core/group',
      innerBlocks: [],
      innerContent: [],
      innerHTML: '<div>Parsed Nested HTML</div>',
    };

    await render(
      <WordPressProvider>
        <NestedHtmlBlock wpBlock={wpBlock} />
      </WordPressProvider>
    );

    expect(screen.getByText('Parsed Nested HTML')).toBeTruthy();
  });
});
