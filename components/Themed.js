import * as React from 'react';
import { Text as DefaultText, View as DefaultView } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

const useThemeColor = (
  props,
  colorName
) => {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

const Text = (props) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

const View = (props) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({light: lightColor, dark: darkColor}, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export { useThemeColor, Text, View }