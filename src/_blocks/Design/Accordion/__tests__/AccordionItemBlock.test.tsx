import { describe, expect, it } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { AccordionItemBlock } from '../AccordionItemBlock';
import { Pressable, Text } from 'react-native';
import { WordPressProvider } from '../../../../WordPressProvider';
import { useAccordionContext } from '../../../../context/Accordion/useAccordionContext';

const TestAccordionHeader = () => {
  const { isExpanded, setIsExpanded } = useAccordionContext();

  return (
    <Pressable
      testID="accordion-header"
      onPress={() => setIsExpanded(!isExpanded)}
    >
      <Text>{isExpanded ? 'Collapse' : 'Expand'}</Text>
    </Pressable>
  );
};

describe('AccordionItemBlock', () => {
  it('should render title and hide content when not expanded', async () => {
    const wpBlock = {
      attrs: {},
      blockName: 'core/accordion-item',
      innerBlocks: [],
      innerContent: [],
      innerHTML: '',
    };

    const { queryByText } = await render(
      <WordPressProvider>
        <AccordionItemBlock wpBlock={wpBlock}>
          <TestAccordionHeader />
          <Text>Accordion Content 1</Text>
          <Text>Accordion Content 2</Text>
        </AccordionItemBlock>
      </WordPressProvider>
    );

    expect(screen.getByText('Expand')).toBeTruthy();
    expect(queryByText('Accordion Content 1')).toBeNull();
    expect(queryByText('Accordion Content 2')).toBeNull();
  });

  it('should render title and content after isExpanded changes to true', async () => {
    const wpBlock = {
      attrs: {},
      blockName: 'core/accordion-item',
      innerBlocks: [],
      innerContent: [],
      innerHTML: '',
    };

    await render(
      <WordPressProvider>
        <AccordionItemBlock wpBlock={wpBlock}>
          <TestAccordionHeader />
          <Text>Accordion Content 1</Text>
          <Text>Accordion Content 2</Text>
        </AccordionItemBlock>
      </WordPressProvider>
    );

    await fireEvent.press(screen.getByTestId('accordion-header'));

    expect(screen.getByText('Collapse')).toBeTruthy();
    expect(screen.getByText('Accordion Content 1')).toBeTruthy();
    expect(screen.getByText('Accordion Content 2')).toBeTruthy();
  });
});
