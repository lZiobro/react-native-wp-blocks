import { describe, expect, it } from '@jest/globals';
import { mockHtmlNodeElement } from '../../test-utils/WordPressComponentTests';
import {
  findDOMParentRecursive,
  hasChildNodes,
  hasChildWithTag,
  isElement,
  isText,
  parseInlineStyle,
  removeAriaHiddenNodes,
} from '../htmlUtils';
import { type ChildNode, type Text } from 'domhandler';

describe('htmlUtils', () => {
  it('removeAriaHiddenNodes -> should remove nodes with aria-hidden=true', async () => {
    const regularNode = mockHtmlNodeElement('a');
    const ariaNode = mockHtmlNodeElement('a');
    ariaNode.attribs = { ['aria-hidden']: 'true' };
    const regularNode2 = mockHtmlNodeElement('em');

    const parentNode = mockHtmlNodeElement('p');

    parentNode.children.push(regularNode);
    parentNode.children.push(ariaNode);
    parentNode.children.push(regularNode2);

    const childrenNodes = removeAriaHiddenNodes(parentNode.children);

    expect(childrenNodes).not.toEqual(parentNode.children);
    expect(childrenNodes).toEqual([regularNode, regularNode2]);
  });

  it('isElement -> should properly identify node', async () => {
    const elementNode = mockHtmlNodeElement('p');
    const elementResult = isElement(elementNode);
    expect(elementResult).toBe(true);

    const textNode: Text = { type: 'text' } as Text;
    const textResult = isElement(textNode);
    expect(textResult).toBe(false);
  });

  it('isElement -> should not throw when passed undefined and just return false', async () => {
    const result = isElement(undefined as unknown as ChildNode);
    expect(result).toBe(false);
  });

  it('isText -> should properly identify node', async () => {
    const elementNode = mockHtmlNodeElement('p');
    const elementResult = isText(elementNode);
    expect(elementResult).toBe(false);

    const textNode: Text = { type: 'text' } as Text;
    const textResult = isText(textNode);
    expect(textResult).toBe(true);
  });

  it('isText -> should not throw when passed undefined and just return false', async () => {
    const result = isText(undefined as unknown as ChildNode);
    expect(result).toBe(false);
  });

  it('findDOMParentRecursive -> should find parent or return undefined if not found', async () => {
    const level3Child = mockHtmlNodeElement('img');
    const level3Child2 = mockHtmlNodeElement('li');
    const level2Child = mockHtmlNodeElement('a');
    const level2Child2 = mockHtmlNodeElement('p');
    const level2Child3 = mockHtmlNodeElement('ul');
    const level1Child = mockHtmlNodeElement('div');
    const level1Child2 = mockHtmlNodeElement('div');
    const rootElement = mockHtmlNodeElement('div');

    level3Child.parent = level2Child;
    level3Child2.parent = level2Child3;

    level2Child.parent = level1Child;
    level2Child2.parent = level1Child;
    level2Child3.parent = level1Child;

    level1Child.parent = rootElement;
    level1Child2.parent = rootElement;

    const findAnchorParent = findDOMParentRecursive(level3Child, 'a'); //direct parent
    expect(findAnchorParent).toBe(level2Child);

    const findDivParent = findDOMParentRecursive(level3Child, 'div'); //div -> a -> img
    expect(findDivParent).toBe(level1Child);

    const findRandomParent = findDOMParentRecursive(level3Child, 'random'); //not in the tree -> undefined
    expect(findRandomParent).toBe(undefined);

    const findParagraphParent = findDOMParentRecursive(level3Child, 'p'); //p is not a parent - its sibling node on the parent level, but should not be recognized
    expect(findParagraphParent).toBe(undefined);
  });

  it('parseInlineStyle -> should properly parse simple styles', async () => {
    const exampleStyle = 'color: red; font-size: 16px';
    const result = parseInlineStyle(exampleStyle);

    expect(result).toEqual({
      'color': 'red',
      'font-size': '16px',
    });
  });

  it('parseInlineStyle -> should handle malformed inputs', async () => {
    const exampleStyle = 'color;: red; background;font-weight: bold';
    const result = parseInlineStyle(exampleStyle);

    expect(result).toEqual({
      'font-weight': 'bold',
    });
  });

  it('parseInlineStyle -> should handle complex inputs with colons', async () => {
    const exampleStyle =
      'color: yellow; background: url(https://example.com/image.png); font-weight: bold';
    const result = parseInlineStyle(exampleStyle);

    expect(result).toEqual({
      'color': 'yellow',
      'background': 'url(https://example.com/image.png)',
      'font-weight': 'bold',
    });
  });

  it('parseInlineStyle -> should handle complex inputs with semicolons', async () => {
    const exampleStyle =
      'color: purple; font-family: "Courier; New", monospace; font-weight: light';
    const result = parseInlineStyle(exampleStyle);

    expect(result).toEqual({
      'color': 'purple',
      'font-family': '"Courier; New", monospace',
      'font-weight': 'light',
    });
  });

  it('hasChildNodes -> should detect children if present', async () => {
    const element = mockHtmlNodeElement('div');
    const childElement = mockHtmlNodeElement('p');

    element.children.push(childElement);

    const result = hasChildNodes(element);
    expect(result).toBe(true);
  });

  it('hasChildNodes -> should return false if element has no children', async () => {
    const element = mockHtmlNodeElement('div');

    const result = hasChildNodes(element);
    expect(result).toBe(false);
  });

  it('hasChildNodes -> should handle malformed inputs', async () => {
    const element = mockHtmlNodeElement('div');
    //@ts-ignore
    element.children = undefined;

    expect(hasChildNodes(element)).toBe(false);

    //@ts-ignore
    element.children = { foo: 'bar' };

    expect(hasChildNodes(element)).toBe(false);

    expect(hasChildNodes(undefined as unknown as Document)).toBe(false);
    expect(hasChildNodes({ zip: 'zap' } as unknown as Document)).toBe(false);
    expect(hasChildNodes(['abc'])).toBe(false);
  });

  it('hasChildWithTag -> should properly detect children with tag if present', async () => {
    const level3Child = mockHtmlNodeElement('img');
    const level3Child2 = mockHtmlNodeElement('li');
    const level2Child = mockHtmlNodeElement('a');
    const level2Child2 = mockHtmlNodeElement('p');
    const level2Child3 = mockHtmlNodeElement('ul');
    const level1Child = mockHtmlNodeElement('div');
    const level1Child2 = mockHtmlNodeElement('div');
    const rootElement = mockHtmlNodeElement('div');

    level2Child.children.push(level3Child);
    level2Child3.children.push(level3Child2);

    level1Child.children.push(level2Child);
    level1Child.children.push(level2Child2);
    level1Child2.children.push(level2Child3);

    rootElement.children.push(level1Child);
    rootElement.children.push(level1Child2);

    const hasImgChild = hasChildWithTag(level2Child, 'img'); // direct child a -> img
    expect(hasImgChild).toBe(true);

    const hasImgNestedChild = hasChildWithTag(level1Child2, 'li'); // nested child div -> ul -> li
    expect(hasImgNestedChild).toBe(true);

    const hasImgDeepNestedChild = hasChildWithTag(rootElement, 'img'); // deeply nested child div -> div -> a -> img
    expect(hasImgDeepNestedChild).toBe(true);

    const noChildFound = hasChildWithTag(level1Child2, 'img'); // wrong branch of html tree - return false
    expect(noChildFound).toBe(false);

    const noTagInTree = hasChildWithTag(level1Child2, 'foobar'); // tag doesnt exist in tree whatsoever - same as above
    expect(noTagInTree).toBe(false);
  });
});
