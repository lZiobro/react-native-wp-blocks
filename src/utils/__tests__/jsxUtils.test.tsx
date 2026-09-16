import { describe, expect, it } from '@jest/globals';
import { Text, View, type TextProps } from 'react-native';
import { replaceChildrenWithType } from '../jsxUtils';
import { render, screen } from '@testing-library/react-native';

const StyledText = (props: TextProps) => {
  return (
    <Text
      {...props}
      style={[
        { color: 'white', fontSize: 23, fontWeight: 'bold' },
        props.style,
      ]}
      testID="destComponent"
    />
  );
};

describe('jsxUtils', () => {
  const exampleTree = (
    <View>
      <Text testID="source1">
        Foo
        <Text testID="nestedSource1" style={{ textAlign: 'center' }}>
          Bar
        </Text>
      </Text>
      <View>
        <Text testID="nestedSource2">Lorem ipsum</Text>
      </View>
      <Text testID="source2">zip-zap</Text>
    </View>
  );

  it('replaceChildrenWithType -> should properly detect children and replace them only on the first level depth', async () => {
    const result = replaceChildrenWithType(
      exampleTree.props.children,
      Text,
      StyledText
    );

    await render(<View>{result}</View>);

    expect(screen.queryByTestId('source1')).toBeNull();
    expect(screen.queryByTestId('source2')).toBeNull();
    expect(screen.queryByTestId('nestedSource1')).not.toBeNull();
    expect(screen.queryByTestId('nestedSource2')).not.toBeNull();
    expect(screen.getAllByTestId('destComponent')).toHaveLength(2);
    expect(screen.getAllByTestId('destComponent')[0]).toHaveTextContent(
      'FooBar'
    );
    expect(screen.getAllByTestId('destComponent')[1]).toHaveTextContent(
      'zip-zap'
    );
  });

  it('replaceChildrenWithType -> should merge and override component with provided destProps', async () => {
    const result = replaceChildrenWithType(
      exampleTree.props.children,
      Text,
      StyledText,
      { numberOfLines: 7, disabled: false, style: { textAlign: 'right' } }
    );

    await render(<View>{result}</View>);

    const [destComponent, regularComponent] = [
      screen.getAllByTestId('destComponent')[0],
      screen.getByTestId('nestedSource2'),
    ];

    expect(destComponent).toHaveProp('numberOfLines', 7);
    expect(regularComponent).not.toHaveProp('numberOfLines', 7);
    expect(destComponent).toHaveProp('disabled', false);
    expect(regularComponent).not.toHaveProp('disabled', false);

    expect(destComponent).toHaveStyle({
      textAlign: 'right', //add destProps styles
      color: 'white', //keep StyledComponent styles
      fontSize: 23, //keep StyledComponent styles
      fontWeight: 'bold', //keep StyledComponent styles
    });
    expect(regularComponent).not.toHaveStyle({
      textAlign: 'right', //add destProps styles
      color: 'white', //keep StyledComponent styles
      fontSize: 23, //keep StyledComponent styles
      fontWeight: 'bold', //keep StyledComponent styles
    });
  });

  it('replaceChildrenWithType -> handles invalid Elements', async () => {
    const exampleWithInvalidElements = (
      <View>
        <Text testID="source1">
          {null}
          <Text testID="nestedSource1" style={{ textAlign: 'center' }}>
            Bar
          </Text>
        </Text>
        {false && <View />}
        {undefined}
        <View>
          <Text testID="nestedSource2">Lorem ipsum</Text>
        </View>
        <Text testID="source2">zip-zap</Text>
      </View>
    );

    const result = replaceChildrenWithType(
      exampleWithInvalidElements.props.children,
      Text,
      StyledText
    );

    await render(<>{result}</>);

    expect(screen.queryByTestId('source1')).toBeNull();
    expect(screen.queryByTestId('source2')).toBeNull();
    expect(screen.queryByTestId('nestedSource1')).not.toBeNull();
    expect(screen.queryByTestId('nestedSource2')).not.toBeNull();
    expect(screen.getAllByTestId('destComponent')).toHaveLength(2);
    expect(screen.getAllByTestId('destComponent')[0]).toHaveTextContent('Bar');
    expect(screen.getAllByTestId('destComponent')[1]).toHaveTextContent(
      'zip-zap'
    );
  });
});
