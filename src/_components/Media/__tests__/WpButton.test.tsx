import { WpButton } from '../WpButton';
import {
  mockHtmlNodeElement,
  testBaseContract,
} from '../../../test-utils/WordPressComponentTests';

testBaseContract({
  Component: WpButton,
  componentProps: { element: mockHtmlNodeElement('button') },
  componentRootType: 'Text',
  styleKey: 'WpButton',
  tests: {
    applyStyles: true,
    applyTextPrimitive: false,
    applyViewPrimitive: false,
    renderChildren: true,
  },
});
