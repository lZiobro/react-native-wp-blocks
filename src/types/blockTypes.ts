import type { ReactNode } from 'react';

/**
 * List of common gutenberg block names. May be incomplete.
 */
export enum WordPressBlockName {
  CLASSIC = 'core/freeform',
  MORE = 'core/more',
  ACCORDION = 'core/accordion',
  ACCORDION_ITEM = 'core/accordion-item',
  ACCORDION_HEADING = 'core/accordion-heading',
  ACCORDION_PANEL = 'core/accordion-panel',
  READ_MORE = 'core/read-more',
  FOOTNOTES = 'core/footnotes',
  DETAILS = 'core/details',
  VERSE = 'core/verse',
  PARAGRAPH = 'core/paragraph',
  LIST = 'core/list',
  LIST_ITEM = 'core/list-item',
  HEADER = 'core/heading',
  SPACER = 'core/spacer',
  SEPARATOR = 'core/separator',
  QUOTE = 'core/quote',
  PULLQUOTE = 'core/pullquote',
  PREFORMATTED = 'core/preformatted',
  CODE = 'core/code',
  IMAGE = 'core/image',
  AUDIO = 'core/audio',
  VIDEO = 'core/video',
  BLOCK = 'core/block',
  GROUP = 'core/group',
  COLUMNS = 'core/columns',
  COLUMN = 'core/column',
  TABLE = 'core/table',
  GALLERY = 'core/gallery',
  HTML = 'core/html',
  EMBED = 'core/embed',
  SHORTCODE = 'core/shortcode',
  MEDIA_TEXT = 'core/media-text',
  FILE = 'core/file',
  BUTTONS = 'core/buttons',
  BUTTON = 'core/button',
  COVER = 'core/cover',
}

export type WordPressBlock = {
  // TODO: change to Record<string, unknown> with extended typing for things like ParagraphBlockAttrs, CoverBlockAttrs etc.
  attrs: Record<string, any>;
  blockName: WordPressBlockName | string | null;
  innerBlocks: WordPressBlock[];
  innerHTML: string;
};

export type BlockComponentProps = {
  wpBlock: WordPressBlock;
  children?: ReactNode;
  index?: number;
};
