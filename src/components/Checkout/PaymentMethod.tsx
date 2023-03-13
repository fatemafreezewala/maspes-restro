import {StyleSheet, Text, View,Pressable} from 'react-native';
import React from 'react';
import colors from '../../utilities/colors';
import {SvgXml} from 'react-native-svg';
import TextComp from '../TextComp';
import globalStyle from '../../styles/globalStyle';
import margins from '../../utilities/margins';

export interface PaymentType {
    method:string,
    setMethod:Function
}
const PaymentMethod = ({method,setMethod}:PaymentType) => {
  const credit = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9H12H21M3 5H21V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V5Z" stroke="#539E83" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7 13H10" stroke="#FDD161" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `;
  const wallet = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 3L6 3C4.89543 3 4 3.89543 4 5L4 17L4 19C4 20.1046 4.89543 21 6 21L16 21L16 17" stroke="#539E83" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20 3L20 17L6 17C4.89543 17 4 17.8954 4 19V19" stroke="#539E83" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M21 13L21 7L14 7C12.3431 7 11 8.34315 11 10C11 11.6569 12.3431 13 14 13L21 13ZM13 10C13 10.5523 13.4477 11 14 11C14.5523 11 15 10.5523 15 10C15 9.44772 14.5523 9 14 9C13.4477 9 13 9.44771 13 10Z" fill="#FDD161"/>
    </svg>
    `;
  const cash = `
    <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="path-1-inside-1_360_3573" fill="white">
    <rect x="3" width="22" height="13" rx="1"/>
    </mask>
    <rect x="3" width="22" height="13" rx="1" fill="white" stroke=${colors.primary} stroke-width="3" mask="url(#path-1-inside-1_360_3573)"/>
    <mask id="path-2-inside-2_360_3573" fill="white">
    <rect y="3" width="22" height="13" rx="1"/>
    </mask>
    <rect y="3" width="22" height="13" rx="1" fill="white" stroke=${colors.primary} stroke-width="3" mask="url(#path-2-inside-2_360_3573)"/>
    <circle cx="10.5" cy="9.5" r="4.5" fill=${colors.primary}/>
    <path d="M11.835 9.995C11.835 10.1683 11.79 10.3317 11.7 10.485C11.6133 10.635 11.4833 10.76 11.31 10.86C11.14 10.9567 10.9383 11.0133 10.705 11.03V11.435H10.385V11.025C10.0517 10.995 9.78333 10.895 9.58 10.725C9.37667 10.5517 9.27167 10.3183 9.265 10.025H10.015C10.035 10.265 10.1583 10.41 10.385 10.46V9.505C10.145 9.445 9.95167 9.385 9.805 9.325C9.65833 9.265 9.53167 9.16833 9.425 9.035C9.31833 8.90167 9.265 8.72 9.265 8.49C9.265 8.2 9.36833 7.96333 9.575 7.78C9.785 7.59667 10.055 7.49167 10.385 7.465V7.06H10.705V7.465C11.025 7.49167 11.28 7.58833 11.47 7.755C11.6633 7.92167 11.7717 8.15167 11.795 8.445H11.04C11.03 8.34833 10.995 8.265 10.935 8.195C10.8783 8.12167 10.8017 8.07 10.705 8.04V8.985C10.955 9.04833 11.1517 9.11 11.295 9.17C11.4417 9.22667 11.5683 9.32167 11.675 9.455C11.7817 9.585 11.835 9.765 11.835 9.995ZM9.995 8.455C9.995 8.565 10.0283 8.655 10.095 8.725C10.1617 8.79167 10.2583 8.84667 10.385 8.89V8.025C10.265 8.04167 10.17 8.08667 10.1 8.16C10.03 8.23333 9.995 8.33167 9.995 8.455ZM10.705 10.47C10.8317 10.4467 10.93 10.395 11 10.315C11.0733 10.235 11.11 10.1383 11.11 10.025C11.11 9.915 11.075 9.82667 11.005 9.76C10.935 9.69333 10.835 9.63833 10.705 9.595V10.47Z" fill="#FDD161"/>
    </svg>
    `;
  const [methods, setMethods] = React.useState([
    {id: '1', method: 'Cash on delivery', icon: cash},
    {id: '2', method: 'Credit Card', icon: credit},
    {id: '3', method: 'Wallet', icon: wallet},
  ]);
  const checked = `
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="6" cy="6" r="6" fill="#539E83"/>
  </svg>
  `
  const uncheck = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="11" fill="white" stroke="#D0E3DC" stroke-width="2"/>
  </svg>
  `
  return (
    <>
      <TextComp
        text="Payment Methods"
        type="medium"
        fontSize={16}
        style={{marginVertical: margins.m5}}
        color={colors.black}></TextComp>
      {methods.map(m => (
        <Pressable onPress={()=>{
            setMethod(m.id)
        }} style={[globalStyle.rowSpace, {paddingVertical: margins.m3}]}>
           <View style={{flexDirection:'row',alignItems:'center'}}> 
           {method == m.id ? <SvgXml xml={checked}> </SvgXml> :<SvgXml xml={uncheck}> </SvgXml>}
          <TextComp
            text={m.method}
            type="medium"
            fontSize={14}
            style={{marginLeft:margins.m5}}
            color={colors.black}></TextComp>
           </View>
          <SvgXml xml={m.icon}></SvgXml>
        </Pressable>
      ))}
    </>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({});
