import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import TextComp from './TextComp';
import colors from '../utilities/colors';

const OutlineButton = ({text, width, height}) => {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: colors.primary,
        width: width,
        height: height,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:5
      }}>
      <TextComp
        type="normal"
        fontSize={12}
        color={colors.primary}
        text={text}></TextComp>
    </TouchableOpacity>
  );
};

export default OutlineButton;

const styles = StyleSheet.create({});
