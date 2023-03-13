import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TextComp from '../TextComp'
import FastImage from 'react-native-fast-image'
import colors from '../../utilities/colors'
import { imageUrl } from '../../constant/api'
import margins from '../../utilities/margins'
import globalStyle from '../../styles/globalStyle'
import currency from '../../utilities/currency'

export interface ProductCardTypes {
  item?: object;
  
}
const ProductCard = ({item}:ProductCardTypes) => {
  return (
    <View
        style={[
          globalStyle.row,
          {
            borderWidth: 1,
            borderColor: colors.primary,
            marginTop: margins.m5,
            borderRadius: 10,
          },
        ]}>
        <FastImage
          style={{width: '30%', height: 100, borderRadius: 10}}
          source={{uri: `${imageUrl}/${item.prod_name_image}`}}></FastImage>
        <View
          style={[
            globalStyle.row,
            {justifyContent: 'space-between',width:'70%',height:'100%',padding:10},
          ]}>
          <View style={{width:'80%'}}>
            <TextComp
              type="normal"
              color={colors.black}
              fontSize={12}
              text={item.prod_name_en}></TextComp>
            <TextComp
              type="medium"
              color={colors.primary}
              text={`${currency} ${item.prod_offer_price}`}></TextComp>
          </View>
          <View style={{alignItems:'center'}}>
            <TouchableOpacity style={styles.addSubtractBtn}>
              <TextComp color={colors.white} type='medium' text='+'></TextComp>
            </TouchableOpacity>
            <TextComp type='normal' text={"1"}></TextComp>
            <TouchableOpacity style={styles.addSubtractBtn}>
            <TextComp color={colors.white} type='medium' text='-'></TextComp>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity
            style={{margin: 20}}
            onPress={() => {
              removeItem(item.prod_id);
            }}>
            <Text style={{color: 'red'}}>Remove</Text>
          </TouchableOpacity> */}
        </View>
      </View>
  )
}

export default ProductCard

const styles = StyleSheet.create({
  addSubtractBtn: {
    width: 25,
    height: 25,
    backgroundColor: colors.primary,
   alignItems:'center',
   borderRadius:5
  },
})