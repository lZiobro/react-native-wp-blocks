import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { GroupBlock } from '../GroupBlock';
import { Text, StyleSheet } from 'react-native';
import { WordPressProvider } from '../../../WordPressProvider';

describe('GroupBlock', () => {
  it('should render default flex layout for simple group', async () => {
    const wpBlock = {
      attrs: { layout: { type: 'constrained' } },
      blockName: 'core/group',
      innerBlocks: [],
      innerContent: [],
      innerHTML: '',
    };

    const { toJSON } = await render(
      <WordPressProvider>
        <GroupBlock wpBlock={wpBlock}>
          <Text>Item 1</Text>
          <Text>Item 2</Text>
        </GroupBlock>
      </WordPressProvider>
    );

    expect(screen.getByText('Item 1')).toBeTruthy();
    expect(screen.getByText('Item 2')).toBeTruthy();

    const json = toJSON();
    const flatStyles = StyleSheet.flatten(json?.props.style);
    expect(flatStyles).toMatchObject({
      width: '100%',
    });
  });

  it('should render row flex layout with horizontal orientation', async () => {
    const wpBlock = {
      attrs: {
        layout: {
          type: 'flex',
          orientation: 'horizontal',
        },
      },
      blockName: 'core/group',
      innerBlocks: [],
      innerContent: [],
      innerHTML: '',
    };

    const { toJSON } = await render(
      <WordPressProvider>
        <GroupBlock wpBlock={wpBlock}>
          <Text>Item 1</Text>
          <Text>Item 2</Text>
        </GroupBlock>
      </WordPressProvider>
    );

    expect(screen.getByText('Item 1')).toBeTruthy();
    expect(screen.getByText('Item 2')).toBeTruthy();

    const json = toJSON();
    const flatStyles = StyleSheet.flatten(json?.props.style);
    expect(flatStyles).toMatchObject({
      flexDirection: 'row',
    });
  });

  it('should render vertical flex layout orientation', async () => {
    const wpBlock = {
      attrs: {
        layout: {
          type: 'flex',
          orientation: 'vertical',
        },
      },
      blockName: 'core/group',
      innerBlocks: [],
      innerContent: [],
      innerHTML: '',
    };

    const { toJSON } = await render(
      <WordPressProvider>
        <GroupBlock wpBlock={wpBlock}>
          <Text>Item A</Text>
        </GroupBlock>
      </WordPressProvider>
    );

    const json = toJSON();
    const flatStyles = StyleSheet.flatten(json?.props.style);
    expect(flatStyles).toMatchObject({
      flexDirection: 'column',
    });
  });

  it('should render grid layout with columns and row chunking', async () => {
    const wpBlock = {
      attrs: {
        layout: {
          type: 'grid',
          columnCount: 2,
        },
      },
      blockName: 'core/group',
      innerBlocks: [],
      innerContent: [],
      innerHTML: '',
    };

    // 3 items should result in 2 rows. Row 2 will contain a placeholder.
    await render(
      <WordPressProvider>
        <GroupBlock wpBlock={wpBlock}>
          <Text>Grid 1</Text>
          <Text>Grid 2</Text>
          <Text>Grid 3</Text>
        </GroupBlock>
      </WordPressProvider>
    );

    expect(screen.getByText('Grid 1')).toBeTruthy();
    expect(screen.getByText('Grid 2')).toBeTruthy();
    expect(screen.getByText('Grid 3')).toBeTruthy();
  });
});
