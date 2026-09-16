import { Dimensions, Image, Platform, Text, View } from 'react-native';
import {
  WordPressContext,
  type WordPressContextPrimitives,
  type WordPressContextTheme,
  type WordPressContextType,
  type WordPressProviderConfig,
  type WordPressStyles,
} from './context/WordPress/WordPressContext';
import { type WordPressComponentProps } from './types/htmlTypes';
import { type BlockComponentProps } from './types/blockTypes';
import { WordPressBlockName } from './types/blockTypes';
import { useMemo, type ComponentType, type ReactNode } from 'react';
import {
  translateNodeStyles,
  type HtmlClassDict,
  type HtmlStyleDict,
  type WordPressHtmlStyleConfig,
} from './styles/htmlStyles';
import { parseThemeStyles } from './styles/parseThemeStyles';
import {
  WpAnchor,
  WpBlockquote,
  WpCite,
  WpCode,
  WpFigcaption,
  WpHeader,
  WpPre,
  WpText,
} from './_components/Text';
import {
  WpEm,
  WpMark,
  WpStrike,
  WpStrong,
  WpSub,
  WpSup,
} from './_components/Text/Modifiers';
import { WpButton, WpImg } from './_components/Media';
import { WpBr, WpCenter, WpHr } from './_components/Layout';
import {
  WpTable,
  WpTbody,
  WpTd,
  WpTfoot,
  WpTh,
  WpThead,
  WpTr,
} from './_components/Layout/Table';
import { WpLi, WpList } from './_components/Layout/List';
import { NestedHtmlBlock, StandardHtmlBlock } from './_blocks/Reusable';
import { ListBlock, ListItemBlock } from './_blocks/Text/List';
import { GroupBlock, SeparatorBlock, SpacerBlock } from './_blocks/Design';
import {
  ClassicEditorBlock,
  DetailsBlock,
  FootnotesBlock,
  QuoteBlock,
} from './_blocks/Text';
import { ColumnBlock, ColumnsBlock } from './_blocks/Design/Columns';
import { CoverBlock, MediaTextBlock } from './_blocks/Media';
import { ButtonBlock, ButtonsBlock } from './_blocks/Design/Buttons';
import {
  AccordionHeadingBlock,
  AccordionItemBlock,
} from './_blocks/Design/Accordion';
import type { Element } from 'domhandler';
import { AnchorProvider } from './context/Anchor/AnchorProvider';
import { WpSpan } from './_components/Text/WpSpan';

const defaultPrimitives: WordPressContextPrimitives = {
  Text: Text,
  View: View,
  Image: Image,
};

const defaultTheme: WordPressContextTheme = {
  'theme.text_color': undefined,
  'theme.link_color': undefined,
  'theme.border_color': undefined,
  'theme.background_accent_1': '#333',
  'theme.background_accent_2': '#555',
  'theme.border_small': 5,
  'theme.border_medium': 10,
  'theme.margin_xs': 5,
  'theme.margin_small': 10,
  'theme.margin_medium': 20,
  'theme.margin_large': 30,
  'theme.padding_xxs': 3,
  'theme.padding_xs': 5,
  'theme.font_xs': 12,
  'theme.font_small': 16,
  'theme.font_sm': 18,
  'theme.font_medium': 20,
  'theme.font_large': 24,
  'theme.font_xl': 28,
};

const defaultHtmlRenderers: Record<
  string,
  React.ComponentType<WordPressComponentProps>
> = {
  internal_anchorContext: AnchorProvider,
  p: WpText,
  a: WpAnchor,
  span: WpSpan,
  sup: WpSup,
  sub: WpSub,
  pre: WpPre,
  mark: WpMark,
  h1: (props: WordPressComponentProps) => (
    <WpHeader
      {...props}
      additionalProps={{ headerVariant: 'h1', ...props.additionalProps }}
    />
  ),
  h2: (props: WordPressComponentProps) => (
    <WpHeader
      {...props}
      additionalProps={{ headerVariant: 'h2', ...props.additionalProps }}
    />
  ),
  h3: (props: WordPressComponentProps) => (
    <WpHeader
      {...props}
      additionalProps={{ headerVariant: 'h3', ...props.additionalProps }}
    />
  ),
  h4: (props: WordPressComponentProps) => (
    <WpHeader
      {...props}
      additionalProps={{ headerVariant: 'h4', ...props.additionalProps }}
    />
  ),
  h5: (props: WordPressComponentProps) => (
    <WpHeader
      {...props}
      additionalProps={{ headerVariant: 'h5', ...props.additionalProps }}
    />
  ),
  h6: (props: WordPressComponentProps) => (
    <WpHeader
      {...props}
      additionalProps={{ headerVariant: 'h6', ...props.additionalProps }}
    />
  ),
  strong: WpStrong,
  b: WpStrong,
  em: WpEm,
  i: WpEm,
  s: WpStrike,
  img: WpImg,
  hr: WpHr,
  br: WpBr,
  center: WpCenter,
  figcaption: WpFigcaption,
  cite: WpCite,
  blockquote: WpBlockquote,
  code: WpCode,
  table: WpTable,
  thead: WpThead,
  tbody: WpTbody,
  tfoot: WpTfoot,
  tr: WpTr,
  th: WpTh,
  td: WpTd,
  li: WpLi,
  details: (props: WordPressComponentProps) => props.children,
  button: WpButton,
  summary: WpText, //maybe add symbol here and expand functionality? would support classic html then
  figure: (props: WordPressComponentProps) => props.children,
  div: (props: WordPressComponentProps) => props.children,
  ol: WpList,
  ul: WpList,
  object: () => <></>, //used in core/file or something as an iframe for a preview if the file supports it
};

const defaultBlockComponents: Record<
  string | WordPressBlockName,
  ({ children, wpBlock }: BlockComponentProps) => ReactNode
> = {
  //#region Design
  [WordPressBlockName.ACCORDION]: NestedHtmlBlock,
  [WordPressBlockName.ACCORDION_ITEM]: AccordionItemBlock,
  [WordPressBlockName.ACCORDION_HEADING]: AccordionHeadingBlock,
  [WordPressBlockName.ACCORDION_PANEL]: NestedHtmlBlock,
  [WordPressBlockName.BUTTON]: ButtonBlock,
  [WordPressBlockName.BUTTONS]: ButtonsBlock,
  [WordPressBlockName.COLUMN]: ColumnBlock,
  [WordPressBlockName.COLUMNS]: ColumnsBlock,
  [WordPressBlockName.GROUP]: GroupBlock,
  [WordPressBlockName.MORE]: () => <></>,
  [WordPressBlockName.SEPARATOR]: SeparatorBlock,
  [WordPressBlockName.SPACER]: SpacerBlock,
  //#endregion Design

  //#region Embed
  //#endregion

  //#region Media
  [WordPressBlockName.AUDIO]: StandardHtmlBlock, //this doesnt have any usable attrs? its just <figure><audio>
  [WordPressBlockName.COVER]: CoverBlock,
  [WordPressBlockName.FILE]: StandardHtmlBlock,
  [WordPressBlockName.GALLERY]: NestedHtmlBlock,
  [WordPressBlockName.IMAGE]: StandardHtmlBlock,
  [WordPressBlockName.MEDIA_TEXT]: MediaTextBlock,
  //#endregion

  //#region Reusable
  // [WPBlockName.BLOCK]: () => <></>, //this is dynamically generated, but we shouldn't explicitily "hide it"
  //#endregion

  //#region Text
  [WordPressBlockName.CODE]: StandardHtmlBlock,
  [WordPressBlockName.DETAILS]: DetailsBlock,
  [WordPressBlockName.FOOTNOTES]: FootnotesBlock,
  [WordPressBlockName.CLASSIC]: ClassicEditorBlock,
  [WordPressBlockName.HEADER]: StandardHtmlBlock,
  [WordPressBlockName.LIST]: ListBlock,
  [WordPressBlockName.LIST_ITEM]: ListItemBlock,
  [WordPressBlockName.PARAGRAPH]: StandardHtmlBlock,
  [WordPressBlockName.PREFORMATTED]: StandardHtmlBlock,
  [WordPressBlockName.PULLQUOTE]: QuoteBlock,
  [WordPressBlockName.QUOTE]: QuoteBlock,
  [WordPressBlockName.TABLE]: StandardHtmlBlock,
  [WordPressBlockName.VERSE]: StandardHtmlBlock,
  //#endregion

  //#region Theme
  //#endregion

  //#region Widgets
  [WordPressBlockName.HTML]: StandardHtmlBlock,
  //#endregion

  //core/icon - i dont think its worth trying to parse it by default. it doesnt return any svg path or anything and just instead just:
  // attrs: {
  //   icon: "core\/rss",
  // },
};

export const defaultProviderConfig: WordPressProviderConfig = {
  skipSingularNewLines: true,
  showMissingBlockErrors: true,
  showMissingHtmlRendererErrors: true,
  htmlFallbackErrorMessage: 'Corrupted HTML element',
  imgErrorMessage: 'Error loading image',
};

const defaultStyles: WordPressStyles = {
  //#region Gutenberg Blocks
  AccordionHeadingBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    borderBottomWidth: 1,
    borderColor: 'theme.border_color',
  },
  AccordionHeadingIcon: {
    fontWeight: 700,
    color: 'theme.text_color',
    marginTop: 'theme.margin_medium',
    fontSize: 'theme.font_medium',
  },
  AccordionItemBlock: {},
  AccordionItemContent: {},
  ButtonBlock: {
    backgroundColor: 'theme.background_accent_1',
    marginVertical: 'theme.margin_xs',
    borderRadius: 'theme.border_medium',
    padding: 'theme.margin_small',
    elevation: 2,
    width: 'auto',
    display: 'flex',
    flexShrink: 1,
  },
  ButtonsBlock: {},
  ClassicEditorBlock: { flex: 1 },
  ColumnBlock: { flex: 1, padding: 'theme.padding_xs' },
  ColumnsBlock: { flex: 1, flexDirection: 'row' },
  CoverBlock: { overflow: 'hidden', borderRadius: 'theme.border_small' },
  CoverBlockBackgroundImage: {
    minWidth: '100%',
    //this is only calculated once at startup and never updated
    minHeight: Dimensions.get('screen').height * 0.5,
  },
  CoverBlockContentWrapper: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  DetailsBlock: {},
  DetailsContent: {},
  FootnotesBlock: {},
  GroupBlock: {
    width: '100%',
  },
  GroupGrid: { width: '100%', padding: 'theme.padding_xxs' },
  GroupGridRow: {
    gap: 'theme.padding_xxs',
    flexDirection: 'row',
    width: '100%',
  },
  GroupGridColumn: {
    flex: 1,
  },
  GroupGridPlaceholder: {
    flex: 1,
  },
  GroupFlexItem: {
    flex: 1,
    flexShrink: 1, //important for group/row
  },
  ListBlock: {},
  ListItemBlock: { marginTop: 'theme.margin_small' },
  ListItemBlockNested: { marginLeft: 'theme.margin_medium' },
  MediaTextBlock: {},
  NestedHTMLBlock: {}, //no wrapper even?
  QuoteBlock: {
    borderColor: 'theme.border_color',
    paddingLeft: 'theme.padding_xs',
    borderLeftWidth: 2,
    alignItems: 'center',
  },
  SeparatorBlock: {
    paddingTop: 'theme.margin_small',
    marginBottom: 'theme.margin_small',
    borderColor: 'theme.border_color',
    borderBottomWidth: 1,
  },
  SpacerBlock: { marginTop: 'theme.margin_medium' },
  StandardHTMLBlock: { marginVertical: 'theme.margin_xs' },
  //#endregion
  //#region Html Renderers
  WpAnchor: {
    color: 'theme.link_color',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  WpBlockquote: { alignItems: 'center' },
  WpBr: {},
  WpButton: {},
  WpCenter: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  WpCite: {
    fontStyle: 'italic',
    color: 'theme.text_color',
  },
  WpCode: {
    color: 'theme.text_color',
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }),
  },
  WpEm: { fontStyle: 'italic' },
  WpFigcaption: { color: 'theme.text_color', fontStyle: 'italic' },
  WpH1: {
    fontWeight: 700,
    color: 'theme.text_color',
    marginTop: 'theme.margin_large',
    fontSize: 'theme.font_xl',
  },
  WpH2: {
    fontWeight: 700,
    color: 'theme.text_color',
    marginTop: 'theme.margin_large',
    fontSize: 'theme.font_large',
  },
  WpH3: {
    fontWeight: 700,
    color: 'theme.text_color',
    marginTop: 'theme.margin_medium',
    fontSize: 'theme.font_medium',
  },
  WpH4: {
    fontWeight: 700,
    color: 'theme.text_color',
    marginTop: 'theme.margin_medium',
    fontSize: 'theme.font_sm',
  },
  WpH5: {
    fontWeight: 700,
    color: 'theme.text_color',
    marginTop: 'theme.margin_small',
    fontSize: 'theme.font_small',
  },
  WpH6: {
    fontWeight: 700,
    color: 'theme.text_color',
    marginTop: 'theme.margin_xs',
    fontSize: 'theme.font_xs',
  },
  WpHr: {
    borderBottomColor: 'theme.border_color',
    width: '100%',
    height: 1,
    borderBottomWidth: 1,
  },
  WpImg: { width: '100%' },
  WpImgError: {
    textAlign: 'center',
    color: 'red',
    margin: 'theme.margin_small',
  },
  WpImgWrapper: {
    overflow: 'hidden',
    width: '100%',
    borderRadius: 'theme.border_medium',
  },
  WpLi: { flex: 1, flexDirection: 'row' },
  WpLiInner: { flex: 1 },
  WpList: {},
  WpMark: {},
  WpPre: {
    color: 'theme.text_color',
    backgroundColor: 'theme.background_accent_2',
    borderRadius: 'theme.border_small',
    padding: 'theme.margin_small',
  },
  WpSpan: {},
  WpStrike: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  WpStrong: { fontWeight: 700 },
  WpSub: {
    transform: [{ translateY: 8 }],
    marginHorizontal: 'theme.margin_xs',
  },
  WpSubText: { fontSize: 10 },
  WpSup: {
    transform: [{ translateY: -2 }],
    marginHorizontal: 'theme.margin_xs',
  },
  WpSupText: { fontSize: 10 },
  WpTable: {
    flex: 1,
    width: '100%',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'theme.border_color',
  },
  WpTbody: {},
  WpTd: {
    flex: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'theme.padding_xxs',
    borderColor: 'theme.border_color',
  },
  WpTdText: { color: 'theme.text_color', textAlign: 'center' },
  WpText: { color: 'theme.text_color' },
  WpTextBase: { color: 'theme.text_color' },
  WpTfoot: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 2,
    borderColor: 'theme.border_color',
  },
  WpTh: {
    flex: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'theme.padding_xxs',
    borderColor: 'theme.border_color',
  },
  WpThText: { color: 'theme.text_color', textAlign: 'center', fontWeight: 700 },
  WpThead: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: 'theme.border_color',
  },
  WpTr: { flex: 1, flexDirection: 'row', width: '100%' },
  //#endregion
};

const defaultHtmlClassDict: HtmlClassDict = {
  'has-text-align-right': { domain: 'layout', style: { textAlign: 'right' } },
  'has-text-align-left': { domain: 'layout', style: { textAlign: 'left' } },
  'has-text-align-center': {
    domain: 'layout',
    style: { textAlign: 'center' },
  },
};

const defaultHtmlStyleDict: HtmlStyleDict = {
  'text-align': { property: 'textAlign', domain: 'layout' },
  'float': { property: 'alignSelf', domain: 'layout' },

  'color': { property: 'color', domain: 'color' },
  'background-color': { property: 'backgroundColor', domain: 'color' },

  'font-size': { property: 'fontSize', domain: 'typography' },
  'font-family': { property: 'fontFamily', domain: 'typography' },
  'line-height': { property: 'lineHeight', domain: 'typography' },
  'font-weight': { property: 'fontWeight', domain: 'typography' },

  'padding': { property: 'padding', domain: 'spacing' },
  'padding-top': { property: 'paddingTop', domain: 'spacing' },
  'padding-left': { property: 'paddingLeft', domain: 'spacing' },
  'padding-bottom': { property: 'paddingBottom', domain: 'spacing' },
  'padding-right': { property: 'paddingRight', domain: 'spacing' },
  'margin': { property: 'margin', domain: 'spacing' },
  'margin-top': { property: 'marginTop', domain: 'spacing' },
  'margin-left': { property: 'marginLeft', domain: 'spacing' },
  'margin-bottom': { property: 'marginBottom', domain: 'spacing' },
  'margin-right': { property: 'marginRight', domain: 'spacing' },
};

const defaultWordPressHtmlStylesConfig: WordPressHtmlStyleConfig = {
  allowedDomains: ['layout', 'spacing'],

  tagExceptions: {
    mark: ['color'],
  },

  classDict: defaultHtmlClassDict,
  styleDict: defaultHtmlStyleDict,
};

export type WordPressProviderProps = {
  children: ReactNode;
  primitives?: Partial<WordPressContextPrimitives>;
  config?: Partial<WordPressProviderConfig>;
  styles?: Partial<WordPressStyles>;
  htmlStylesConfig?: Partial<WordPressHtmlStyleConfig>;
} & Partial<
  Omit<WordPressContextType, 'config' | 'styles' | 'parseStyles' | 'primitives'>
>;

/**
 * Shortcut for Provider with default values. Will merge values from params with defaults.
 *
 * @param children
 * @param primitives Primitives to be used inplace of defaults. Useful for things like custom StyledText.
 * @param theme Optional theme values overrides if you dont like for example paddings widths. **Note:** you will most likely need to adjust `theme.border_color` `theme.link_color` `background_accent_1` and `background_accent_2` according to your app theme.
 * @param blocks Lookup table for gutneberg blocks. Docs: {@link https://developer.wordpress.org/block-editor/reference-guides/core-blocks/}
 * @param htmlRenderers Lookup table for html elements.
 * @param config Refer to {@link WordPressProviderConfig}
 * @param styles Styles overrides if you feel like swapping out whole components is too much. Provides tooltips for classes and theme values.
 * @param htmlStylesConfig Optional config override for parsing css `classes` and inline `styles`. It is not fully implemented in all components yet.
 * @returns WordPressProvider
 */
export const WordPressProvider = ({
  children,
  primitives = {},
  theme = {},
  blocks = {},
  htmlRenderers = {},
  config = {},
  styles = {},
  htmlStylesConfig = {},
}: WordPressProviderProps) => {
  const value = useMemo(() => {
    const finalPrimitives = {
      ...defaultPrimitives,
      ...primitives,
    };
    const finalHtmlRenderers: Record<
      string,
      ComponentType<WordPressComponentProps>
    > = {
      ...defaultHtmlRenderers,
      ...htmlRenderers,
    };
    const finalBlocks: Record<string, ComponentType<BlockComponentProps>> = {
      ...defaultBlockComponents,
      ...blocks,
    };
    const finalConfig = { ...defaultProviderConfig, ...config };
    const finalTheme = { ...defaultTheme, ...theme };
    const finalStyles = parseThemeStyles(
      { ...defaultStyles, ...((styles as WordPressStyles) ?? {}) },
      finalTheme
    );
    const finalWordPressHtmlStylesConfig: WordPressHtmlStyleConfig = {
      allowedDomains:
        htmlStylesConfig.allowedDomains ??
        defaultWordPressHtmlStylesConfig.allowedDomains,
      tagExceptions: {
        ...defaultWordPressHtmlStylesConfig.tagExceptions,
        ...htmlStylesConfig.tagExceptions,
      },
      classDict: {
        ...defaultWordPressHtmlStylesConfig.classDict,
        ...htmlStylesConfig.classDict,
      },
      styleDict: {
        ...defaultWordPressHtmlStylesConfig.styleDict,
        ...htmlStylesConfig.styleDict,
      },
    };
    return {
      primitives: finalPrimitives,
      theme: finalTheme,
      blocks: finalBlocks,
      htmlRenderers: finalHtmlRenderers,
      config: finalConfig,
      styles: finalStyles,
      parseStyles: (node: Pick<Element, 'name' | 'attribs'>) =>
        translateNodeStyles(node, finalWordPressHtmlStylesConfig),
    };
  }, [
    primitives,
    theme,
    blocks,
    htmlRenderers,
    config,
    styles,
    htmlStylesConfig,
  ]);

  return (
    <WordPressContext.Provider value={value}>
      {children}
    </WordPressContext.Provider>
  );
};
