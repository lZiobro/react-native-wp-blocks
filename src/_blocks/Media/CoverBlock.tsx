import { type BlockComponentProps } from '../../types/blockTypes';
import { ImageBackground } from 'react-native';
import { useWordPressContext } from '../../context/WordPress/useWordPressContext';

export const CoverBlock = ({ children, wpBlock }: BlockComponentProps) => {
  const { primitives, styles } = useWordPressContext();

  const ViewComponent = primitives.View;

  const sourceUrl = wpBlock.attrs.url;

  return (
    <ViewComponent style={styles.CoverBlock}>
      <ImageBackground
        source={{ uri: sourceUrl }}
        style={styles.CoverBlockBackgroundImage}
        resizeMode="cover"
      >
        <ViewComponent style={styles.CoverBlockContentWrapper}>
          {children}
        </ViewComponent>
      </ImageBackground>
    </ViewComponent>
  );
};
