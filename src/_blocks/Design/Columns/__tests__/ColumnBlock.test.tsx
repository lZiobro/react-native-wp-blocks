import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { ColumnBlock } from '../ColumnBlock';
import { Text, StyleSheet } from 'react-native';
import { WordPressProvider } from '../../../../WordPressProvider';

describe('ColumnBlock', () => {
  it('should render children and apply width style attribute', async () => {
    const wpBlock = {
      attrs: {
        width: '47%',
      },
      blockName: 'core/column',
      innerBlocks: [],
      innerContent: [],
      innerHTML: '',
    };

    const { toJSON } = await render(
      <WordPressProvider>
        <ColumnBlock wpBlock={wpBlock}>
          <Text>Column Content</Text>
        </ColumnBlock>
      </WordPressProvider>
    );

    expect(screen.getByText('Column Content')).toBeTruthy();

    const json = toJSON();
    const flatStyles = StyleSheet.flatten(json?.props.style);
    expect(flatStyles).toMatchObject({
      flexBasis: wpBlock.attrs.width,
    });
  });
});
