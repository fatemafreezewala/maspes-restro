import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../utilities/colors';
import {SvgXml} from 'react-native-svg';
import TextComp from '../TextComp';

const RatingPill = ({star,style}) => {
  const starxml = `
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 0L6.12257 3.45492H9.75528L6.81636 5.59017L7.93893 9.04508L5 6.90983L2.06107 9.04508L3.18364 5.59017L0.244718 3.45492H3.87743L5 0Z" fill="#FDD161"/>
    </svg>
    `;
  return (
    <View
      style={[{
        backgroundColor: colors.primary,
        
        paddingHorizontal: 10,
    
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50,
        marginLeft:'5%'
      },style]}>
      <TextComp style={{marginRight:2}} fontSize={13} type="medium" color={colors.white} text={star}></TextComp>
      <SvgXml width={15} height={15} xml={starxml}></SvgXml>
    </View>
  );
};

export default RatingPill;

const styles = StyleSheet.create({});
