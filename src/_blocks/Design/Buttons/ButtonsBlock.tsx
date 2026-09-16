import { type ReactNode } from 'react';
import { type BlockComponentProps } from '../../../types/blockTypes';
import { useWordPressContext } from '../../../context/WordPress/useWordPressContext';

export const ButtonsBlock = ({
  children,
  wpBlock,
}: BlockComponentProps): ReactNode => {
  const { primitives, styles } = useWordPressContext();

  const ViewComponent = primitives.View;

  const justifyContentAttr = wpBlock.attrs?.layout?.justifyContent;

  const justifyContentValue =
    justifyContentAttr === 'center'
      ? 'center'
      : justifyContentAttr === 'right'
        ? 'flex-end'
        : 'flex-start';

  return (
    <ViewComponent
      style={[
        {
          alignItems: justifyContentValue,
        },
        styles.ButtonsBlock,
      ]}
    >
      {children}
    </ViewComponent>
  );
};
