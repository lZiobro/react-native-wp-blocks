import { WpTd } from '../WpTd';
import {
  mockHtmlNodeElement,
  testBaseContract,
} from '../../../../test-utils/WordPressComponentTests';

testBaseContract({
  Component: WpTd,
  componentProps: { element: mockHtmlNodeElement('td') },
  componentRootType: 'View',
  styleKey: 'WpTd',
  tests: {
    applyStyles: true,
    applyTextPrimitive: false,
    applyViewPrimitive: true,
    renderChildren: true,
  },
});
