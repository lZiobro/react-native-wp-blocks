import React, {
  type ComponentType,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useContext,
} from 'react';
import { Text, type TextProps } from 'react-native';
import { NestedTextContext } from '../context/NestedText/NestedTextContext';

/**
 * Replaces SourceComponent with DestComponent in provided children. Does NOT check the tree recursively, so any replacements will only be made to passed children and not any nested children inside them.
 *
 * @param children
 * @param SourceComponent
 * @param DestComponent
 * @param destProps Optional props to pass to DestComponent
 * @returns {ReactNode}
 */
export const replaceChildrenWithType = <
  TSourceProps extends Record<string, any>,
  TDestProps extends TSourceProps,
>(
  children: ReactNode,
  SourceComponent: ComponentType<TSourceProps>,
  DestComponent: ComponentType<TDestProps>,
  destProps?: Partial<TDestProps>
): ReactNode => {
  return React.Children.map(children, (child) => {
    // Sanity check
    if (!isValidElement(child)) {
      return child;
    }

    if (child.type === SourceComponent) {
      const element = child as ReactElement<TSourceProps>;
      return React.createElement(DestComponent, {
        ...element.props,
        ...destProps,
      } as any);
    }

    return child;
  });
};

export const createParserText =
  (TextComponent: React.ComponentType<TextProps>) => (props: TextProps) => {
    const isNested = useContext<boolean>(NestedTextContext);

    if (isNested) {
      return <Text {...props} />;
    } else {
      return (
        <NestedTextContext.Provider value={true}>
          <TextComponent {...props} />
        </NestedTextContext.Provider>
      );
    }
  };
