import { useWordPressContext } from '../../../context/WordPress/useWordPressContext';
import type { BlockComponentProps } from '../../../types/blockTypes';

export const ColumnBlock = ({ wpBlock, children }: BlockComponentProps) => {
  const { primitives, styles } = useWordPressContext();

  const ViewComponent = primitives.View;
  const widthAttr = wpBlock.attrs.width;

  return (
    <ViewComponent
      style={[widthAttr ? { flexBasis: widthAttr } : {}, styles.ColumnBlock]}
    >
      {children}
    </ViewComponent>
  );
};
