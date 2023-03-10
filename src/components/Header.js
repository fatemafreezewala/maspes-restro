import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '../utilities/colors';
import TextComp from './TextComp';
import fontSize from '../utilities/fontSize';
import globalStyle from '../styles/globalStyle';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const Header = ({color, text, showBack = false}) => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        {height: 70, backgroundColor: colors.primary, width: '100%'},
        globalStyle.rowCenter,
      ]}>
      {showBack && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.edge}>
          <AntIcon name="arrowleft" size={25} color="#fff" />
        </TouchableOpacity>
      )}
      <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
        <TextComp
          color={color}
          fontSize={fontSize.fs16}
          text={text}
          style={{textTransform: 'uppercase', textAlign: 'center'}}
          type={'medium'}
        />
      </View>
      {showBack && <View style={styles.edge} />}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  edge: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
});
