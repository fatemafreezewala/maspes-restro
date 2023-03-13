import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextComp from '../TextComp'
import colors from '../../utilities/colors'
import globalStyle from '../../styles/globalStyle'
import margins from '../../utilities/margins'
import { SvgXml } from 'react-native-svg'
import Logo from '../../assets/images/home/logo.svg'
const HomeHeader = ({user}) => {
  const location = `
  <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="19.5" cy="19.5" r="19.5" fill="#FDD161"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4778 20.1808L17.0664 26.3965C18.148 28.2699 20.8521 28.2699 21.9337 26.3965L25.5223 20.1808C28.1989 15.5449 24.8532 9.74997 19.5001 9.74997C14.1469 9.74997 10.8012 15.5449 13.4778 20.1808ZM19.5933 18.8533C20.8502 18.8533 21.8691 17.8344 21.8691 16.5775C21.8691 15.3206 20.8502 14.3016 19.5933 14.3016C18.3364 14.3016 17.3174 15.3206 17.3174 16.5775C17.3174 17.8344 18.3364 18.8533 19.5933 18.8533Z" fill="white"/>
  </svg>
  `;
  return (
   <>
    <View style={[globalStyle.row,{justifyContent:'space-between',marginVertical:margins.m5}]}>
     <View style={{justifyContent:'flex-start'}}>
          <TextComp
            fontSize={14}
            color={colors.black}
            text={`Welcome ${user?.user_name}`}
          />
          <TextComp
           fontSize={18}
           type="medium"
           color={colors.primary}
           text={'Hungry Now ?'}
         />
        </View>
        <View>
        <Logo width={60} height={60}></Logo>
        </View>
    </View>
    <View
    style={[
      globalStyle.row,
      { marginVertical: margins.m5},
    ]}>
    <SvgXml width={50} height={50} xml={location} />
    <View style={{marginLeft: margins.m5}}>
      <TextComp
        type="medium"
        color={colors.black}
        text={'Home'}
      />
      <TextComp fontSize={12} color={colors.black} text={'102, NYC Building , new square....'} />
    </View>
  </View></>

  )
}

export default HomeHeader

const styles = StyleSheet.create({})