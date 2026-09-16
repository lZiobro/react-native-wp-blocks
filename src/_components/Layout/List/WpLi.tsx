import { type WordPressComponentProps } from '../../../types/htmlTypes';
import { View } from 'react-native';
import { getListSymbol } from '../../../utils/listUtils';
import { useWordPressContext } from '../../../context/WordPress/useWordPressContext';
import { isElement } from '../../../utils/htmlUtils';
import { useListContext } from '../../../context/List';

export const WpLi = ({
  children,
  element,
  additionalProps,
}: WordPressComponentProps) => {
  const { primitives, styles } = useWordPressContext();
  const { isOrdered, startNumber, total, isReversed, className, type } =
    useListContext();

  const TextComponent = primitives.Text;

  const itemIndex =
    additionalProps?.listIndex ??
    element.parent?.children
      .filter((x) => isElement(x) && x.name === 'li')
      .findIndex((x) => x === element) ??
    0;

  const listItemIndex = isReversed
    ? startNumber > 1
      ? startNumber - (itemIndex ?? 0)
      : total - (itemIndex ?? 0)
    : startNumber + (itemIndex ?? 0);

  const itemSymbol = getListSymbol(isOrdered, listItemIndex, className, type);

  return (
    <View style={styles.WpLi}>
      <TextComponent>{itemSymbol} </TextComponent>
      <View style={styles.WpLiInner}>{children}</View>
    </View>
  );
};
