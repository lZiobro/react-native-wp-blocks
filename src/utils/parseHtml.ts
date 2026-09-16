import { type ChildNode, Document, hasChildren, isText } from 'domhandler';
import { parseDocument } from 'htmlparser2';
import { isElement } from './htmlUtils';

//** i don't think this is the way to go */
export const normalizeHtmlWhitespace = (htmlString: string) => {
  return htmlString.replace(/\r?\n|\r/g, ' ');
};

/** Elements that cant be embeded into any paragraph etc. (could probably be a leaf_element?) */
const BLOCK_ELEMENTS: string[] = ['img', 'audio', 'video', 'hr'];
/** List of tags that will be treated as TAG_OPEN, but are in reality a text-wrappers, but unlike {@link INLINE_ELEMENTS} they are displayed as blocks */
const TEXT_BLOCKS: string[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'pre',
  'blockquote', //shouldn't be there?
];

/** List of tags that are inline */
const INLINE_ELEMENTS: string[] = [
  'a',
  'span',
  'em',
  'strong',
  'b',
  'i',
  'code',
  'cite',
  'u',
  's',
  'mark',
  'sub',
  'sup',
  'button',
];

/** Type of a processor token. */
export enum HtmlTokenType {
  /** Opening of a block tag (div, table) **NOTE:** will also include text-block tags like <p>, <h2>. */
  TAG_OPEN = 'TAG_OPEN',
  /** Closing of a tag from {@link TAG_OPEN}. */
  TAG_CLOSE = 'TAG_CLOSE',
  /** Leaf elements should include things like <br />, <hr /> (they are blocks rn. i think. not sure if no children check passes.) */
  LEAF_ELEMENT = 'LEAF_ELEMENT',
  /** Node with no name, but instead a string data */
  TEXT = 'TEXT',
  /** Element that cant be embeded into any paragraphs etc. Similar to LEAF_ELEMENT. */
  BLOCK_ELEMENT = 'BLOCK_ELEMENT',
  /** Opening of an inline tag (text modifiers). List: {@link INLINE_ELEMENTS} */
  INLINE_OPEN = 'INLINE_OPEN',
  /** Closing of a tag from {@link INLINE_OPEN}. */
  INLINE_CLOSE = 'INLINE_CLOSE',
  /** Grouped {@link TEXT}, {@link INLINE_OPEN} and {@link INLINE_CLOSE} */
  TEXT_CHUNK = 'INLINE_CHUNK',
}

/** Represents anything that can be embeded into {@link HtmlTokenType.TEXT_CHUNK} */
export type InlineToken =
  | { type: HtmlTokenType.TEXT; data: string }
  | {
      type: HtmlTokenType.INLINE_OPEN;
      name: string;
      attribs: Record<string, any>;
    }
  | { type: HtmlTokenType.INLINE_CLOSE; name: string };

export type TagOpenToken = {
  type: HtmlTokenType.TAG_OPEN;
  name: string;
  attribs: Record<string, any>;
  closedTag?: TagOpenToken;
};

/** Processor token, which are used to build flat structure and avoid nesting {@link View} into {@link Text} */
export type HtmlToken =
  | InlineToken
  | TagOpenToken
  | { type: HtmlTokenType.TAG_CLOSE; name: string }
  | {
      type: HtmlTokenType.BLOCK_ELEMENT;
      name: string;
      attribs: Record<string, any>;
      parentInlineStack?: { name: string; attribs: Record<string, any> }[];
      closedTag?: {
        type: HtmlTokenType.TAG_OPEN;
        name: string;
        attribs: Record<string, any>;
      };
    }
  | {
      type: HtmlTokenType.LEAF_ELEMENT;
      name: string;
      attribs: Record<string, any>;
    }
  | { type: HtmlTokenType.TEXT_CHUNK; elements: InlineToken[] };

/**
 * Processes a {@link domhandler} {@link ChildNode}s into a flat structure.
 * This is an intermediate step to create basic {@link HtmlToken}[] structure without ensuring proper structure and nesting.
 * @param children {@link ChildNode}s to be processed
 * @returns
 */
const tokenize = (children: ChildNode[]): HtmlToken[] => {
  const tokens: HtmlToken[] = [];

  const traverse = (child: ChildNode) => {
    if (isText(child)) {
      tokens.push({ type: HtmlTokenType.TEXT, data: child.data });
      return;
    }

    // We don't want to process anything other than TEXT or ELEMENT
    if (!isElement(child)) {
      return;
    }

    // BLOCK_ELEMENT
    if (BLOCK_ELEMENTS.includes(child.name)) {
      tokens.push({
        type: HtmlTokenType.BLOCK_ELEMENT,
        name: child.name,
        attribs: child.attribs,
      });
      return;
    }

    // LEAF_ELEMENT
    if (!child.children || child.children.length === 0) {
      tokens.push({
        type: HtmlTokenType.LEAF_ELEMENT,
        name: child.name,
        attribs: child.attribs,
      });
      return;
    }

    // INLINE ELEMENT + nested
    if (INLINE_ELEMENTS.includes(child.name)) {
      tokens.push({
        type: HtmlTokenType.INLINE_OPEN,
        name: child.name,
        attribs: child.attribs,
      });

      if (hasChildren(child)) {
        child.children.forEach(traverse);
      }

      tokens.push({ type: HtmlTokenType.INLINE_CLOSE, name: child.name });
      return;
    }

    //REGULAR ELEMENT + nested
    tokens.push({
      type: HtmlTokenType.TAG_OPEN,
      name: child.name,
      attribs: child.attribs,
    });

    if (hasChildren(child)) {
      child.children.forEach(traverse);
    }

    tokens.push({ type: HtmlTokenType.TAG_CLOSE, name: child.name });
  };

  children.forEach(traverse);
  return tokens;
};

export const parseHtml = (source: string | Document) => {
  const parsed = typeof source === 'string' ? parseDocument(source) : source;
  const tokens = tokenize(parsed.children);

  const wrappersBuffer: HtmlToken[] = [];
  let textBuffer: InlineToken[] = [];

  /**
   * Collapses current {@link textBuffer} into a single {@link HtmlTokenType.TEXT_CHUNK} and pushes result into {@link wrappersBuffer}.
   *
   * Will not push anything if {@link textBuffer} is empty.
   *  */
  const collapseTextBuffer = () => {
    if (textBuffer.length === 0) return;

    // Pobieramy aktualnie otwarte tagi inline, by domknąć je wewnątrz chunku
    const openTags: {
      type: HtmlTokenType.INLINE_OPEN;
      name: string;
      attribs: Record<string, any>;
    }[] = [];

    //keep track of any unclosed INLINE_OPEN
    textBuffer.forEach((token) => {
      if (token.type === HtmlTokenType.INLINE_OPEN) {
        openTags.push(token);
      } else if (token.type === HtmlTokenType.INLINE_CLOSE) {
        openTags.pop();
      }
      return token;
    });

    // Ignore if no meaningful content (white spaces etc.)
    const hasMeaningfulContent = textBuffer.some(
      (el) => el.type === HtmlTokenType.TEXT && el.data.trim().length > 0
    );

    if (hasMeaningfulContent) {
      // Enclose any INLINE_OPEN that weren't closed before collapsing
      const closingElements: InlineToken[] = [...openTags]
        .reverse()
        .map((tag) => ({
          type: HtmlTokenType.INLINE_CLOSE,
          name: tag.name,
        }));

      // Push TEXT_CHUNK into the wrappersBuffer
      wrappersBuffer.push({
        type: HtmlTokenType.TEXT_CHUNK,
        elements: [...textBuffer, ...closingElements],
      });
    }

    // We always want to override textBuffer even if it had no meaningful content to get rid of non-meaningful tags :)
    textBuffer = [...openTags];
  };

  // An actual stack to keep track of current elements **NOTE:** does not track INLINE_ELEMENTS (these go to textBuffer)
  const actualStack: TagOpenToken[] = [];

  /** Should probably be replaced with just checking parent element? actualStack[-1]? */
  const getTopmostTextBlock = () => {
    for (let i = actualStack.length - 1; i >= 0; i--) {
      if (TEXT_BLOCKS.includes(actualStack[i]!.name)) {
        return actualStack[i];
      }
    }
    return undefined;
  };

  // Process tokens into an actually valid flat structure that doesn't nest any VIEW into TEXT and groups InlineTokens into a TEXT_CHUNK.
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]!;

    if (
      token.type === HtmlTokenType.TEXT ||
      token.type === HtmlTokenType.INLINE_OPEN ||
      token.type === HtmlTokenType.INLINE_CLOSE
    ) {
      textBuffer.push(token);
    } else if (token.type === HtmlTokenType.TAG_OPEN) {
      //why not just flush and check if chunk was added? whis way we can also skip non-meaningful content
      collapseTextBuffer();

      //are we inside TEXT_BLOCK element? (text wrapper)
      const parentTextBlock = getTopmostTextBlock();

      if (!parentTextBlock) {
        actualStack.push(token);
        wrappersBuffer.push(token);
      } else {
        const isEmpty = wrappersBuffer.at(-1) === actualStack.at(-1);
        // If we are inside TEXT_BLOCK tag we can't ensure anything about it contents.
        // We need to close it before opening any other tag, but remember this artificial close to avoid corrupting tokens.
        // We will reopen problematic TEXT_BLOCK tag after closing this one in TAG_CLOSE
        if (!isEmpty) {
          wrappersBuffer.push({
            type: HtmlTokenType.TAG_CLOSE,
            name: parentTextBlock.name,
          });
          actualStack.pop();
        } else {
          //pop TEXT_BLOCK from stack and wrappers if it has no text-content to avoid empty tags
          actualStack.pop();
          wrappersBuffer.pop(); //i don't see a case where this would NOT be corresponding TAG_OPEN for TEXT_BLOCK we want to get out of
        }

        const openToken = { ...token, closedTag: parentTextBlock };
        actualStack.push(openToken);
        wrappersBuffer.push(openToken);
      }
    } else if (token.type === HtmlTokenType.TAG_CLOSE) {
      collapseTextBuffer();
      //do not immediately push close - first check if previous tag is TAG_OPEN with no TEXT_CHUNK inbetween
      const isEmpty =
        wrappersBuffer.length > 0 &&
        actualStack.length > 0 &&
        wrappersBuffer.at(-1) === actualStack.at(-1);

      const lastStackItem =
        actualStack.length > 0 ? actualStack.at(-1) : undefined;

      if (TEXT_BLOCKS.includes(token.name) && isEmpty) {
        //pop TEXT_BLOCK from wrappers and stack if it has no text-content to avoid empty tags
        actualStack.pop();
        wrappersBuffer.pop(); //i don't see a case where this would NOT be corresponding TAG_OPEN for TEXT_BLOCK we want to get out of
      } else {
        actualStack.pop();
        wrappersBuffer.push(token);
      }

      // Check if we artificially closed a TEXT_BLOCK tag and restore it if needed.
      if (lastStackItem?.closedTag) {
        const closedOpening = lastStackItem.closedTag;
        actualStack.push(closedOpening);
        wrappersBuffer.push(closedOpening);
      }
    } else if (token.type === HtmlTokenType.BLOCK_ELEMENT) {
      collapseTextBuffer();

      // I don't think enriching block components like this is valid. we only ever care about AnchorContext and this is the only thing to check, yes yes yes
      const activeInlineTags = textBuffer
        .filter(
          (
            t
          ): t is {
            type: HtmlTokenType.INLINE_OPEN;
            name: string;
            attribs: Record<string, any>;
          } => t.type === HtmlTokenType.INLINE_OPEN
        )
        .map((t) => ({ name: t.name, attribs: t.attribs }));

      const enrichedBlockToken: HtmlToken = {
        ...token,
        parentInlineStack:
          activeInlineTags.length > 0 ? activeInlineTags : undefined,
      };

      // We need to escape any TEXT_BLOCK wrappers for BLOCK_ELEMENTS
      const parentTextBlock = getTopmostTextBlock();

      // Close any TEXT_BLOCK and immediately reopen after pushing this BLOCK_ELEMENT if necessary
      if (parentTextBlock) {
        wrappersBuffer.push({
          type: HtmlTokenType.TAG_CLOSE,
          name: parentTextBlock.name,
        });

        wrappersBuffer.push(enrichedBlockToken);

        wrappersBuffer.push(parentTextBlock);
      } else {
        wrappersBuffer.push(enrichedBlockToken);
      }
    } else if (token.type === HtmlTokenType.LEAF_ELEMENT) {
      collapseTextBuffer();
      wrappersBuffer.push(token);
    }
  }

  // i guess it is valid to collapse at the end? don't think its necessary for our use case, but wont hurt
  collapseTextBuffer();

  return wrappersBuffer;
};
