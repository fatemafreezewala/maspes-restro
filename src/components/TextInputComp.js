import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';
import margins from '../utilities/margins';
import colors from '../utilities/colors';
import fontFamily from '../utilities/fontFamily';
import {SvgXml} from 'react-native-svg';
const TextInputComp = props => {
  const {
    placeholder,
    type = 'normal',
    onChangeText,
    style,
    value = '',
    autoCapitalize,
    multiline = false,
    keyboardType = 'default',
    ...otherProps
  } = props;
  const [focus, setFocus] = React.useState(false);
  const [texttype, setTextType] = React.useState(false);
  return (
    <TextInput
      onChangeText={onChangeText}
      secureTextEntry={texttype}
      outlineStyle={{borderWidth: 1, borderColor: colors.primary}}
      keyboardType={keyboardType}
      textAlignVertical="top"
      multiline={multiline}
      autoCapitalize={autoCapitalize}
      value={value}
      style={[
        styles.input,
        {borderColor: focus ? colors.primary : colors.white},
        style,
      ]}
      onFocus={e => {
        setFocus(true);
      }}
      onBlur={e => {
        setFocus(false);
      }}
      // Type="flat"
      label={
        <Text
          style={{
            fontSize: focus ? 14 : 14,
            marginBottom: 10,
            fontFamily: focus ? fontFamily.medium : fontFamily.regular,
          }}>
          {placeholder}
        </Text>
      }
      underlineStyle={{display: 'none'}}
      right={
        type == 'password' && (
          <TextInput.Icon
            onPress={() => {
              setTextType(!texttype);
            }}
            icon={texttype ? 'eye' : 'eye-off'}
          />
        )
      }
    />
  );
};

export default TextInputComp;

const styles = StyleSheet.create({
  input: {
    height: 60,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    marginBottom: margins.m5,
    borderWidth: 1,
    fontFamily: fontFamily.regular,
  },
});
