import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TextComp from '../TextComp';
import globalStyle from '../../styles/globalStyle';
import margins from '../../utilities/margins';
import colors from '../../utilities/colors';

const Header = ({page, title,navigation}) => {
  return (
    <View
      style={[
        globalStyle.row,
        {justifyContent: 'space-between', marginBottom: margins.m5},
      ]}>
      <TextComp color={colors.black} text={title}></TextComp>
      <TouchableOpacity onPress={() => navigation.navigate(page)}>
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
