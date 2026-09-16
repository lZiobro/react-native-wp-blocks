import { WpCenter } from '../WpCenter';
import {
  mockHtmlNodeElement,
  testBaseContract,
} from '../../../test-utils/WordPressComponentTests';

testBaseContract({
  Component: WpCenter,
  componentProps: { element: mockHtmlNodeElement('center') },
  componentRootType: 'View',
  styleKey: 'WpCenter',
  tests: {
    applyStyles: true,
    applyTextPrimitive: false,
    applyViewPrimitive: true,
    renderChildren: true,
  },
});
