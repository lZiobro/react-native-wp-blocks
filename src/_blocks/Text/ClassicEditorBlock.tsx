import { useMemo, type ReactNode } from 'react';
import { type BlockComponentProps } from '../../types/blockTypes';
import { useWordPressContext } from '../../context/WordPress/useWordPressContext';
import { WordPressHtmlSelector } from '../../_components/WordPressHtmlSelector';
import { stripNewLines } from '../../utils';

//TODO: missing support or incorrect display of several tags - don't really know if we should bother fixing it but:
//
//List of broken blocks
//Details - doesn't show "expand" and just slaps inner content below
//caused by summary and details not being handled properly in _htmlRenderers. ref: summary for examply being treated as WpText (paragraph)
//
//overall spacing is hella lot off
//text attribs isnt parsed properly (this was before AST)
const htmlCommentRegexGlobal = /<!--(.*?)-->/g;
export const ClassicEditorBlock = ({
  wpBlock,
}: BlockComponentProps): ReactNode => {
  const { primitives, styles } = useWordPressContext();

  const ViewComponent = primitives.View;

  const html = useMemo(
    () =>
      stripNewLines(wpBlock.innerHTML.replaceAll(htmlCommentRegexGlobal, '')),
    [wpBlock.innerHTML]
  );
  return (
    <ViewComponent style={styles.ClassicEditorBlock}>
      <WordPressHtmlSelector html={html} />
    </ViewComponent>
  );
};
