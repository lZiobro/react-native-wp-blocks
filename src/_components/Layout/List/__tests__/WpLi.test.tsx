import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { ListContext } from '../../../../context/List/ListContext';
import { WpLi } from '../WpLi';
import { Text } from 'react-native';
import { WordPressProvider } from '../../../../WordPressProvider';

describe('WpLi', () => {
  const mockElement = {
    type: 'tag',
    name: 'li',
    attribs: {},
    children: [],
  } as any;

  it('should render default bullet for unordered list', async () => {
    await render(
      <WordPressProvider>
        <ListContext.Provider
          value={{
            isOrdered: false,
            startNumber: 1,
            total: 1,
            type: undefined,
            className: undefined,
            isReversed: false,
          }}
        >
          <WpLi element={mockElement}>
            <Text>List Item Text</Text>
          </WpLi>
        </ListContext.Provider>
      </WordPressProvider>
    );

    expect(screen.getByText(/•/)).toBeTruthy();
    expect(screen.getByText('List Item Text')).toBeTruthy();
  });

  it('should render checkmark for checkmark-list style', async () => {
    await render(
      <WordPressProvider>
        <ListContext.Provider
          value={{
            isOrdered: false,
            startNumber: 1,
            total: 1,
            type: undefined,
            className: 'is-style-checkmark-list',
            isReversed: false,
          }}
        >
          <WpLi element={mockElement}>
            <Text>List Item Text</Text>
          </WpLi>
        </ListContext.Provider>
      </WordPressProvider>
    );

    // Checkmark character is \u2713 (✓)
    expect(screen.getByText(/✓/)).toBeTruthy();
  });

  it('should render standard index for ordered list without type', async () => {
    await render(
      <WordPressProvider>
        <ListContext.Provider
          value={{
            isOrdered: true,
            startNumber: 1,
            total: 1,
            type: undefined,
            className: undefined,
            isReversed: false,
          }}
        >
          <WpLi element={mockElement} additionalProps={{ listIndex: 3 }}>
            <Text>List Item Text</Text>
          </WpLi>
        </ListContext.Provider>
      </WordPressProvider>
    );

    // index 3 + startNumber = 4 -> 4.
    expect(screen.getByText('4. ')).toBeTruthy();
  });

  it('should render upper-alpha index for ordered list', async () => {
    await render(
      <WordPressProvider>
        <ListContext.Provider
          value={{
            isOrdered: true,
            startNumber: 1,
            total: 1,
            type: 'upper-alpha',
            className: undefined,
            isReversed: false,
          }}
        >
          <WpLi element={mockElement} additionalProps={{ listIndex: 3 }}>
            <Text>List Item Text</Text>
          </WpLi>
        </ListContext.Provider>
      </WordPressProvider>
    );

    // index 3 + startNumber = 4 -> D
    expect(screen.getByText('D. ')).toBeTruthy();
  });

  it('should render lower-alpha index for ordered list', async () => {
    await render(
      <WordPressProvider>
        <ListContext.Provider
          value={{
            isOrdered: true,
            startNumber: 1,
            total: 1,
            type: 'lower-alpha',
            className: undefined,
            isReversed: false,
          }}
        >
          <WpLi element={mockElement} additionalProps={{ listIndex: 2 }}>
            <Text>List Item Text</Text>
          </WpLi>
        </ListContext.Provider>
      </WordPressProvider>
    );

    // index 2 + startNumber = 3 -> c
    expect(screen.getByText('c. ')).toBeTruthy();
  });

  it('should render upper-roman index for ordered list', async () => {
    await render(
      <WordPressProvider>
        <ListContext.Provider
          value={{
            isOrdered: true,
            startNumber: 1,
            total: 1,
            type: 'upper-roman',
            className: undefined,
            isReversed: false,
          }}
        >
          <WpLi element={mockElement} additionalProps={{ listIndex: 4 }}>
            <Text>List Item Text</Text>
          </WpLi>
        </ListContext.Provider>
      </WordPressProvider>
    );

    // index 4 + startNumber = 5 -> V
    expect(screen.getByText('V. ')).toBeTruthy();
  });

  it('should render lower-roman index for ordered list', async () => {
    await render(
      <WordPressProvider>
        <ListContext.Provider
          value={{
            isOrdered: true,
            startNumber: 1,
            total: 1,
            type: 'lower-roman',
            className: undefined,
            isReversed: false,
          }}
        >
          <WpLi element={mockElement} additionalProps={{ listIndex: 8 }}>
            <Text>List Item Text</Text>
          </WpLi>
        </ListContext.Provider>
      </WordPressProvider>
    );

    // index 8 + startNumber = 9 -> ix
    expect(screen.getByText('ix. ')).toBeTruthy();
  });
});
