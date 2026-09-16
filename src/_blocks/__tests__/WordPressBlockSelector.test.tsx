import { describe, expect, it } from '@jest/globals';
import { Text, View } from 'react-native';
import type { BlockComponentProps, WordPressBlock } from '../../types';
import { mockWordPressBlock } from '../../test-utils/testUtils';
import { WordPressBlockSelector } from '../WordPressBlockSelector';
import { render, screen } from '@testing-library/react-native';
import {
  WordPressContext,
  type WordPressContextType,
  type WordPressProviderConfig,
} from '../../context/WordPress';

describe('WordPressBlockSelector', () => {
  const mockContext: WordPressContextType = {
    blocks: {
      'core/group': (props: BlockComponentProps) => (
        <View testID={'core_group'}>{props.children}</View>
      ),
      'core/spacer': () => <View testID={'core_spacer'} />,
      'core/image': (props: BlockComponentProps) => (
        <View testID={'core_image'}>
          <Text testID={'core_image_inner'}>{props.index}</Text>
        </View>
      ),
      'core/heading': (props: BlockComponentProps) => (
        <Text testID={'core_heading'}>{props.children}</Text>
      ),
      'core/paragraph': (props: BlockComponentProps) => (
        <Text testID={'core_paragraph'}>{JSON.stringify(props.wpBlock)}</Text>
      ),
      'core/freeform': (props: BlockComponentProps) => (
        <Text testID={'core_freeform'}>{props.wpBlock.innerHTML}</Text>
      ),
    },
    config: { showMissingBlockErrors: true } as WordPressProviderConfig,
  } as unknown as WordPressContextType;

  it('should properly translate block into component from context lookup table', async () => {
    const mockBlock: WordPressBlock = mockWordPressBlock('core/paragraph');

    const result = (
      <WordPressContext.Provider value={mockContext}>
        <WordPressBlockSelector wpBlock={mockBlock} />
      </WordPressContext.Provider>
    );

    await render(result);

    expect(screen.queryByTestId('core_paragraph')).not.toBeNull();
  });

  it('should properly parse nested structure and pass children properly', async () => {
    const mockBlocks: WordPressBlock[] = [
      mockWordPressBlock('core/group', [
        mockWordPressBlock('core/group', [
          mockWordPressBlock('core/paragraph'),
          mockWordPressBlock('core/paragraph'),
        ]),
        mockWordPressBlock('core/group', [
          mockWordPressBlock('core/image'),
          mockWordPressBlock('core/paragraph'),
        ]),
      ]),
    ];

    const result = (
      <WordPressContext.Provider value={mockContext}>
        <WordPressBlockSelector wpBlock={mockBlocks[0]!} />
      </WordPressContext.Provider>
    );

    await render(result);

    expect(screen.queryAllByTestId('core_group')).toHaveLength(3);
    expect(screen.queryAllByTestId('core_paragraph')).toHaveLength(3);
    expect(screen.queryAllByTestId('core_image')).toHaveLength(1);
    expect(screen.queryAllByTestId('core_image_inner')).toHaveLength(1);
  });

  it('should properly pass props to block components', async () => {
    const wpBlockIndex = mockWordPressBlock('core/image');
    const wpBlockInfo = mockWordPressBlock('core/paragraph');
    const mockBlocks: WordPressBlock[] = [
      mockWordPressBlock('core/group', [wpBlockInfo, wpBlockIndex]),
    ];

    const result = (
      <WordPressContext.Provider value={mockContext}>
        <WordPressBlockSelector wpBlock={mockBlocks[0]!} />
      </WordPressContext.Provider>
    );

    await render(result);

    expect(screen.queryAllByTestId('core_paragraph')[0]).toHaveTextContent(
      JSON.stringify(wpBlockInfo)
    );
    expect(screen.queryAllByTestId('core_image_inner')[0]).toHaveTextContent(
      '1'
    );
  });

  it('should skip empty blocks', async () => {
    const newLineEmptyBlock = mockWordPressBlock(null);
    newLineEmptyBlock.innerHTML = '\n\n'; //most common "empty" block to be skipped - these are added by the wordpress inbetween actual blocks
    const mockBlocks: WordPressBlock[] = [
      mockWordPressBlock('core/group', [
        mockWordPressBlock('core/group', [
          mockWordPressBlock(null),
          newLineEmptyBlock,
        ]),
        mockWordPressBlock('core/group', [
          mockWordPressBlock('core/paragraph'),
        ]),
      ]),
    ];

    const result = (
      <WordPressContext.Provider value={mockContext}>
        <WordPressBlockSelector wpBlock={mockBlocks[0]!} />
      </WordPressContext.Provider>
    );

    await render(result);

    expect(screen.queryAllByTestId('core_group')[1]).toBeEmptyElement();
    expect(screen.queryAllByTestId('core_group')[2]).toContainElement(
      screen.getByTestId('core_paragraph')
    );
  });

  it('should detect and mark core/freeform blocks', async () => {
    // when testing i've found out that core/freeform isn't tagged properly in the blockName field
    // it is instead marked with a blockName = null, but we can still detect it by its innerHTML
    // EDIT: actually `null` value may be correct for freeform / custom html...
    const mockBlock = mockWordPressBlock(null);
    mockBlock.innerHTML = '<p>foo</p>';

    const result = (
      <WordPressContext.Provider value={mockContext}>
        <WordPressBlockSelector wpBlock={mockBlock} />
      </WordPressContext.Provider>
    );

    await render(result);

    expect(screen.getByTestId('core_freeform')).toHaveTextContent(
      mockBlock.innerHTML
    );
  });

  it('should show error according to context config', async () => {
    const mockBlock: WordPressBlock = mockWordPressBlock('core/notfound');

    const result = (
      <WordPressContext.Provider
        value={{
          ...mockContext,
          config: {
            showMissingBlockErrors: true,
          } as unknown as WordPressProviderConfig,
        }}
      >
        <WordPressBlockSelector wpBlock={mockBlock} />
      </WordPressContext.Provider>
    );

    await render(result);

    expect(
      screen.queryByText(
        `NO BLOCK COMPONENT FOUND FOR WPBLOCK: ${mockBlock.blockName}`
      )
    ).not.toBeNull();

    const result_no_error = (
      <WordPressContext.Provider
        value={{
          ...mockContext,
          config: {
            showMissingBlockErrors: false,
          } as unknown as WordPressProviderConfig,
        }}
      >
        <WordPressBlockSelector wpBlock={mockBlock} />
      </WordPressContext.Provider>
    );

    await render(result_no_error);

    expect(
      screen.queryByText(
        `NO BLOCK COMPONENT FOUND FOR WPBLOCK: ${mockBlock.blockName}`
      )
    ).toBeNull();
  });
});
