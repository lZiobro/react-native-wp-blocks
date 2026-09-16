import {
  type ChildNode,
  Element,
  Text as DOMText,
  type ParentNode,
} from 'domhandler';

/**
 * Removes nodes with `aria-hidden="true"` from provided nodes and their childrens.
 * @param nodes
 * @returns
 */
export const removeAriaHiddenNodes = (nodes: ChildNode[]): ChildNode[] => {
  return nodes
    .filter((node) => {
      if (
        node.type === 'tag' ||
        node.type === 'script' ||
        node.type === 'style'
      ) {
        const element = node as Element;
        if (element.attribs?.['aria-hidden'] === 'true') {
          return false;
        }
      }
      return true;
    })
    .map((node) => {
      if ('children' in node && node.children) {
        node.children = removeAriaHiddenNodes(node.children);
      }
      return node;
    });
};

/**
 * Checks if node is {@link Element}.
 * @param node
 * @returns
 */
export const isElement = (node: ChildNode): node is Element => {
  return node?.type === 'tag';
};

/**
 * Checks if node is {@link DOMText}.
 * @param node
 * @returns
 */
export const isText = (node: ChildNode): node is DOMText => {
  return node?.type === 'text';
};

/**
 * Checks node parent to find tag.
 * @param element
 * @param tagName
 * @returns Element if found, undefined otherwise
 */
export const findDOMParentRecursive = (
  element: Element,
  tagName: string
): Element | undefined => {
  if (element.name === tagName) {
    return element;
  } else if (element.parent && isElement(element.parent)) {
    return findDOMParentRecursive(element.parent, tagName);
  }
  return undefined;
};

/**
 * Parse inline styles string to a `Record<string, string>`
 *
 * @remarks It will not translate names like font-size -> fontSize, and will not parse values like "16px" -> 16
 * @param styleString
 * @returns {Record<string,string>}
 */
export const parseInlineStyle = (
  styleString: string | undefined
): Record<string, string> => {
  if (!styleString?.trim()) return {};

  const styles: Record<string, string> = {};

  // split on semicolons, but ignore semicolons inside quotes
  const declarations = styleString.split(/;(?=(?:(?:[^"]*"){2})*[^"]*$)/);

  for (const decl of declarations) {
    const colonIdx = decl.indexOf(':');
    if (colonIdx === -1) continue; // skip malformed chunks without a colon

    const rawKey = decl.slice(0, colonIdx).trim().toLowerCase();
    const rawVal = decl.slice(colonIdx + 1).trim();

    // ensure both key and value exist before setting
    if (rawKey && rawVal) {
      styles[rawKey] = rawVal;
    }
  }

  return styles;
};

/**
 * Checks if provided object has children (is {@link ParentNode}).
 * @param htmlObject
 * @returns
 */
export const hasChildNodes = (
  htmlObject: ChildNode | Document | Element
): htmlObject is ParentNode => {
  return (
    typeof htmlObject === 'object' &&
    'children' in htmlObject &&
    Array.isArray(htmlObject.children) &&
    htmlObject.children.length > 0
  );
};

/**
 * Recursively checks if provided node or any of its children has child with tag.
 * @param htmlObject
 * @param targetTagName
 * @returns
 */
export const hasChildWithTag = (
  htmlObject: ChildNode | Element,
  targetTagName: string
) => {
  if (!hasChildNodes(htmlObject)) {
    return false;
  }

  const normalizedTarget = targetTagName.toLowerCase();

  for (let i = 0; i < htmlObject.children.length; i++) {
    const child = htmlObject.children[i]!;

    if (
      isElement(child) &&
      (child.name.toLowerCase() === normalizedTarget ||
        hasChildWithTag(child, targetTagName))
    ) {
      return true;
    }
  }

  return false;
};
