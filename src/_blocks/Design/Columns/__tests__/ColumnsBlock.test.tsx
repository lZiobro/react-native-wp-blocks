import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { ColumnsBlock } from '../ColumnsBlock';
import { Text, StyleSheet } from 'react-native';
import { WordPressProvider } from '../../../../WordPressProvider';

describe('ColumnsBlock', () => {
  it('should render columns with row direction style', async () => {
    const wpBlock = {
      attrs: {},
      blockName: 'core/columns',
      innerBlocks: [],
      innerContent: [],
      innerHTML: '',
    };

    const { toJSON } = await render(
      <WordPressProvider>
        <ColumnsBlock wpBlock={wpBlock}>
          <Text>Col 1</Text>
          <Text>Col 2</Text>
        </ColumnsBlock>
      </WordPressProvider>
    );

    expect(screen.getByText('Col 1')).toBeTruthy();
    expect(screen.getByText('Col 2')).toBeTruthy();

    const json = toJSON();
    const flatStyles = StyleSheet.flatten(json?.props.style);
    expect(flatStyles).toMatchObject({
      flexDirection: 'row',
    });
  });
});
