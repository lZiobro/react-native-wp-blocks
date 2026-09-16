import { WpTfoot } from '../WpTfoot';
import {
  mockHtmlNodeElement,
  testBaseContract,
} from '../../../../test-utils/WordPressComponentTests';

testBaseContract({
  Component: WpTfoot,
  componentProps: { element: mockHtmlNodeElement('tfoot') },
  componentRootType: 'View',
  styleKey: 'WpTfoot',
  tests: {
    applyStyles: true,
    applyTextPrimitive: false,
    applyViewPrimitive: true,
    renderChildren: true,
  },
});
