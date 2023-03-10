import {StyleSheet, Text, TextStyle, View} from 'react-native';
import React from 'react';
import fontFamily from '../utilities/fontFamily';

interface Props {
  text: string;
  type: string;
  fontSize?: number;
  style?: TextStyle;
  color?: string;
}

const TextComp = ({text, type = 'normal', fontSize, style, color}: Props) => {
  if (type === 'normal') {
    return (
      <Text
        style={[
          {fontSize: fontSize, color: color, fontFamily: fontFamily.regular},
          style,
        ]}>
        {text}
      </Text>
    );
  } else if (type === 'medium') {
    return (
      <Text
        style={[
          {fontSize: fontSize, color: color, fontFamily: fontFamily.medium},
          style,
        ]}>
        {text}
      </Text>
    );
  } else if (type === 'semibold') {
    return (
      <Text
        style={[
          {fontSize: fontSize, color: color, fontFamily: fontFamily.semibold},
          style,
        ]}>
        {text}
      </Text>
    );
  } else if (type === 'bold') {
    return (
      <Text
        style={[
          {fontSize: fontSize, color: color, fontFamily: fontFamily.bold},
          style,
        ]}>
        {text}
      </Text>
    );
  }
  return (
    <Text
      style={[
        {fontSize: fontSize, color: color, fontFamily: fontFamily.regular},
        style,
      ]}>
      {text}
    </Text>
  );
};

export default TextComp;

const styles = StyleSheet.create({});
