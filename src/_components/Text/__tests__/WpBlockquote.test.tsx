import { WpBlockquote } from '../WpBlockquote';
import {
  mockHtmlNodeElement,
  testBaseContract,
} from '../../../test-utils/WordPressComponentTests';

testBaseContract({
  Component: WpBlockquote,
  componentProps: { element: mockHtmlNodeElement('blockquote') },
  componentRootType: 'Text',
  styleKey: 'WpBlockquote',
  tests: {
    applyStyles: true,
    applyTextPrimitive: false,
    applyViewPrimitive: true,
    renderChildren: true,
  },
});
