import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import globalStyle from '../styles/globalStyle';
import colors from '../utilities/colors';
import {SvgXml} from 'react-native-svg';
import fontFamily from '../utilities/fontFamily';

const SearchBar = ({placeholder, onChangeText}) => {
  const xml = `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 8H13" stroke=${colors.primary} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M17 8L20 8" stroke=${colors.primary} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11 16L20 16" stroke=${colors.primary} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M4 16H7" stroke=${colors.primary} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="9" cy="16" r="2" stroke=${colors.primary} stroke-width="2"/>
    <circle cx="15" cy="8" r="2" stroke=${colors.primary} stroke-width="2"/>
    </svg>
    `;
  const search = `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_357_3463)">
    <path d="M21 21L16.6569 16.6569M16.6569 16.6569C18.1046 15.2091 19 13.2091 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C13.2091 19 15.2091 18.1046 16.6569 16.6569Z" stroke=${colors.primary} stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <defs>
    <clipPath id="clip0_357_3463">
    <rect width="24" height="24" fill="white"/>
    </clipPath>
    </defs>
    </svg>
    `;
  return (
    <View
      style={[
        {
          borderWidth: 1,
          borderColor: colors.borderColor,
          width: '100%',
          height: 50,
          borderRadius: 10,
          marginVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
        },
      ]}>
      <SvgXml xml={search} />
      <TextInput
        style={{
          fontFamily: fontFamily.regular,
          height: 50,
          width: '80%',
          fontSize: 13,
          color: colors.primary,
        }}
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
      <SvgXml xml={xml} />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
