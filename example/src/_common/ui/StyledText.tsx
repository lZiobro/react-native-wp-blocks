import { Text, type TextProps } from 'react-native';

export const StyledText = (props: TextProps) => {
  const color = 'white';

  return (
    <Text {...props} style={[{ color: color }, props.style]}>
      {props.children}
    </Text>
  );
};
