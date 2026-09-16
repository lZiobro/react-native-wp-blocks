import {
  mockHtmlNodeElement,
  testBaseContract,
} from '../../../test-utils/WordPressComponentTests';
import { WpText } from '../WpText';

testBaseContract({
  Component: WpText,
  componentProps: { element: mockHtmlNodeElement('p') },
  componentRootType: 'Text',
  styleKey: 'WpText',
  tests: {
    applyStyles: true,
    applyTextPrimitive: true,
    applyViewPrimitive: false,
    renderChildren: true,
  },
});
