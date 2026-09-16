import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { ButtonsBlock } from '../ButtonsBlock';
import { Text, StyleSheet } from 'react-native';
import { WordPressProvider } from '../../../../WordPressProvider';

describe('ButtonsBlock', () => {
  it('should render children and apply justifyContent layout alignment', async () => {
    const wpBlock = {
      attrs: {
        layout: {
          justifyContent: 'right',
        },
      },
      blockName: 'core/buttons',
      innerBlocks: [],
      innerContent: [],
      innerHTML: '',
    };

    const { toJSON } = await render(
      <WordPressProvider>
        <ButtonsBlock wpBlock={wpBlock}>
          <Text>Button 1</Text>
        </ButtonsBlock>
      </WordPressProvider>
    );

    expect(screen.getByText('Button 1')).toBeTruthy();

    const json = toJSON();
    const flatStyles = StyleSheet.flatten(json?.props.style);
    expect(flatStyles).toMatchObject({
      alignItems: 'flex-end',
    });
  });

  it('should render standard left layout alignment by default', async () => {
    const wpBlock = {
      attrs: {},
      blockName: 'core/buttons',
      innerBlocks: [],
      innerContent: [],
      innerHTML: '',
    };

    const { toJSON } = await render(
      <WordPressProvider>
        <ButtonsBlock wpBlock={wpBlock}>
          <Text>Button A</Text>
        </ButtonsBlock>
      </WordPressProvider>
    );

    const json = toJSON();
    const flatStyles = StyleSheet.flatten(json?.props.style);
    expect(flatStyles).toMatchObject({
      alignItems: 'flex-start',
    });
  });
});
