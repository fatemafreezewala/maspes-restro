import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextComp from '../TextComp'
import colors from '../../utilities/colors'
import globalStyle from '../../styles/globalStyle'
import margins from '../../utilities/margins'

const HomeHeader = () => {
  return (
    <View style={[globalStyle.row,{justifyContent:'space-between',marginVertical:margins.m5}]}>
     <View style={{justifyContent:'flex-start'}}>
          <TextComp
           
            fontSize={20}
            type="medium"
            color={colors.primary}
            text="Welcome Back"
          />
          <TextComp
           
            fontSize={12}
            color={colors.black}
            text="Sign in you account"
          />
        </View>
        <View>
            <View style={{width:50,height:50,borderRadius:50,backgroundColor:colors.primary}}></View>
        </View>
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({})