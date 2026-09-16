import {
  mockHtmlNodeElement,
  testBaseContract,
} from '../../../test-utils/WordPressComponentTests';
import { WpPre } from '../WpPre';

testBaseContract({
  Component: WpPre,
  componentProps: { element: mockHtmlNodeElement('pre') },
  componentRootType: 'Text',
  styleKey: 'WpPre',
  tests: {
    applyStyles: true,
    applyTextPrimitive: true,
    applyViewPrimitive: false,
    renderChildren: true,
  },
});
