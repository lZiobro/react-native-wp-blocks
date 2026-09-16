import { WpTable } from '../WPTable';
import {
  mockHtmlNodeElement,
  testBaseContract,
} from '../../../../test-utils/WordPressComponentTests';

testBaseContract({
  Component: WpTable,
  componentProps: { element: mockHtmlNodeElement('table') },
  componentRootType: 'View',
  styleKey: 'WpTable',
  tests: {
    applyStyles: true,
    applyTextPrimitive: false,
    applyViewPrimitive: true,
    renderChildren: true,
  },
});
