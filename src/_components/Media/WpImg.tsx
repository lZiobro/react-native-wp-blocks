import { type WordPressComponentProps } from '../../types/htmlTypes';
import React, { useContext, useEffect, useState } from 'react';
import { Image, Linking, Pressable } from 'react-native';
import { useWordPressContext } from '../../context/WordPress/useWordPressContext';
import { AnchorContext } from '../../context/Anchor';

export const WpImg = ({ element }: WordPressComponentProps) => {
  const { primitives, styles, config } = useWordPressContext();
  const anchorContext = useContext(AnchorContext);

  const TextComponent = primitives.Text;
  const ViewComponent = primitives.View;
  const ImageComponent = primitives.Image;

  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [isDimError, setIsDimError] = useState<boolean>(false);

  const imageUri = element.attribs.src;

  useEffect(() => {
    if (imageUri) {
      Image.getSize(
        imageUri,
        (width, height) => {
          setAspectRatio(width / height);
        },
        () => {
          setIsDimError(true);
        }
      );
    }
  }, [imageUri]);

  if (isDimError) {
    return config.imgErrorMessage ? (
      <TextComponent style={styles.WpImgError}>
        {config.imgErrorMessage}
      </TextComponent>
    ) : (
      <React.Fragment />
    );
  }

  const imageComponent = (
    <ViewComponent style={styles.WpImgWrapper}>
      <ImageComponent
        source={{ uri: element.attribs.src }}
        style={[{ aspectRatio: aspectRatio }, styles.WpImg]}
      />
    </ViewComponent>
  );

  return anchorContext ? (
    <Pressable
      onPress={async () => {
        if (await Linking.canOpenURL(anchorContext.href))
          Linking.openURL(anchorContext.href);
      }}
    >
      {imageComponent}
    </Pressable>
  ) : (
    imageComponent
  );
};
