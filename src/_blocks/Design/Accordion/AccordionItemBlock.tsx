import { type ReactNode, useMemo, useState } from 'react';
import { type BlockComponentProps } from '../../../types/blockTypes';
import { useWordPressContext } from '../../../context/WordPress/useWordPressContext';
import { AccordionContext } from '../../../context/Accordion/AccordionContext';

export const AccordionItemBlock = ({
  children,
}: BlockComponentProps): ReactNode => {
  const { primitives, styles } = useWordPressContext();

  const ViewComponent = primitives.View;

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const expandedContent = useMemo(() => {
    return (
      <ViewComponent style={styles.AccordionItemContent}>
        {Array.isArray(children) && children.length > 1 && children.slice(1)}
      </ViewComponent>
    );
  }, [children, ViewComponent, styles]);

  return (
    <AccordionContext.Provider
      value={{ isExpanded: isExpanded, setIsExpanded: setIsExpanded }}
    >
      <ViewComponent style={styles.AccordionItemBlock}>
        {Array.isArray(children) ? children[0] : children}
        {isExpanded && expandedContent}
      </ViewComponent>
    </AccordionContext.Provider>
  );
};
