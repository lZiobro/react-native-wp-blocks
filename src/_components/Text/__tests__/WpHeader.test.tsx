import { WpHeader } from '../WpHeader';
import {
  mockHtmlNodeElement,
  testBaseContract,
} from '../../../test-utils/WordPressComponentTests';

// should it be like that?
for (let i = 1; i <= 6; i++) {
  testBaseContract({
    Component: WpHeader,
    componentProps: {
      element: mockHtmlNodeElement(`h${i}`),
      additionalProps: { headerVariant: `h${i}` },
    },
    componentRootType: 'Text',
    styleKey: `WpH${i}`,
    tests: {
      applyStyles: true,
      applyTextPrimitive: true,
      applyViewPrimitive: false,
      renderChildren: true,
    },
  });
}
