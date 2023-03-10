import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import fontFamily from '../utilities/fontFamily';

const TextComp = ({text, type="normal", fontSize, style, color}) => {
  {
    if (type == 'normal') {
      return (
        <Text
          style={[
            style,
            {fontSize: fontSize, color: color, fontFamily: fontFamily.regular},
          ]}>
          {text}
        </Text>
      );
    } else if (type == 'medium') {
      return (
        <Text
          style={[
            style,
            {fontSize: fontSize, color: color, fontFamily: fontFamily.medium},
          ]}>
          {text}
        </Text>
      );
    }else if (type == 'semibold') {
        return (
          <Text
            style={[
              style,
              {fontSize: fontSize, color: color, fontFamily: fontFamily.semibold},
            ]}>
            {text}
          </Text>
        );
      }
      else if (type == 'bold') {
        return (
          <Text
            style={[
              style,
              {fontSize: fontSize, color: color, fontFamily: fontFamily.bold},
            ]}>
            {text}
          </Text>
        );
      }
  }
};

export default TextComp;

const styles = StyleSheet.create({});
