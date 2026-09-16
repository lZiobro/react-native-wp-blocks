import { WpHr } from '../WpHr';
import {
  mockHtmlNodeElement,
  testBaseContract,
} from '../../../test-utils/WordPressComponentTests';

testBaseContract({
  Component: WpHr,
  componentProps: { element: mockHtmlNodeElement('hr') },
  componentRootType: 'View',
  styleKey: 'WpHr',
  tests: {
    applyStyles: true,
    applyTextPrimitive: false,
    applyViewPrimitive: true,
    renderChildren: false,
  },
});
