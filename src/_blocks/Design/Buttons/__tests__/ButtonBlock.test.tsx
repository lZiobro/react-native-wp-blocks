import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { ButtonBlock } from '../ButtonBlock';
import { Text } from 'react-native';
import { WordPressProvider } from '../../../../WordPressProvider';

describe('ButtonBlock', () => {
  it('should render innerHTML parsed elements', async () => {
    const wpBlock = {
      attrs: {},
      blockName: 'core/button',
      innerBlocks: [],
      innerContent: [],
      innerHTML: '<button>Click Me</button>',
    };

    await render(
      <WordPressProvider>
        <ButtonBlock wpBlock={wpBlock}>
          <Text>Children</Text>
        </ButtonBlock>
      </WordPressProvider>
    );

    expect(screen.getByText('Click Me')).toBeTruthy();
  });
});
