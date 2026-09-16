import { describe, expect, it } from '@jest/globals';
import {
  translateNodeCssClasses,
  translateNodeInlineStyles,
  translateNodeStyles,
  type WordPressHtmlStyleConfig,
} from '../htmlStyles';

describe('translateNodeStyles', () => {
  const baseConfig: WordPressHtmlStyleConfig = {
    allowedDomains: ['color', 'typography'],
    classDict: {
      'has-red-color': {
        domain: 'color',
        style: { color: 'red' },
      },
      'has-large-font': {
        domain: 'typography',
        style: { fontSize: 24 },
      },
      'has-margin-auto': {
        domain: 'spacing', // Not in allowedDomains by default
        style: { margin: 16 },
      },
    },
    styleDict: {
      'color': { property: 'color', domain: 'color' },
      'font-size': { property: 'fontSize', domain: 'typography' },
      'line-height': { property: 'lineHeight', domain: 'typography' },
    },
    tagExceptions: {
      p: ['spacing'], // 'p' tags get 'spacing' in addition to allowedDomains
    },
  };

  it('safely handles missing or empty node attributes', () => {
    expect(
      translateNodeStyles({ name: 'div', attribs: {} }, baseConfig)
    ).toEqual({});
    // @ts-expect-error testing runtime guard
    expect(translateNodeStyles(null, baseConfig)).toEqual({});
  });

  it('translates CSS classes matching allowed domains', () => {
    const node = {
      name: 'div',
      attribs: { class: 'has-red-color has-large-font' },
    };

    const result = translateNodeStyles(node, baseConfig);

    expect(result).toEqual({
      color: 'red',
      fontSize: 24,
    });
  });

  it('filters out classes outside permitted domains', () => {
    const node = {
      name: 'div',
      attribs: { class: 'has-margin-auto' }, // spacing domain
    };

    const result = translateNodeStyles(node, baseConfig);

    // 'spacing' is not in allowedDomains for <div>
    expect(result).toEqual({});
  });

  it('honors tagExceptions for specific domains', () => {
    const node = {
      name: 'p', // <p> has spacing allowed in tagExceptions
      attribs: { class: 'has-margin-auto' },
    };

    const result = translateNodeStyles(node, baseConfig);

    expect(result).toEqual({ margin: 16 });
  });

  it('translates inline styles and parses numeric values correctly', () => {
    const node = {
      name: 'div',
      attribs: {
        style: 'color: blue; font-size: 18px; line-height: 1.5;',
      },
    };

    const result = translateNodeStyles(node, baseConfig);

    expect(result).toEqual({
      color: 'blue',
      fontSize: 18,
      lineHeight: 1.5,
    });
  });

  it('ensures inline styles override CSS class styles (precedence)', () => {
    const node = {
      name: 'div',
      attribs: {
        class: 'has-red-color',
        style: 'color: blue;',
      },
    };

    const result = translateNodeStyles(node, baseConfig);

    // Inline style 'blue' overrides class style 'red'
    expect(result.color).toBe('blue');
  });

  it('ignores unknown or mapped CSS properties outside permitted domains', () => {
    const node = {
      name: 'div',
      attribs: {
        style: 'margin-top: 20px; display: flex;', // margin is spacing; display isn't mapped
      },
    };

    const result = translateNodeStyles(node, baseConfig);

    expect(result).toEqual({});
  });
});

describe('helpers unit tests', () => {
  const config: WordPressHtmlStyleConfig = {
    allowedDomains: ['color'],
    classDict: {
      red: { domain: 'color', style: { color: 'red' } },
    },
    styleDict: {},
  };

  it('translateNodeCssClasses handles extra whitespace in class string', () => {
    const node = { name: 'div', attribs: { class: '  red   ' } };
    expect(translateNodeCssClasses(node, config)).toEqual({ color: 'red' });
  });

  it('translateNodeInlineStyles handles NaN fallback for non-numeric padding', () => {
    const node = { name: 'div', attribs: { style: 'padding: auto;' } };
    // 'padding' is in spacing domain, so we need spacing permitted to reach parseFloat logic
    const spacingConfig: WordPressHtmlStyleConfig = {
      allowedDomains: ['spacing'],
      classDict: {},
      styleDict: { padding: { property: 'padding', domain: 'spacing' } },
    };

    expect(translateNodeInlineStyles(node, spacingConfig)).toEqual({
      padding: 'auto',
    });
  });
});
