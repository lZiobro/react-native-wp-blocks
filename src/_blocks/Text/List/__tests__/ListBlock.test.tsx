import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { ListBlock } from '../ListBlock';
import { Text, View } from 'react-native';
import { useContext } from 'react';
import { ListContext } from '../../../../context/List/ListContext';
import { WordPressProvider } from '../../../../WordPressProvider';

const ListContextSpy = () => {
  const context = useContext(ListContext);

  if (!context) return <Text testID="no-context">Brak Contextu!</Text>;

  return (
    <View testID="context-values">
      <Text testID="isOrdered">{String(context.isOrdered)}</Text>
      <Text testID="startNumber">{String(context.startNumber)}</Text>
      <Text testID="type">{String(context.type)}</Text>
      <Text testID="className">{String(context.className)}</Text>
      <Text testID="isReversed">{String(context.isReversed)}</Text>
      <Text testID="total">{String(context.total)}</Text>
    </View>
  );
};

describe('ListBlock', () => {
  const mockWordpressContext = {
    primitives: {
      View: View,
    },
    theme: {
      margin_small: 10,
    },
  };

  it('should add context wrapper and properly pass values when provided with children', async () => {
    const mockWpBlock = {
      attrs: {
        ordered: true,
        start: 5,
        type: '1',
        className: 'custom-class',
        reversed: true,
      },
      innerBlocks: [{}, {}, {}, {}, {}], // total = 5
      innerHTML: '',
    };

    await render(
      <WordPressProvider {...(mockWordpressContext as any)}>
        <ListBlock wpBlock={mockWpBlock as any}>
          <ListContextSpy />
        </ListBlock>
      </WordPressProvider>
    );

    expect(screen.getByTestId('isOrdered').props.children).toBe('true');
    expect(screen.getByTestId('startNumber').props.children).toBe('5');
    expect(screen.getByTestId('type').props.children).toBe('1');
    expect(screen.getByTestId('className').props.children).toBe('custom-class');
    expect(screen.getByTestId('isReversed').props.children).toBe('true');
    expect(screen.getByTestId('total').props.children).toBe('5');
  });

  it('should add context wrapper and properly pass values when no children and parse innerHTML', async () => {
    const mockWpBlock = {
      attrs: {
        ordered: false,
        type: 'point',
        className: 'custom-class',
        reversed: false,
      },
      innerBlocks: [],
      innerHTML: '<ul><li>Parsed Item 1</li><li>Parsed Item 2</li></ul>', //total = 2
    };

    await render(
      <WordPressProvider
        {...(mockWordpressContext as any)}
        htmlRenderers={{ ul: ListContextSpy }}
      >
        <ListBlock wpBlock={mockWpBlock as any} />
      </WordPressProvider>
    );

    expect(screen.getByTestId('isOrdered').props.children).toBe('false');
    expect(screen.getByTestId('startNumber').props.children).toBe('1');
    expect(screen.getByTestId('type').props.children).toBe('point');
    expect(screen.getByTestId('className').props.children).toBe('custom-class');
    expect(screen.getByTestId('isReversed').props.children).toBe('false');
    expect(screen.getByTestId('total').props.children).toBe('2');
  });

  it('should render children when provided and wrap in ListContext.Provider', async () => {
    const wpBlock = {
      attrs: {
        ordered: true,
        start: 5,
        type: 'upper-roman',
        className: 'custom-class',
        reversed: true,
      },
      blockName: 'core/list',
      innerBlocks: [
        {
          attrs: {},
          blockName: 'core/list-item',
          innerBlocks: [],
          innerContent: [],
          innerHTML: '',
        },
      ],
      innerContent: [],
      innerHTML: '',
    };

    await render(
      <WordPressProvider>
        <ListBlock wpBlock={wpBlock}>
          <Text>Item 1</Text>
        </ListBlock>
      </WordPressProvider>
    );

    expect(screen.getByText('Item 1')).toBeTruthy();
  });

  it('should parse and render innerHTML when children are not provided', async () => {
    const wpBlock = {
      attrs: {
        ordered: false,
      },
      blockName: 'core/list',
      innerBlocks: [],
      innerContent: [],
      innerHTML: '<ul><li>Parsed Item 1</li><li>Parsed Item 2</li></ul>',
    };

    await render(
      <WordPressProvider>
        <ListBlock wpBlock={wpBlock} />
      </WordPressProvider>
    );

    expect(screen.getByText('Parsed Item 1')).toBeTruthy();
    expect(screen.getByText('Parsed Item 2')).toBeTruthy();
  });
});
