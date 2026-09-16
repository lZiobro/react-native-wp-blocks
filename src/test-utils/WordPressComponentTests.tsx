import { describe, expect, it } from '@jest/globals';
import type {
  WordPressContextPrimitives,
  WordPressStyles,
  WordPressStylesKey,
} from '../context/WordPress/WordPressContext';
import {
  Image,
  StyleSheet,
  Text,
  View,
  type TextProps,
  type ViewProps,
} from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { WordPressProvider } from '../WordPressProvider';
import type { WordPressComponentProps } from '../types/htmlTypes';
import type { Element } from 'domhandler';
import { getRandomColorHex, getRandomString } from './testUtils';

export const mockHtmlNodeElement = (name: string): Element =>
  ({
    type: 'tag',
    name: name,
    attribs: {},
    children: [],
  }) as unknown as Element;

export type BaseContractConfig = {
  Component: React.ComponentType<any>;
  componentProps: WordPressComponentProps;
  componentRootType: 'Text' | 'View';
  styleKey: WordPressStylesKey | string;
  tests: {
    applyTextPrimitive: boolean;
    applyViewPrimitive: boolean;
    applyStyles: boolean;
    renderChildren: boolean;
  };
};

export const testBaseContract = ({
  Component,
  componentProps,
  componentRootType,
  styleKey,
  tests,
}: BaseContractConfig) => {
  describe(`WPComponent Contract: ${styleKey}`, () => {
    const primitiveTextColor = getRandomColorHex();

    const primitiveViewBackgroundColor = getRandomColorHex();

    const CustomText = (props: TextProps) => (
      <Text
        {...props}
        style={[{ color: primitiveTextColor }, props.style ?? {}]}
      />
    );

    const CustomView = (props: ViewProps) => (
      <View
        {...props}
        style={[{ backgroundColor: primitiveViewBackgroundColor }, props.style]}
      />
    );

    const mockPrimitives: WordPressContextPrimitives = {
      Text: CustomText,
      View: CustomView,
      Image: Image,
    };

    const randomString = getRandomString();

    if (tests.renderChildren) {
      it('should render children', async () => {
        await render(
          <WordPressProvider primitives={mockPrimitives}>
            <Component {...componentProps}>
              <Text>{randomString}</Text>
            </Component>
          </WordPressProvider>
        );

        expect(screen.getByText(randomString)).toBeTruthy();
      });
    }

    if (tests.applyTextPrimitive) {
      it('should apply Text primitive', async () => {
        const { toJSON } = await render(
          <WordPressProvider primitives={mockPrimitives}>
            <Component {...componentProps}>
              <Text>Primitive Text</Text>
            </Component>
          </WordPressProvider>
        );

        const json = toJSON();
        const flatStyles = StyleSheet.flatten(json?.props.style);

        expect(flatStyles).toMatchObject({
          color: primitiveTextColor,
        });
      });
    }

    if (tests.applyViewPrimitive) {
      it('should apply View primitive', async () => {
        const { toJSON } = await render(
          <WordPressProvider primitives={mockPrimitives}>
            <Component {...componentProps}>
              <Text>Primitive View?</Text>
            </Component>
          </WordPressProvider>
        );

        const json = toJSON();
        const flatStyles = StyleSheet.flatten(json?.props.style);

        expect(flatStyles).toMatchObject({
          backgroundColor: primitiveViewBackgroundColor,
        });
      });
    }

    if (tests.applyStyles) {
      it('should apply context styles', async () => {
        const testFontSize = Math.floor((Math.random() + 1) * 50);
        const testTextColor = getRandomColorHex();

        const testBackgroundColor = getRandomColorHex();

        let mockStyles: Partial<WordPressStyles> = {};

        if (componentRootType === 'Text') {
          mockStyles = {
            [styleKey]: { fontSize: testFontSize, color: testTextColor },
          };
        } else if (componentRootType === 'View') {
          mockStyles = {
            [styleKey]: {
              backgroundColor: testBackgroundColor,
            },
          };
        }

        const { toJSON } = await render(
          <WordPressProvider primitives={mockPrimitives} styles={mockStyles}>
            <Component {...componentProps}>
              <Text>Styles Text</Text>
            </Component>
          </WordPressProvider>
        );

        const json = toJSON();
        const flatStyles = StyleSheet.flatten(json?.props.style);
        if (componentRootType === 'Text') {
          expect(flatStyles).toMatchObject({
            fontSize: testFontSize, //apply from context styles
            color: testTextColor, //overwrite primitive text color
          });
        } else if (componentRootType === 'View') {
          expect(flatStyles).toMatchObject({
            backgroundColor: testBackgroundColor, //apply from context styles
          });
        }
      });
    }
  });
};
