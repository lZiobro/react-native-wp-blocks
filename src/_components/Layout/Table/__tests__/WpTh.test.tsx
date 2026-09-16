import { WpTh } from '../WpTh';
import {
  mockHtmlNodeElement,
  testBaseContract,
} from '../../../../test-utils/WordPressComponentTests';

testBaseContract({
  Component: WpTh,
  componentProps: { element: mockHtmlNodeElement('th') },
  componentRootType: 'View',
  styleKey: 'WpTh',
  tests: {
    applyStyles: true,
    applyTextPrimitive: false,
    applyViewPrimitive: true,
    renderChildren: true,
  },
});
