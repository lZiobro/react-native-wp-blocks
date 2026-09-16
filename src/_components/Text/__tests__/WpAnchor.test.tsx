import { describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { WpAnchor } from '../WpAnchor';
import { Linking, Text } from 'react-native';
import { WordPressProvider } from '../../../WordPressProvider';

describe('WpAnchor', () => {
  it('should render a TextComponent and call Linking.openURL on press', async () => {
    const openURLSpy = jest
      .spyOn(Linking, 'openURL')
      .mockImplementation(() => Promise.resolve());

    const mockElement = {
      type: 'tag',
      name: 'a',
      tagName: 'a',
      attribs: { href: 'https://example.com' },
      children: [
        {
          type: 'text',
          data: 'Click Link',
        },
      ],
    } as any;

    const { queryByRole } = await render(
      <WordPressProvider>
        <WpAnchor element={mockElement}>
          <Text>Click Link</Text>
        </WpAnchor>
      </WordPressProvider>
    );

    const pressable = queryByRole('link');
    pressable?.props.onPress();

    expect(openURLSpy).toHaveBeenCalledWith('https://example.com');
    openURLSpy.mockRestore();
  });

  it('should render View wrapper when the child is an image', async () => {
    const mockElement = {
      type: 'tag',
      name: 'a',
      tagName: 'a',
      attribs: { href: 'https://example.com' },
      children: [
        {
          type: 'tag',
          name: 'img',
          tagName: 'img',
          attribs: { src: 'https://example.com/img.png' },
          children: [],
        },
      ],
    } as any;

    const { queryByRole } = await render(
      <WordPressProvider>
        <WpAnchor element={mockElement}>
          <Text>Image inside Anchor</Text>
        </WpAnchor>
      </WordPressProvider>
    );

    // Should NOT render Pressable directly
    expect(queryByRole('Pressable')).toBeNull();
    expect(screen.getByText('Image inside Anchor')).toBeTruthy();
  });
});
