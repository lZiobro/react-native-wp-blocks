import { WpFigcaption } from '../WpFigcaption';
import {
  mockHtmlNodeElement,
  testBaseContract,
} from '../../../test-utils/WordPressComponentTests';

testBaseContract({
  Component: WpFigcaption,
  componentProps: { element: mockHtmlNodeElement('figcaption') },
  componentRootType: 'Text',
  styleKey: 'WpFigcaption',
  tests: {
    applyStyles: true,
    applyTextPrimitive: true,
    applyViewPrimitive: false,
    renderChildren: true,
  },
});
