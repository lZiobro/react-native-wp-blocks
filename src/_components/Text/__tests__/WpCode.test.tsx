import { WpCode } from '../WpCode';
import {
  mockHtmlNodeElement,
  testBaseContract,
} from '../../../test-utils/WordPressComponentTests';

testBaseContract({
  Component: WpCode,
  componentProps: { element: mockHtmlNodeElement('code') },
  componentRootType: 'Text',
  styleKey: 'WpCode',
  tests: {
    applyStyles: true,
    applyTextPrimitive: false,
    applyViewPrimitive: false,
    renderChildren: true,
  },
});
