import {
  mockHtmlNodeElement,
  testBaseContract,
} from '../../../test-utils/WordPressComponentTests';
import { WpSpan } from '../WpSpan';

testBaseContract({
  Component: WpSpan,
  componentProps: { element: mockHtmlNodeElement('span') },
  componentRootType: 'Text',
  styleKey: 'WpSpan',
  tests: {
    applyStyles: true,
    applyTextPrimitive: false,
    applyViewPrimitive: false,
    renderChildren: true,
  },
});
