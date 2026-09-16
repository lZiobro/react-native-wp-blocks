import { WpTr } from '../WpTr';
import {
  mockHtmlNodeElement,
  testBaseContract,
} from '../../../../test-utils/WordPressComponentTests';

testBaseContract({
  Component: WpTr,
  componentProps: { element: mockHtmlNodeElement('tr') },
  componentRootType: 'View',
  styleKey: 'WpTr',
  tests: {
    applyStyles: true,
    applyTextPrimitive: false,
    applyViewPrimitive: true,
    renderChildren: true,
  },
});
