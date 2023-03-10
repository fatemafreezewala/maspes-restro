import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import globalStyle from '../styles/globalStyle'

const SubContainer = (props,{style}) => {
  return (
    <View style={[globalStyle.container,{padding:10},style]}>
     {props.children}
    </View>
  )
}

export default SubContainer

const styles = StyleSheet.create({})