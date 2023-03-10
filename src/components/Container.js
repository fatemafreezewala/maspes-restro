import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import globalStyle from '../styles/globalStyle'

const Container = (props) => {
  return (
    <SafeAreaView style={globalStyle.container}>
     {props.children}
    </SafeAreaView>
  )
}

export default Container

const styles = StyleSheet.create({})