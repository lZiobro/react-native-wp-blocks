import { useMemo, type ReactNode } from 'react';
import { type BlockComponentProps } from '../../../types/blockTypes';
import { useAccordionContext } from '../../../context/Accordion/useAccordionContext';
import { Pressable } from 'react-native';
import { WordPressHtmlSelector } from '../../../_components/WordPressHtmlSelector';
import { useWordPressContext } from '../../../context/WordPress';
import { removeAriaHiddenNodes } from '../../../utils';
import { parseDocument } from 'htmlparser2';
import { tokensToAst } from '../../../utils/tokensToAst';
import { parseHtml } from '../../../utils/parseHtml';

export const AccordionHeadingBlock = ({
  wpBlock,
}: BlockComponentProps): ReactNode => {
  const { primitives, styles } = useWordPressContext();
  const { isExpanded, setIsExpanded } = useAccordionContext();

  const TextComponent = primitives.Text;

  const root = useMemo(() => {
    const document = parseDocument(wpBlock.innerHTML);

    document.children = removeAriaHiddenNodes(document.children);

    return tokensToAst(parseHtml(document));
    //TODO: do we want to override and normalize fontSize etc. (styling) here?
    // return tokensToAst(parseHtml(document), { textWrapperTag: 'h3' });
  }, [wpBlock]);

  const toggleDetails = () => {
    setIsExpanded((x) => !x);
  };

  return (
    <Pressable onPress={toggleDetails} style={styles.AccordionHeadingBlock}>
      <WordPressHtmlSelector html={root} />
      <TextComponent style={styles.AccordionHeadingIcon}>
        {isExpanded ? '-' : '+'}
      </TextComponent>
    </Pressable>
  );
};
