import { HtmlTokenType, type HtmlToken } from './parseHtml';

export type ASTNode =
  | {
      type: 'element';
      name: string;
      attribs: Record<string, string>;
      children: ASTNode[];
    }
  | {
      type: 'text';
      value: string;
    };

export type AstConfig = {
  textWrapperTag: string;
};

const defaultAstConfig: AstConfig = {
  // this will override parent styles if selected tag modifies the same params as parent.
  // eg. if TEXT_CHUNK is wrapped inside element TAG_OPEN (h1) and this value will be something like h6 the final result would be:
  // <h1> -> <h6>
  // if both h1 and h6 sets fontSize, final chunk will have h6 fontSize value
  textWrapperTag: 'p',
};

/**
 * Converts {@link HtmlToken}s into an AST that can be processed by the WordPressHtmlSelector.
 * @param tokens
 * @returns
 */
export const tokensToAst = (
  tokens: HtmlToken[],
  config: AstConfig = defaultAstConfig
): ASTNode => {
  const root: ASTNode = {
    type: 'element',
    name: 'div',
    attribs: {},
    children: [],
  };
  const stack: { node: ASTNode; isAutoClosed?: boolean }[] = [{ node: root }];

  const getCurrentWrapper = (): ASTNode[] => {
    const parent = stack[stack.length - 1]!.node;
    return parent.type === 'element' ? parent.children : [];
  };

  for (const token of tokens) {
    if (token.type === HtmlTokenType.TEXT_CHUNK) {
      const parent = stack[stack.length - 1]?.node;
      //TODO: add a flag to control it? maybe in AstConfig?
      const parentAttribs =
        parent && parent.type === 'element' ? parent.attribs : {};
      const chunkRoot: ASTNode[] = []; //if we get something like [TEXT, INLINE_OPEN, TEXT, INLINE_CLOSE] -> we will have 2 nodes here (text, inline_component with nested text)
      const inlineStack: ASTNode[] = []; //current INLINE_OPEN elements

      for (const el of token.elements) {
        if (el.type === HtmlTokenType.TEXT) {
          const target =
            inlineStack.length > 0
              ? (inlineStack[inlineStack.length - 1] as any).children
              : chunkRoot;
          //push to INLINE_OPEN as children if there is any or as a separate node into chunkRoot if no INLINE_OPEN parent
          target.push({ type: 'text', value: el.data });
        } else if (el.type === HtmlTokenType.INLINE_OPEN) {
          const newInlineNode: ASTNode = {
            type: 'element',
            name: el.name,
            attribs: el.attribs,
            children: [],
          };
          const target =
            inlineStack.length > 0
              ? (inlineStack[inlineStack.length - 1] as any).children
              : chunkRoot;
          //push to INLINE_OPEN as children if there is any or as a separate node into chunkRoot if no INLINE_OPEN parent
          target.push(newInlineNode);
          //push to inlineStack - all childs will now go into this component
          inlineStack.push(newInlineNode);
        } else if (el.type === HtmlTokenType.INLINE_CLOSE) {
          inlineStack.pop();
        }
      }

      //at the end, push to the ASTTree result
      //either as a child for a current stack tag or as a separate element if no parent found
      getCurrentWrapper().push({
        type: 'element', //wrap in additional element to preserve correct layout (inline flow for <Text>)
        name: config.textWrapperTag, //also pass the default-default from WordPressContext.Provider
        attribs: parentAttribs,
        children: chunkRoot,
      });
    } else if (token.type === HtmlTokenType.TAG_OPEN) {
      const newNode: ASTNode = {
        type: 'element',
        name: token.name,
        attribs: token.attribs,
        children: [],
      };
      //push to root / active tag if there is any
      getCurrentWrapper().push(newNode);
      //push this tag to the stack
      stack.push({ node: newNode });
    } else if (token.type === HtmlTokenType.TAG_CLOSE) {
      if (stack.length > 0) {
        stack.pop();
      }
    } else if (token.type === HtmlTokenType.BLOCK_ELEMENT) {
      let blockNode: ASTNode = {
        type: 'element',
        name: token.name,
        attribs: token.attribs,
        children: [],
      };

      // add anchor context wrapper if necessary
      if (token.parentInlineStack && token.parentInlineStack.length > 0) {
        const anchorContext = token.parentInlineStack.find(
          (x) => x.name === 'a'
        );
        if (anchorContext) {
          blockNode = {
            type: 'element',
            name: 'internal_anchorContext',
            attribs: anchorContext.attribs,
            children: [blockNode],
          };
        }
      }

      getCurrentWrapper().push(blockNode);
    } else if (token.type === HtmlTokenType.LEAF_ELEMENT) {
      getCurrentWrapper().push({
        type: 'element',
        name: token.name,
        attribs: token.attribs,
        children: [],
      });
    }
  }

  return root;
};
