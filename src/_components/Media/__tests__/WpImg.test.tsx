import { describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { type WordPressProviderConfig } from '../../../context/WordPress/WordPressContext';
import { WpImg } from '../WpImg';
import { Image, Linking } from 'react-native';
import { WordPressProvider } from '../../../WordPressProvider';
import { AnchorContext } from '../../../context/Anchor';

describe('WpImg', () => {
  it('should render image component after successfully resolving dimensions', async () => {
    const getSizeSpy = jest
      .spyOn(Image, 'getSize')
      .mockImplementation(
        (
          _uri: string,
          success: (width: number, height: number) => void,
          _failure: ((error: any) => void) | undefined
        ) => {
          success(200, 100); // 2:1 aspect ratio
        }
      );

    const mockElement = {
      type: 'tag',
      name: 'img',
      attribs: { src: 'https://example.com/img.jpg' },
      children: [],
    } as any;

    await render(
      <WordPressProvider>
        <WpImg element={mockElement} />
      </WordPressProvider>
    );

    expect(getSizeSpy).toHaveBeenCalledWith(
      'https://example.com/img.jpg',
      expect.any(Function),
      expect.any(Function)
    );
    getSizeSpy.mockRestore();
  });

  it('should render error message when dimension lookup fails and config has error message', async () => {
    const getSizeSpy = jest
      .spyOn(Image, 'getSize')
      .mockImplementation(
        (
          _uri: string,
          _success: (width: number, height: number) => void,
          failure: ((error: any) => void) | undefined
        ) => {
          failure!(new Error('Image failed to load'));
        }
      );

    const mockElement = {
      type: 'tag',
      name: 'img',
      attribs: { src: 'https://example.com/invalid.jpg' },
      children: [],
    } as any;

    const mockConfig: Partial<WordPressProviderConfig> = {
      imgErrorMessage: 'Error loading image',
    };

    await render(
      <WordPressProvider config={mockConfig}>
        <WpImg element={mockElement} />
      </WordPressProvider>
    );

    expect(screen.getByText('Error loading image')).toBeTruthy();
    getSizeSpy.mockRestore();
  });

  it('should NOT render error message when dimension lookup fails but config has NO error message', async () => {
    const getSizeSpy = jest
      .spyOn(Image, 'getSize')
      .mockImplementation(
        (
          _uri: string,
          _success: (width: number, height: number) => void,
          failure: ((error: any) => void) | undefined
        ) => {
          failure!(new Error('Image failed to load'));
        }
      );

    const mockElement = {
      type: 'tag',
      name: 'img',
      attribs: { src: 'https://example.com/invalid.jpg' },
      children: [],
    } as any;

    const mockConfig: Partial<WordPressProviderConfig> = {
      imgErrorMessage: '',
    };

    await render(
      <WordPressProvider config={mockConfig}>
        <WpImg element={mockElement} />
      </WordPressProvider>
    );

    expect(screen.queryByText('Error loading image')).toBeNull();
    getSizeSpy.mockRestore();
  });

  it('should trigger Linking.openURL when wrapped in an anchor context', async () => {
    const getSizeSpy = jest
      .spyOn(Image, 'getSize')
      .mockImplementation(
        (
          _uri: string,
          success: (width: number, height: number) => void,
          _failure: ((error: any) => void) | undefined
        ) => {
          success(100, 100);
        }
      );

    const openURLSpy = jest
      .spyOn(Linking, 'openURL')
      .mockImplementation(() => Promise.resolve());

    const mockElementWithAnchor = {
      type: 'tag',
      name: 'img',
      tagName: 'img',
      attribs: { src: 'https://example.com/img.jpg' },
      children: [],
    } as any;

    const { toJSON } = await render(
      <WordPressProvider>
        <AnchorContext.Provider value={{ href: 'https://clicklink.com' }}>
          <WpImg element={mockElementWithAnchor} />
        </AnchorContext.Provider>
      </WordPressProvider>
    );

    const json = toJSON();
    expect(json).not.toBeNull();
    await json!.props.onClick();

    expect(openURLSpy).toHaveBeenCalledWith('https://clicklink.com');

    getSizeSpy.mockRestore();
    openURLSpy.mockRestore();
  });
});
