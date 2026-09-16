import { type ReactNode } from 'react';
import { type BlockComponentProps } from '../../types/blockTypes';
import { WordPressHtmlSelector } from '../../_components/WordPressHtmlSelector';

export const NestedHtmlBlock = ({
  children,
  wpBlock,
}: BlockComponentProps): ReactNode => {
  if (children) {
    return children;
  } else {
    return <WordPressHtmlSelector html={wpBlock.innerHTML} />;
  }
};
