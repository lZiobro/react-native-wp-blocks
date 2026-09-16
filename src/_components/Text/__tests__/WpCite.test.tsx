import { WpCite } from '../WpCite';
import {
  mockHtmlNodeElement,
  testBaseContract,
} from '../../../test-utils/WordPressComponentTests';

testBaseContract({
  Component: WpCite,
  componentProps: { element: mockHtmlNodeElement('cite') },
  componentRootType: 'Text',
  styleKey: 'WpCite',
  tests: {
    applyStyles: true,
    applyTextPrimitive: false,
    applyViewPrimitive: false,
    renderChildren: true,
  },
});
