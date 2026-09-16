import { describe, expect, it } from '@jest/globals';
import { WpEm } from '../WpEm';
import { WpMark } from '../WpMark';
import { WpStrike } from '../WpStrike';
import { WpStrong } from '../WpStrong';
import {
  mockHtmlNodeElement,
  testBaseContract,
} from '../../../../test-utils/WordPressComponentTests';
import { render, screen } from '@testing-library/react-native';
import { WordPressProvider } from '../../../../WordPressProvider';
import { StyleSheet } from 'react-native';
import { WpSub } from '../WpSub';
import { WpSup } from '../WpSup';

testBaseContract({
  Component: WpEm,
  componentProps: { element: mockHtmlNodeElement('em') },
  componentRootType: 'Text',
  styleKey: 'WpEm',
  tests: {
    applyStyles: true,
    applyTextPrimitive: false, //dont use Text primitive to not overwrite any styles from parent - e.g. anchor textColor
    applyViewPrimitive: false,
    renderChildren: true,
  },
});

testBaseContract({
  Component: WpMark,
  componentProps: { element: mockHtmlNodeElement('mark') },
  componentRootType: 'Text',
  styleKey: 'WpMark',
  tests: {
    applyStyles: true,
    applyTextPrimitive: false, //dont use Text primitive to not overwrite any styles from parent - e.g. anchor textColor
    applyViewPrimitive: false,
    renderChildren: true,
  },
});

describe('WpMark', () => {
  it('should take color from style if present', async () => {
    const mockElement = mockHtmlNodeElement('mark');
    mockElement.attribs.style = 'fontSize: 20; color: #221133;';

    const { toJSON } = await render(
      <WordPressProvider>
        <WpMark element={mockElement}>Mark Text</WpMark>
      </WordPressProvider>
    );

    expect(screen.getByText('Mark Text')).toBeTruthy();

    const json = toJSON();
    const flatStyles = StyleSheet.flatten(json?.props.style);

    expect(flatStyles).toMatchObject({
      color: '#221133',
    });
  });
});

testBaseContract({
  Component: WpStrike,
  componentProps: { element: mockHtmlNodeElement('strike') },
  componentRootType: 'Text',
  styleKey: 'WpStrike',
  tests: {
    applyStyles: true,
    applyTextPrimitive: false, //dont use Text primitive to not overwrite any styles from parent - e.g. anchor textColor
    applyViewPrimitive: false,
    renderChildren: true,
  },
});

testBaseContract({
  Component: WpStrong,
  componentProps: { element: mockHtmlNodeElement('strong') },
  componentRootType: 'Text',
  styleKey: 'WpStrong',
  tests: {
    applyStyles: true,
    applyTextPrimitive: false, //dont use Text primitive to not overwrite any styles from parent - e.g. anchor textColor
    applyViewPrimitive: false,
    renderChildren: true,
  },
});

testBaseContract({
  Component: WpSub,
  componentProps: { element: mockHtmlNodeElement('sub') },
  componentRootType: 'Text',
  styleKey: 'WpSub',
  tests: {
    applyStyles: true,
    applyTextPrimitive: false, //dont use Text primitive to not overwrite any styles from parent - e.g. anchor textColor
    applyViewPrimitive: false,
    renderChildren: true,
  },
});

testBaseContract({
  Component: WpSup,
  componentProps: { element: mockHtmlNodeElement('sup') },
  componentRootType: 'Text',
  styleKey: 'WpSup',
  tests: {
    applyStyles: true,
    applyTextPrimitive: false, //dont use Text primitive to not overwrite any styles from parent - e.g. anchor textColor
    applyViewPrimitive: false,
    renderChildren: true,
  },
});
