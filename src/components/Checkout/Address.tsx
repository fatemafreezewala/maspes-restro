import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import globalStyle from '../../styles/globalStyle';
import {SvgXml} from 'react-native-svg';
import TextComp from '../TextComp';
import colors from '../../utilities/colors';
import margins from '../../utilities/margins';

const Address = ({navigation}: any) => {
  const location = `
    <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="19.5" cy="19.5" r="19.5" fill="#FDD161"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4778 20.1808L17.0664 26.3965C18.148 28.2699 20.8521 28.2699 21.9337 26.3965L25.5223 20.1808C28.1989 15.5449 24.8532 9.74997 19.5001 9.74997C14.1469 9.74997 10.8012 15.5449 13.4778 20.1808ZM19.5933 18.8533C20.8502 18.8533 21.8691 17.8344 21.8691 16.5775C21.8691 15.3206 20.8502 14.3016 19.5933 14.3016C18.3364 14.3016 17.3174 15.3206 17.3174 16.5775C17.3174 17.8344 18.3364 18.8533 19.5933 18.8533Z" fill="white"/>
    </svg>
    `;
  return (
    <Pressable
      onPress={() => navigation.navigate('Address')}
      style={[
        globalStyle.boxborder,
        globalStyle.row,
        {padding: margins.m5, marginTop: margins.m5},
      ]}>
      <SvgXml xml={location}></SvgXml>
      <View style={{marginLeft: margins.m5}}>
        <TextComp type="medium" color={colors.black} text="Home"></TextComp>
        <TextComp
          type="normal"
          color={colors.black}
          text="102, NYC Building , new square...."></TextComp>
      </View>
    </Pressable>
  );
};

export default Address;

const styles = StyleSheet.create({});
