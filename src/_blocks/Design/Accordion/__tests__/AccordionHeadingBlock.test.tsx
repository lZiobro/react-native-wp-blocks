import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';
import { AccordionHeadingBlock } from '../AccordionHeadingBlock';
import { Text } from 'react-native';
import { WordPressProvider } from '../../../../WordPressProvider';
import { AccordionContext } from '../../../../context/Accordion/AccordionContext';

describe('AccordionHeadingBlock', () => {
  it('should render parsed innerHTML and filter out aria-hidden nodes', async () => {
    const wpBlock = {
      attrs: {},
      blockName: 'core/accordion-heading',
      innerBlocks: [],
      innerContent: [],
      innerHTML:
        '<h3><span>Visible Text</span><span aria-hidden="true">Hidden Text</span></h3>',
    };

    const { queryByText } = await render(
      <WordPressProvider>
        <AccordionContext.Provider
          value={{ isExpanded: false, setIsExpanded: () => {} }}
        >
          <AccordionHeadingBlock wpBlock={wpBlock}>
            <Text>Children</Text>
          </AccordionHeadingBlock>
        </AccordionContext.Provider>
      </WordPressProvider>
    );

    expect(screen.getByText('Visible Text')).toBeTruthy();
    expect(queryByText('Hidden Text')).toBeNull();
    expect(queryByText('Children')).toBeNull();
  });
});
