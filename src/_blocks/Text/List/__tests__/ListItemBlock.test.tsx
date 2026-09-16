import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { ListContext } from '../../../../context/List/ListContext';
import { ListItemBlock } from '../ListItemBlock';
import { Text } from 'react-native';
import { WordPressProvider } from '../../../../WordPressProvider';

describe('ListItemBlock', () => {
  const defaultContext = {
    isOrdered: true,
    startNumber: 1,
    total: 3,
    isReversed: false,
  };

  it('should render list item with correct index and innerHTML content', async () => {
    const wpBlock = {
      attrs: {},
      blockName: 'core/list-item',
      innerBlocks: [],
      innerContent: [],
      innerHTML: '<li>Bullet content</li>',
    };

    await render(
      <WordPressProvider>
        <ListContext.Provider value={defaultContext}>
          <ListItemBlock wpBlock={wpBlock} index={1} />
        </ListContext.Provider>
      </WordPressProvider>
    );

    // Default ordered list should show "2." (index 1 + startNumber 1) and content
    expect(screen.getByText('2.')).toBeTruthy();
    expect(screen.getByText('Bullet content')).toBeTruthy();
  });

  it('should calculate reversed indexes correctly', async () => {
    const wpBlock = {
      attrs: {},
      blockName: 'core/list-item',
      innerBlocks: [],
      innerContent: [],
      innerHTML: '<li>Item content</li>',
    };

    await render(
      <WordPressProvider>
        <ListContext.Provider
          value={{ ...defaultContext, isReversed: true, startNumber: 10 }}
        >
          <ListItemBlock wpBlock={wpBlock} index={2} />
        </ListContext.Provider>
      </WordPressProvider>
    );

    // Reversed list with startNumber 10, index 2 -> 10 - 2 = 8.
    expect(screen.getByText('8.')).toBeTruthy();
  });

  it('should render nested list children when provided', async () => {
    const wpBlock = {
      attrs: {},
      blockName: 'core/list-item',
      innerBlocks: [],
      innerContent: [],
      innerHTML: '<li>Parent item</li>',
    };

    await render(
      <WordPressProvider>
        <ListContext.Provider value={defaultContext}>
          <ListItemBlock wpBlock={wpBlock} index={0}>
            <Text>Nested List Child</Text>
          </ListItemBlock>
        </ListContext.Provider>
      </WordPressProvider>
    );

    expect(screen.getByText('Parent item')).toBeTruthy();
    expect(screen.getByText('Nested List Child')).toBeTruthy();
  });
});
