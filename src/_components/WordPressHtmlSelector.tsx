import { StyleSheet, Text } from 'react-native';
import React, { type ReactNode } from 'react';
import { Element } from 'domhandler';
import { useWordPressContext } from '../context/WordPress/useWordPressContext';
import { parseHtml } from '../utils/parseHtml';
import { tokensToAst, type ASTNode } from '../utils/tokensToAst';

export type WordPressHtmlSelectorProps = {
  html: string | ASTNode;
  baseIdKey?: string;
  additionalProps?: Record<string, any>;
};

/**
 * Recursively traverses html tree to build react-native counterpart.
 * Uses WordPressContext htmlRenderers to dynamically pick appropiate components to render.
 * Can be configured via WordPressContext to disable errors or adjust skipping unnecessary new lines.
 *
 * @param html - raw html string or {@link ChildNode}
 * @param baseIdKey - base key for building stable tree
 * @param additionalProps - used to pass specific props to htmlRenderer
 *
 * @returns result {@link ReactNode}
 */
export const WordPressHtmlSelector = ({
  html,
  baseIdKey = 'html.0',
  additionalProps = {},
}: WordPressHtmlSelectorProps): ReactNode => {
  const { config, htmlRenderers } = useWordPressContext();
  const root = typeof html === 'string' ? tokensToAst(parseHtml(html)) : html;

  //sanity check
  if (!root) {
    return <React.Fragment key={baseIdKey} />;
  }

  let children: ReactNode[] = [];
  if (root.type === 'element' && root.children.length > 0) {
    for (let i = 0; i < root.children.length; i++) {
      const child = root.children[i]!;
      children.push(
        <WordPressHtmlSelector
          html={child}
          baseIdKey={`${baseIdKey}.${i.toString()}`}
          additionalProps={additionalProps}
          key={`${baseIdKey}_${i}`}
        />
      );
    }
  }

  if (root.type === 'element') {
    const WPComponent = htmlRenderers[root.name];

    if (WPComponent) {
      return (
        <WPComponent
          key={baseIdKey}
          element={root as unknown as Element}
          additionalProps={additionalProps}
        >
          {children}
        </WPComponent>
      );
    } else {
      return config.showMissingHtmlRendererErrors ? (
        <Text key={baseIdKey} style={styles.errorText}>
          NO HTML_RENDERER FOUND FOR TAG: {root.name}
        </Text>
      ) : (
        <React.Fragment key={baseIdKey} />
      );
    }
  }

  if (root.type === 'text') {
    if (config.skipSingularNewLines && root.value === '\n') {
      return <React.Fragment key={baseIdKey} />;
    }

    //wrap in a simple Text - it should get styles from wrapper above like <p> or <a> and should not overwrite any props
    return <Text key={baseIdKey}>{root.value}</Text>;
  }
  //if nothing above works
  return (
    children ??
    (config.htmlFallbackErrorMessage ? (
      <Text key={baseIdKey} style={styles.errorText}>
        {config.htmlFallbackErrorMessage}
      </Text>
    ) : (
      <React.Fragment key={baseIdKey} />
    ))
  );
};

const styles = StyleSheet.create({ errorText: { color: 'red' } });
