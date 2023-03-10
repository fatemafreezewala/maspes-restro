import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TextComp from '../TextComp';
import colors from '../../utilities/colors';
import {SvgXml} from 'react-native-svg';
import margins from '../../utilities/margins';

const Card = ({item, onPress = () => {}}) => {
  const xml = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 17L15 12" stroke=${colors.primary} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 12L10 7" stroke=${colors.primary} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <SvgXml xml={item.image} />
        <TextComp
          style={{marginLeft: margins.m5}}
          text={item.name}
          type="medium"
          color={colors.black}
        />
      </View>
      <SvgXml xml={xml} />
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.menuColor,
    minHeight: 70,
    marginTop: margins.m5,
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
  },
});
