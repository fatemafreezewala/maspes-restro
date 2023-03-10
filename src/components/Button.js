import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import TextComp from './TextComp';
import colors from '../utilities/colors';
import AnimatedLottieView from 'lottie-react-native';

const Button = ({
  loading = false,
  text = 'SAVE',
  width = '100%',
  height = 50,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        alignItems: 'center',
        width: width,
        height: height,
        backgroundColor: loading ? colors.grey : colors.primary,
        borderRadius: 10,
        justifyContent: 'center',
      }}
      disabled={loading}>
      {loading ? (
        <AnimatedLottieView
          style={{width: 50, height: 40}}
          source={require('../utilities/lottie/loader.json')}
          autoPlay
          loop
        />
      ) : (
        <TextComp type="medium" color={colors.white} text={text}></TextComp>
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({});
