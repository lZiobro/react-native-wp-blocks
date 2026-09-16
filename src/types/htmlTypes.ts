import type { Element } from 'domhandler';
import type { ReactNode } from 'react';

export interface WordPressComponentProps {
  children?: ReactNode;
  element: Element;
  /** should be used with caution - most likely a subject to deprecate and be replaced with index */
  additionalProps?: Record<string, any>;
}
