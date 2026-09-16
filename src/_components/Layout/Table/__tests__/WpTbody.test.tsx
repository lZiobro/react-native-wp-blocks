import { WpTbody } from '../WpTbody';
import {
  mockHtmlNodeElement,
  testBaseContract,
} from '../../../../test-utils/WordPressComponentTests';

testBaseContract({
  Component: WpTbody,
  componentProps: { element: mockHtmlNodeElement('tbody') },
  componentRootType: 'View',
  styleKey: 'WpTbody',
  tests: {
    applyStyles: true,
    applyTextPrimitive: false,
    applyViewPrimitive: true,
    renderChildren: true,
  },
});
