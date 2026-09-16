import { type TextStyle, type ViewStyle } from 'react-native';
import { parseInlineStyle } from '../utils/htmlUtils';
import type { ReactNativeStyles } from './parseThemeStyles';
import type { Element } from 'domhandler';

export type WordPressStyleDomain =
  'layout' | 'color' | 'typography' | 'spacing';

export type HtmlClassDict = Record<
  string,
  { domain: WordPressStyleDomain; style: TextStyle & ViewStyle }
>;

export type HtmlStyleDict = Record<
  string,
  { property: keyof ReactNativeStyles; domain: WordPressStyleDomain }
>;

export type WordPressHtmlStyleConfig = {
  allowedDomains: WordPressStyleDomain[];
  classDict: HtmlClassDict;
  styleDict: HtmlStyleDict;
  tagExceptions?: Record<string, WordPressStyleDomain[]>;
};

export const translateNodeCssClasses = (
  node: Pick<Element, 'name' | 'attribs'>,
  config: WordPressHtmlStyleConfig
): TextStyle & ViewStyle => {
  const finalStyles: Record<string, any> = {};
  const { allowedDomains, classDict, tagExceptions } = config;

  const permittedDomainsForTag = [
    ...allowedDomains,
    ...(tagExceptions?.[node?.name] || []),
  ];

  if (node.attribs.class) {
    const classNames = node.attribs.class.split(/\s+/);

    classNames.forEach((className) => {
      const definition = classDict[className];
      if (definition) {
        if (permittedDomainsForTag.includes(definition.domain)) {
          Object.assign(finalStyles, definition.style);
        }
      }
    });
  }

  return finalStyles;
};

export const translateNodeInlineStyles = (
  node: Pick<Element, 'name' | 'attribs'>,
  config: WordPressHtmlStyleConfig
): TextStyle & ViewStyle => {
  const finalStyles: Record<string, any> = {};
  const { allowedDomains, styleDict, tagExceptions } = config;

  const permittedDomainsForTag = [
    ...allowedDomains,
    ...(tagExceptions?.[node?.name] || []),
  ];

  if (node.attribs.style) {
    const styles = parseInlineStyle(node.attribs.style);

    Object.entries(styles).forEach(([property, value]) => {
      const mapping = styleDict[property];
      if (mapping && permittedDomainsForTag.includes(mapping.domain)) {
        let parsedValue: any = value;
        if (
          mapping.property === 'fontSize' ||
          mapping.property === 'lineHeight' ||
          mapping.property.startsWith('padding') ||
          mapping.property.startsWith('margin')
        ) {
          parsedValue = parseFloat(value);
          if (isNaN(parsedValue)) parsedValue = value;
        }

        finalStyles[mapping.property] = parsedValue;
      }
    });
  }

  return finalStyles;
};

/**
 * Translates node styles from css `classes` and `inline` styles using provided config
 * @param node
 * @param config Used to determine which domains should be applied as well as exceptions for selected tags and class translation table
 * @returns {TextStyle & ViewStyle}
 */
export const translateNodeStyles = (
  node: Pick<Element, 'name' | 'attribs'>,
  config: WordPressHtmlStyleConfig
): TextStyle & ViewStyle => {
  const finalStyles: Record<string, any> = {};

  if (!node?.attribs) return finalStyles;

  //check css classes
  const cssStyles = translateNodeCssClasses(node, config);
  Object.assign(finalStyles, cssStyles);

  //check inline-styles
  const inlineStyles = translateNodeInlineStyles(node, config);
  Object.assign(finalStyles, inlineStyles);

  return finalStyles;
};
