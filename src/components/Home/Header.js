import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TextComp from '../TextComp';
import globalStyle from '../../styles/globalStyle';
import margins from '../../utilities/margins';
import colors from '../../utilities/colors';

const Header = ({title,onPress}) => {
  return (
    <View
      style={[
        globalStyle.row,
        {justifyContent: 'space-between', marginTop: margins.m3},
      ]}>
      <TextComp color={colors.black} text={title}></TextComp>
      <TouchableOpacity onPress={onPress}>
        <TextComp
          type="medium"
          color={colors.primary}
          text="View All"></TextComp>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
