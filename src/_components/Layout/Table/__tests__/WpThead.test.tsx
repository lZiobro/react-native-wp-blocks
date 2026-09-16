import { WpThead } from '../WpThead';
import {
  mockHtmlNodeElement,
  testBaseContract,
} from '../../../../test-utils/WordPressComponentTests';

testBaseContract({
  Component: WpThead,
  componentProps: { element: mockHtmlNodeElement('thead') },
  componentRootType: 'View',
  styleKey: 'WpThead',
  tests: {
    applyStyles: true,
    applyTextPrimitive: false,
    applyViewPrimitive: true,
    renderChildren: true,
  },
});
