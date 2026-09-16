import { WpBr } from '../WpBr';
import {
  mockHtmlNodeElement,
  testBaseContract,
} from '../../../test-utils/WordPressComponentTests';

testBaseContract({
  Component: WpBr,
  componentProps: { element: mockHtmlNodeElement('br') },
  componentRootType: 'Text',
  styleKey: 'WpBr',
  tests: {
    applyStyles: true,
    applyTextPrimitive: true,
    applyViewPrimitive: false,
    renderChildren: false,
  },
});
