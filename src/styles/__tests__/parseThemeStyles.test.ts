import { describe, expect, it } from '@jest/globals';
import type { WordPressContextTheme } from '../../context/WordPress/WordPressContext';
import { parseThemeStyles, type ThemeStyle } from '../parseThemeStyles';

describe('parseThemeStyles', () => {
  it('should properly replace theme.value with values from provided theme', async () => {
    const mockTheme: WordPressContextTheme = {
      'theme.background_accent_1': 'red',
      'theme.font_sm': 18,
    };

    const styles: Record<string, ThemeStyle> = {
      foo: { backgroundColor: 'white', borderRadius: 10 },
      bar: {
        backgroundColor: 'theme.background_accent_1',
        fontSize: 'theme.font_sm',
      },
    };

    const result = parseThemeStyles(styles, mockTheme);

    expect(result).toEqual({
      foo: { backgroundColor: 'white', borderRadius: 10 },
      bar: {
        backgroundColor: mockTheme['theme.background_accent_1'],
        fontSize: mockTheme['theme.font_sm'],
      },
    });
  });

  it('should skip undefined theme values to avoid overwriting properties (e.g. for primitives.Text)', async () => {
    const mockTheme: WordPressContextTheme = {
      'theme.text_color': undefined,
    };

    const styles: Record<string, ThemeStyle> = {
      bar: {
        color: 'blue',
        fontSize: 'theme.text_color',
      },
    };

    const result = parseThemeStyles(styles, mockTheme);

    expect(result).toEqual({ bar: { color: 'blue' } }); //note - no "fontSize: undefined" here and
  });

  it('should properly handle missing theme values', async () => {
    const mockTheme: WordPressContextTheme = {
      // 'theme.border_color': 'red',
      'theme.margin_small': 7,
    };

    const styles: Record<string, ThemeStyle> = {
      bar: {
        margin: 'theme.margin_small',
        borderColor: 'theme.border_color',
        fontSize: 15,
        fontWeight: undefined,
      },
    };

    const result = parseThemeStyles(styles, mockTheme);

    expect(result).toEqual({
      bar: {
        margin: mockTheme['theme.margin_small'],
        fontSize: 15,
      },
    });
  });
});
