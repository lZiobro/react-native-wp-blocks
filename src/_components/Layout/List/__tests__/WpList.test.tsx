import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { WpList } from '../WpList';
import { Text } from 'react-native';
import { WordPressProvider } from '../../../../WordPressProvider';
import {
  mockHtmlNodeElement,
  testBaseContract,
} from '../../../../test-utils/WordPressComponentTests';
import { useListContext } from '../../../../context/List';

testBaseContract({
  Component: WpList,
  componentProps: { element: mockHtmlNodeElement('ul') },
  componentRootType: 'View',
  styleKey: 'WpList',
  tests: {
    applyStyles: true,
    applyTextPrimitive: false,
    applyViewPrimitive: true,
    renderChildren: true,
  },
});

// Consumer component to verify values supplied by WpList
const ContextInspector = () => {
  const context = useListContext();
  return (
    <Text>
      {`isOrdered:${context.isOrdered},start:${context.startNumber},type:${context.type},reversed:${context.isReversed},total:${context.total}`}
    </Text>
  );
};

describe('WpList', () => {
  it('should extract unordered list parameters and expose them in context', async () => {
    const mockElement = {
      type: 'tag',
      name: 'ul',
      attribs: {
        style: 'list-style-type: square;',
      },
      children: [
        { type: 'tag', name: 'li' },
        { type: 'tag', name: 'li' },
      ],
    } as any;

    await render(
      <WordPressProvider>
        <WpList element={mockElement}>
          <ContextInspector />
        </WpList>
      </WordPressProvider>
    );

    expect(screen.getByText(/isOrdered:false/)).toBeTruthy();
    expect(screen.getByText(/type:square/)).toBeTruthy();
    expect(screen.getByText(/reversed:false/)).toBeTruthy();
    expect(screen.getByText(/total:2/)).toBeTruthy();
  });

  it('should extract ordered list parameters and handle start/reversed attributes', async () => {
    const mockElement = {
      type: 'tag',
      name: 'ol',
      attribs: {
        start: '10',
        reversed: '',
      },
      children: [{ type: 'tag', name: 'li' }],
    } as any;

    await render(
      <WordPressProvider>
        <WpList element={mockElement}>
          <ContextInspector />
        </WpList>
      </WordPressProvider>
    );

    expect(screen.getByText(/isOrdered:true/)).toBeTruthy();
    expect(screen.getByText(/start:10/)).toBeTruthy();
    expect(screen.getByText(/reversed:true/)).toBeTruthy();
    expect(screen.getByText(/total:1/)).toBeTruthy();
  });
});
